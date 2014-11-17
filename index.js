'use strict';

var t = require('tcomb');

function compact(arr) {
  return arr.filter(function (x) {
    return !t.Nil.is(x);
  });
}

function flatten(arr) {
  return [].concat.apply([], arr);
}

function vdom(x, state) {
  if (t.Arr.is(x)) {
    x = compact(flatten(x)).map(function (y) {
      return vdom(y);
    });
    return x.length > 1 ? x : x[0];
  } else if (t.Obj.is(x)) {
    var type = x.type;
    if (t.Str.is(type)) {
      // tag
      var ret = { tag: type };
      ret.attrs = {};
      var children;
      for (var prop in x.props) {
        if (x.props.hasOwnProperty(prop)) {
          if (prop === 'children') {
            children = vdom(x.props[prop]);
          } else {
            ret.attrs[prop] = vdom(x.props[prop]);
          }
        }
      }
      if (!t.Nil.is(children)) {
        ret.children = children;
      }
      return ret;
    } else {
      // component
      var y = new x.type();
      // props
      var props = y.getDefaultProps ? y.getDefaultProps() : {};
      if (x.props) {
        props = t.util.mixin(props, x.props);
      }
      y.props = props;
      // state
      if (t.Nil.is(state) && t.Func.is(y.getInitialState)) {
        state = y.getInitialState();
      }
      y.state = state;
      return vdom(y.render());
    }
  }
  return x;
}

module.exports = vdom;
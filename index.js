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

function tag(x) {
  var ret = { tag: x.type };
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
}

function createClass(x, state) {
  var y = new x.type();
  // props
  var props = y.getDefaultProps ? y.getDefaultProps() : {};
  if (x.props) {
    props = t.mixin(props, x.props, true);
  }
  y.props = props;
  // state
  if (t.Nil.is(state) && t.Func.is(y.getInitialState)) {
    state = y.getInitialState();
  }
  y.state = state;
  return vdom(y.render());
}

function ReactComponent(x, state) {
  if (!t.Nil.is(state)) {
    x.state = state;
  }
  return vdom(x.render());
}

function component(x, state) {
  return t.Func.is(x.type) ?
    // createClass syntax
    createClass(x, state) :
    // class extends React.Component
    ReactComponent(x, state);
}

function vdom(x, state) {
  if (t.Arr.is(x)) {
    x = compact(flatten(x)).map(function (y) {
      return vdom(y);
    });
    return x.length > 1 ? x : x[0];
  } else if (t.Obj.is(x)) {
    return t.Str.is(x.type) ? tag(x) : component(x, state);
  }
  return x;
}

module.exports = vdom;
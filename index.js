var falsy = [null, undefined, false];

function compact(arr) {
  return arr.filter(function (x) {
    return falsy.indexOf(x) === -1;
  });
}

function flatten(arr) {
  return [].concat.apply([], arr);
}

function getDOM(tag) {
  var dom = { tag: tag.type };
  var children;
  for (var prop in tag.props) {
    if (tag.props.hasOwnProperty(prop)) {
      if (prop === 'children') {
        children = vdom(tag.props[prop]);
      } else {
        dom.attrs = dom.attrs || {};
        dom.attrs[prop] = vdom(tag.props[prop]);
      }
    }
  }
  if (falsy.indexOf(children) === -1) {
    if (Array.isArray(children)) {
      children = compact(flatten(children));
      if (children.length === 1) {
        children = children[0];
      }
    }
    dom.children = children;
  }
  return dom;
}

function getComponent(component, state) {
  var instance = new component.type(component.props);
  if (typeof instance.render === 'function') {
    if (typeof state !== 'undefined') {
      instance.state = state;
    }
    return vdom(instance.render());
  }
  return vdom(instance);
}

function vdom(x, state) {
  try {
    if (Array.isArray(x)) {
      x = compact(flatten(x)).map(function (y) {
        return vdom(y);
      });
      return x.length > 1 ? x : x[0];
    }
    if (falsy.indexOf(x) === -1) {
      if (typeof x.type === 'string') {
        return getDOM(x);
      }
      if (typeof x.$$typeof === 'symbol') {
        return getComponent(x, state);
      }
    }
    return x;
  } catch (e) {
    console.error('[react-vdom]', e); // eslint-disable-line
    return {
      tag: 'error',
      children: e.message + ', stack: ' + e.stack
    };
  }
}

module.exports = vdom;
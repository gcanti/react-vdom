'use strict';

var React = require('react');
var ReactElement = require('react/lib/ReactElement');

function compact(arr) {
  return arr.filter(function (x) {
    return x != null && x != false;
  });
}

function flatten(arr) {
  return [].concat.apply([], arr);
}

function vdomDOM(tag) {
  var dom = {tag: tag.type};
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
  if (children != null) {
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

function vdomReactClassComponent(Class, state) {
  var instance = new Class.type(Class.props);
  if (typeof state !== 'undefined') { instance.state = state; }
  return vdom(instance.render());
}

function vdomReactElement(reactElement, state) {
  return typeof reactElement.type === 'string' ?
    vdomDOM(reactElement) :
    vdomReactClassComponent(reactElement, state);
}

function vdomReactComponent(reactComponent, state) {
  if (typeof reactComponent.render !== 'function') {
    throw new Error('[react-vdom] component ' + reactComponent.constructor.name + ': missing render() method');
  }
  if (typeof state !== 'undefined') {
    reactComponent.state = state;
  }
  return vdom(reactComponent.render());
}

function vdom(x, state) {
  try {
    if (Array.isArray(x)) {
      x = compact(flatten(x)).map(function (y) {
        return vdom(y);
      });
      return x.length > 1 ? x : x[0];
    } else if (x instanceof React.Component) {
      return vdomReactComponent(x, state);
    } else if (x instanceof ReactElement) {
      return vdomReactElement(x, state);
    }
    return x;
  } catch (e) {
    return {
      tag: 'error',
      children: e.message
    };
  }
}

module.exports = vdom;
'use strict';

var t = require('tcomb');
var React = require('react');
var ReactDescriptor = require("react/lib/ReactDescriptor");

function getTag(c) {
  return c.constructor.type.displayName;
}

function compact(arr) {
  return arr.filter(function (x) {
    return !t.Nil.is(x);
  });
}

function recurse(x) {
  if (t.Arr.is(x)) {
    return compact(x).map(vdom);
  }
  if (t.Obj.is(x)) {
    var tag = getTag(x);
    if (!React.DOM.hasOwnProperty(tag)) {
      return vdom(x);
    }
    var ret = {
      tag: tag,
      attrs: {},
      children: null
    };
    for (var k in x.props) {
      if (x.props.hasOwnProperty(k)) {
        if (k === 'children') {
          ret.children = recurse(x.props[k]);
        } else {
          ret.attrs[k] = x.props[k];
        }
      }
    }
    return ret;
  }
  return x;
}

function vdom(descriptor, state) {
  if (t.Nil.is(descriptor) || t.Nil.is(descriptor.type)) {
    return recurse(descriptor);
  }
  descriptor = instantiateReactComponent(descriptor);
  mount.call(descriptor, state);
  return recurse(descriptor.render());
}

// file: instantiateReactComponent.js
// lines: 59-59
function instantiateReactComponent(descriptor) {
  return new descriptor.type(descriptor);
}

// this is a modified extract of the React code base
// file: ReactCompositeComponent.js
// lines: 749-783
function mount(state) {
  this._compositeLifeCycleState = 'MOUNTING'; //CompositeLifeCycle.MOUNTING;

  if (this.__reactAutoBindMap) {
    this._bindAutoBindMethods();
  }

  this.context = this._processContext(this._descriptor._context);
  this.props = this._processProps(this.props);

  this.state = this.getInitialState ? this.getInitialState() : null;
  //("production" !== process.env.NODE_ENV ? invariant(
  //  typeof this.state === 'object' && !Array.isArray(this.state),
  //  '%s.getInitialState(): must return an object or null',
  //  this.constructor.displayName || 'ReactCompositeComponent'
  //) : invariant(typeof this.state === 'object' && !Array.isArray(this.state)));

  this._pendingState = null;
  this._pendingForceUpdate = false;

  if (this.componentWillMount) {
    this.componentWillMount();
    // When mounting, calls to `setState` by `componentWillMount` will set
    // `this._pendingState` without triggering a re-render.
    if (this._pendingState) {
      this.state = this._pendingState;
      this._pendingState = null;
    }
  }

  // custom code to inject state
  if (state) {
    this.state = state;
  }

  this._renderedComponent = instantiateReactComponent(
    this._renderValidatedComponent()
  );
  // custom
  this._renderedComponent._lifeCycleState = "MOUNTED";

  // Done with mounting, `setState` will now trigger UI changes.
  this._compositeLifeCycleState = null;
  // custom
  this._lifeCycleState = 'MOUNTED';
}

module.exports = vdom;
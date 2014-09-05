'use strict';

var t = require('tcomb');
var tags = require('./tags');

function getTag(c) {
  return c.constructor.type.displayName;
}

function recurse(x) {
  if (t.Arr.is(x)) {
    return x.map(recurse);
  }
  if (t.Obj.is(x)) {
    var tag = getTag(x);
    if (!tags.hasOwnProperty(tag)) {
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

function vdom(c, state) {
  var instance = instantiateReactComponent(c);
  mount.call(instance, state);
  return recurse(instance.render());
}

// this is an extract of the React code base
// file: ReactCompositeComponent.js
// lines: 749-783
function mount(state) {
  this._compositeLifeCycleState = 'MOUNTING'; //CompositeLifeCycle.MOUNTING;

  if (this.__reactAutoBindMap) {
    this._bindAutoBindMethods();
  }

  this.context = this._processContext(this._descriptor._context);
  this.props = this._processProps(this.props);

  // custom code to inject state
  this.state = state ? state : this.getInitialState ? this.getInitialState() : null;
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

  this._renderedComponent = instantiateReactComponent(
    this._renderValidatedComponent()
  );

  // Done with mounting, `setState` will now trigger UI changes.
  this._compositeLifeCycleState = null;
}

// file: instantiateReactComponent.js
// lines: 59-59
function instantiateReactComponent(descriptor) {
  return new descriptor.type(descriptor);
}

module.exports = vdom;
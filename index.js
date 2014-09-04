'use strict';

module.exports = vdom;

var isArray = Array.isArray || function (x) {
  return x instanceof Array;
};

var isObject = function (x) {
  return typeof x === 'object' && x !== null;
};

function mixin(target, source, overwrite) {
  for (var k in source) {
    target[k] = source[k];
  }
  return target;
}

function getTag(c) {
  return c.constructor.type.displayName;
}

function recurse(x) {
  if (isArray(x)) {
    return x.map(recurse);
  }
  if (isObject(x)) {
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

function vdom(c) {
  var instance = new c.type(c);
  mount.call(instance);
  return recurse(instance.render());
}

// this is an extract of the React code base
// file: ReactCompositeComponent.js
// lines: 749-783
function mount() {
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

var tags = {
  "a": 1,
  "abbr": 1,
  "address": 1,
  "area": 1,
  "article": 1,
  "aside": 1,
  "audio": 1,
  "b": 1,
  "base": 1,
  "bdi": 1,
  "bdo": 1,
  "big": 1,
  "blockquote": 1,
  "body": 1,
  "br": 1,
  "button": 1,
  "canvas": 1,
  "caption": 1,
  "cite": 1,
  "code": 1,
  "col": 1,
  "colgroup": 1,
  "data": 1,
  "datalist": 1,
  "dd": 1,
  "del": 1,
  "details": 1,
  "dfn": 1,
  "div": 1,
  "dl": 1,
  "dt": 1,
  "em": 1,
  "embed": 1,
  "fieldset": 1,
  "figcaption": 1,
  "figure": 1,
  "footer": 1,
  "form": 1,
  "h1": 1,
  "h2": 1,
  "h3": 1,
  "h4": 1,
  "h5": 1,
  "h6": 1,
  "head": 1,
  "header": 1,
  "hr": 1,
  "html": 1,
  "i": 1,
  "iframe": 1,
  "img": 1,
  "input": 1,
  "ins": 1,
  "kbd": 1,
  "keygen": 1,
  "label": 1,
  "legend": 1,
  "li": 1,
  "link": 1,
  "main": 1,
  "map": 1,
  "mark": 1,
  "menu": 1,
  "menuitem": 1,
  "meta": 1,
  "meter": 1,
  "nav": 1,
  "noscript": 1,
  "object": 1,
  "ol": 1,
  "optgroup": 1,
  "option": 1,
  "output": 1,
  "p": 1,
  "param": 1,
  "pre": 1,
  "progress": 1,
  "q": 1,
  "rp": 1,
  "rt": 1,
  "ruby": 1,
  "s": 1,
  "samp": 1,
  "script": 1,
  "section": 1,
  "select": 1,
  "small": 1,
  "source": 1,
  "span": 1,
  "strong": 1,
  "style": 1,
  "sub": 1,
  "summary": 1,
  "sup": 1,
  "table": 1,
  "tbody": 1,
  "td": 1,
  "textarea": 1,
  "tfoot": 1,
  "th": 1,
  "thead": 1,
  "time": 1,
  "title": 1,
  "tr": 1,
  "track": 1,
  "u": 1,
  "ul": 1,
  "var": 1,
  "video": 1,
  "wbr": 1,
  "circle": 1,
  "defs": 1,
  "ellipse": 1,
  "g": 1,
  "line": 1,
  "linearGradient": 1,
  "mask": 1,
  "path": 1,
  "pattern": 1,
  "polygon": 1,
  "polyline": 1,
  "radialGradient": 1,
  "rect": 1,
  "stop": 1,
  "svg": 1,
  "text": 1,
  "tspan": 1
};

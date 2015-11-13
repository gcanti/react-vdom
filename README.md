[![build status](https://img.shields.io/travis/gcanti/react-vdom/master.svg?style=flat-square)](https://travis-ci.org/gcanti/react-vdom)
[![dependency status](https://img.shields.io/david/gcanti/react-vdom.svg?style=flat-square)](https://david-dm.org/gcanti/react-vdom)
![npm downloads](https://img.shields.io/npm/dm/react-vdom.svg)

# Important

If you are using React v0.13 you want to install react-vdom v0.5.

# The Idea

I wrote this handy little library for testing purposes: you can extract the vdom from a React
component and test it against a JSON with simple tools like assert.deepEqual() and without a real DOM.
The extracted vdom has the following type definition:

    type Node = {
      tag: string,
      attrs: object<name, value>,
      children: undefined | null | Node | Array<Node>
    }

If your component handle a private state, you can inject a state to test different configurations.

# Basic example

```js
var vdom = require('react-vdom');

// a simple component
var Counter = React.createClass({
  getInitialState: function () {
    return {count: 0};
  },
  render: function () {
    return (
      React.DOM.div(null, this.state.count)
    );
  }
});

var component = Counter();
var json = vdom(component);
console.log(json);
```

outputs

```json
{
  "tag": "div",
  "attrs": {},
  "children": 0
}
```

# Inject a state

```js
var state = {count: 1};
var component = Counter();
console.log(vdom(component, state));
```

outputs

```json
{
  "tag": "div",
  "attrs": {},
  "children": 1
}
```

# Setup

    npm install react-vdom

# Api

```js
vdom(element, [state])
```

- `element` a ReactElement
- `state` inject a state

Returns a JSON containing a synthetic VDOM.

# License (MIT)
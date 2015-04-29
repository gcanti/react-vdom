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

This is an example of massive use in a form generation library:

https://github.com/gcanti/tcomb-form/blob/master/test/test.js

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
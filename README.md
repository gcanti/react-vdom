% react-vdom

# Playground

Try the [playground online](https://gcanti.github.io/resources/react-vdom/playground/playground.html)

# Contents

- [Basic example](#basic-example)
- [Inject a state](#inject-a-state)
- [Setup](#setup)
- [Api](#api)

# Basic example

```js
var vdom = require('react-vdom').vdom;

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
vdom(descriptor, state)
```

- `descriptor` a ReactDescriptor or a ReactCompositeComponentBase
- `state` inject a state

Returns a JSON containing a synthetic VDOM.

# License (MIT)
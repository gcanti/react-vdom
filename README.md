% react-vdom

# Playground

Try the [playground online](https://gcanti.github.io/resources/react-vdom/playground/playground.html)

# Example

```js
var vdom = require('react-vdom');

// a simple component
var Component = React.createClass({
  render: function () {
    return (
      <a href={this.props.href}>{this.props.children}</a>
    );
  }
});

var component = Component({href: '#section'}, 'title');
var json = vdom(component);
console.log(json);
```

outputs 

```json
{
  "tag": "a",
  "attrs": {
    "href": "#section"
  },
  "children": "title"
}
```

You can also inject a state

```js
var Component = React.createClass({
  render: function () {
    return (
      <a href={this.state.href}>{this.props.children}</a>
    );
  }
});

var state = {href: '#section'};
var component = Component(null, 'title');
var json = vdom(component, state);
console.log(json);
```

outputs 

```json
{
  "tag": "a",
  "attrs": {
    "href": "#section"
  },
  "children": "title"
}
```

# Setup

    npm install react-vdom

# Api

```js
vdom(component, state)
```

- `component` an instance of a component
- `state` inject a state

Returns a JSON containing a synthetic VDOM.

# License (MIT)
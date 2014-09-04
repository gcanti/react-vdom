% react-vdom

# Playground

Try the [playground online](https://gcanti.github.io/resources/react-vdom/playground/playground.html)

# Example

```js
var vdom = require('react-vdom');

// a simple component
var Anchor = React.createClass({
  render: function () {
    return (
      <a href={this.props.href}>{this.props.children}</a>
    );
  }
});

var component = Anchor({href: '#section'}, 'title');
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

# Setup

    npm install react-vdom

# Api

```js
vdom(component)
```

- `component` an instance of a component

Returns a JSON containing a synthetic VDOM.

# License (MIT)
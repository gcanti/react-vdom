'use strict';

var assert = require('assert');
var React = require('react');
var vdom = require('../.');
var t = require('tcomb-form');
var util = require('util');

var eq = assert.deepEqual;

describe('vdom', function () {

  describe('DOM', function () {

    it('should handle a simple tag', function () {
      var component = React.DOM.div();
      eq({
        tag: 'div'
      }, vdom(component));
    });

    it('should handle props', function () {
      var component = React.DOM.div({a: 1});
      eq({
        tag: 'div',
        attrs: {
          a: 1
        }
      }, vdom(component));
    });

    it('should handle children', function () {
      var component = React.DOM.div({a: 1}, 'child1', 'child2');
      eq({
        tag: 'div',
        attrs: {
          a: 1
        },
        children: ['child1', 'child2']
      }, vdom(component));
    });

    it('should handle just', function () {
      var component = React.DOM.div(null, 'child1');
      eq({
        tag: 'div',
        children: 'child1'
      }, vdom(component));
    });

    it('should handle nested tags', function () {
      var component = React.DOM.div(null, React.DOM.a());
      eq({
        tag: 'div',
        children: {
          tag: 'a'
        }
      }, vdom(component));
    });

  });

  describe('ReactClassComponent', function () {

    it('should handle a simple ReactClassComponent', function () {
      var Class = React.createClass({
        render: function () {
          return React.DOM.div({a: 1}, 'hello');
        }
      });
      var Component = React.createFactory(Class);
      eq({
        tag: 'div',
        attrs: {
          a: 1
        },
        children: 'hello'
      }, vdom(Component()));
    });

    it('should handle getInitialState', function () {
      var Class = React.createClass({
        getInitialState: function () {
          return {name: 'Giulio'};
        },
        render: function () {
          return React.DOM.div(null, 'hello ', this.state.name);
        }
      });
      var Component = React.createFactory(Class);
      eq({
        tag: 'div',
        children: ['hello ', 'Giulio']
      }, vdom(Component()));
    });

    it('should handle state argument', function () {
      var Class = React.createClass({
        render: function () {
          return React.DOM.div(null, 'hello ', this.state.name);
        }
      });
      var Component = React.createFactory(Class);
      eq({
        tag: 'div',
        children: ['hello ', 'Giulio']
      }, vdom(Component(), {name: 'Giulio'}));
    });

    it('should handle getDefaultProps', function () {
      var Class = React.createClass({
        getDefaultProps: function () {
          return {name: 'Giulio'};
        },
        render: function () {
          return React.DOM.div(null, 'hello ', this.props.name, this.props.surname);
        }
      });
      var Component = React.createFactory(Class);
      eq({
        tag: 'div',
        children: ['hello ', 'Giulio', 'Canti']
      }, vdom(Component({surname: 'Canti'})));
    });

  });

  describe('ReactComponent', function () {

    it('should handle a simple ReactComponent', function () {
      function Component() {
        React.Component.apply(this, arguments);
      }
      util.inherits(Component, React.Component);
      Component.prototype.render = function() {
        return React.DOM.div({a: 1}, 'hello');
      };
      eq({
        tag: 'div',
        attrs: {
          a: 1
        },
        children: 'hello'
      }, vdom(new Component()));
    });

    it('should handle getInitialState', function () {
      function Component() {
        React.Component.apply(this, arguments);
        this.state = {name: 'Giulio'};
      }
      util.inherits(Component, React.Component);
      Component.prototype.render = function() {
        return React.DOM.div(null, this.state.name);
      };
      eq({
        tag: 'div',
        children: 'Giulio'
      }, vdom(new Component()));
    });

    it('should handle state argument', function () {
      function Component() {
        React.Component.apply(this, arguments);
      }
      util.inherits(Component, React.Component);
      Component.prototype.render = function() {
        return React.DOM.div(null, this.state.name);
      };
      eq({
        tag: 'div',
        children: 'Giulio'
      }, vdom(new Component(), {name: 'Giulio'}));
    });

  });

  describe('nested components', function () {

    it('should handle tcomb-form', function () {
      function Component() {
        React.Component.apply(this, arguments);
      }
      util.inherits(Component, React.Component);
      Component.prototype.render = function() {
        return React.createFactory(t.form.Form)({
          type: t.Str,
          options: {
            id: 'myid'
          }
        });
      };
      eq({
        "tag": "div",
        "attrs": {
          "className": "form-group"
        },
        "children": {
          "tag": "input",
          "attrs": {
            "type": "text",
            "name": "myid",
            "value": null,
            "className": "form-control",
            "id": null,
            "aria-describedby": null
          }
        }
      }, JSON.parse(JSON.stringify(vdom(new Component()))));
    });

  });

});

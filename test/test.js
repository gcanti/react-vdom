'use strict';

var assert = require('assert');
var React = require('react');
var vdom = require('../index');

//
// setup
//

var eq = assert.deepEqual;

describe('vdom', function () {

  describe('createClass', function () {

    it('should return a assertable DOM', function () {
      var Anchor = React.createFactory(React.createClass({displayName: 'Anchor',
        render: function () {
          return (
            React.DOM.a({href: this.props.href}, this.props.children)
          );
        }
      }));
      var component = Anchor({href: '#section'}, 'title');
      eq({
        tag: 'a',
        attrs: {href: '#section'},
        children: 'title'
      }, vdom(component));
    });

    it('should handle state argument', function () {
      var Anchor = React.createFactory(React.createClass({displayName: 'Anchor',
        render: function () {
          return (
            React.DOM.a({href: this.state.href}, this.props.children)
          );
        }
      }));
      var component = Anchor(null, 'title');
      var state = {href: '#section'};
      eq({
        tag: 'a',
        attrs: {href: '#section'},
        children: 'title'
      }, vdom(component, state));
    });

  });

  describe('React.Component', function () {

    it('should return a assertable DOM', function () {
      function Anchor () {
        React.Component.apply(this, arguments);
      }
      Anchor.prototype.render = function () {
        return (
          React.DOM.a({href: this.props.href}, this.props.children)
        );
      };
      var component = new Anchor({href: '#section', children: 'title'});
      eq({
        tag: 'a',
        attrs: {href: '#section'},
        children: 'title'
      }, vdom(component));
    });

    it('should handle state argument', function () {
      function Anchor () {
        React.Component.apply(this, arguments);
      }
      Anchor.prototype.render = function () {
        return (
          React.DOM.a({href: this.state.href}, this.props.children)
        );
      };
      var component = new Anchor({children: 'title'});
      var state = {href: '#section'};
      eq({
        tag: 'a',
        attrs: {href: '#section'},
        children: 'title'
      }, vdom(component, state));
    });

  });

});

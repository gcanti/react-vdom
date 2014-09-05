/** @jsx React.DOM */

"use strict";
var assert = require('assert');
var React = require('react'); 
var vdom = require('../index');

//
// setup
//

var eq = assert.deepEqual;

describe('vdom', function () {

  it('should return a assertable DOM', function () {
    var Anchor = React.createClass({
      render: function () {
        return (
          <a href={this.props.href}>{this.props.children}</a>
        );
      }
    });
    var component = Anchor({href: '#section'}, 'title');
    eq({
      tag: 'a',
      attrs: {href: '#section'},
      children: 'title'
    }, vdom(component));
  });

  it('should handle state argument', function () {
    var Anchor = React.createClass({
      render: function () {
        return (
          <a href={this.state.href}>{this.props.children}</a>
        );
      }
    });
    var component = Anchor(null, 'title');
    var state = {href: '#section'};
    eq({
      tag: 'a',
      attrs: {href: '#section'},
      children: 'title'
    }, vdom(component, state));
  });

});

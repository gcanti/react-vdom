import React from 'react';
import describe from 'tape';
import vdom from '../.';

describe('createClass', (tape) => {

  tape.test('should handle a simple class', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div'
    };
    const Component = React.createClass({
      render: function () {
        return <div/>;
      }
    });
    const actual = vdom(<Component />);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle getInitialState', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: ['hello ', 'Giulio']
    };
    const Component = React.createClass({
      getInitialState: function () {
        return {name: 'Giulio'};
      },
      render: function () {
        return <div>hello {this.state.name}</div>
      }
    });
    const actual = vdom(<Component />);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle state argument', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: ['hello ', 'Giulio']
    };
    const Component = React.createClass({
      render: function () {
        return <div>hello {this.state.name}</div>
      }
    });
    const actual = vdom(<Component />, { name: 'Giulio' });
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle getDefaultProps', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: ['hello ', 'Giulio', 'Canti']
    };
    const Component = React.createClass({
      getDefaultProps: function () {
        return { name: 'Giulio' };
      },
      render: function () {
        return <div>hello {this.props.name}{this.props.surname}</div>
      }
    });
    const actual = vdom(<Component surname="Canti" />);
    assert.deepEqual(expected, actual);
  });

});
import React from 'react';
import describe from 'tape';
import vdom from '../.';

describe('ReactComponent', (tape) => {

  tape.test('should handle a simple ReactComponent', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      attrs: {
        a: 1
      },
      children: 'hello'
    };
    class Component extends React.Component {
      render() {
        return <div a={1}>hello</div>
      }
    }
    const actual = vdom(<Component />);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle the state', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: 'Giulio'
    };
    class Component extends React.Component {
      constructor(...args) {
        super(...args);
        this.state = { name: 'Giulio' };
      }
      render() {
        return <div>{ this.state.name }</div>
      }
    }
    const actual = vdom(<Component />);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle state argument', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: 'Giulio'
    };
    class Component extends React.Component {
      constructor(...args) {
        super(...args);
      }
      render() {
        return <div>{ this.state.name }</div>
      }
    }
    const actual = vdom(<Component />, { name: 'Giulio' });
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle defaultProps', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: ['hello ', 'Giulio', 'Canti']
    };
    class Component extends React.Component {
      static defaultProps = {
        name: 'Giulio'
      }
      constructor(...args) {
        super(...args);
      }
      render() {
        return <div>hello {this.props.name}{this.props.surname}</div>
      }
    }
    const actual = vdom(<Component surname="Canti" />);
    assert.deepEqual(expected, actual);
  });

});
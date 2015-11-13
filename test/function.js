import React from 'react';
import describe from 'tape';
import vdom from '../.';

describe('function', (tape) => {

  tape.test('should handle a simple function', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div'
    };
    function Component () {
      return <div/>;
    }
    const actual = vdom(<Component />);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle props', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: 1
    };
    function Component (props) {
      return <div>{props.a}</div>;
    }
    const actual = vdom(<Component a={1} />);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle a simple function', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: ['hello ', 'Giulio', 'Canti']
    };
    function Component (props) {
      return <div>hello {props.name}{props.surname}</div>;
    }
    Component.defaultProps = { name: 'Giulio' };
    const actual = vdom(<Component surname="Canti" />);
    assert.deepEqual(expected, actual);
  });

});
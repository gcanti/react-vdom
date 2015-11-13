import React from 'react';
import describe from 'tape';
import vdom from '../.';

describe('DOM', (tape) => {

  tape.test('should handle a simple tag', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div'
    };
    const actual = vdom(<div/>);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle props', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      attrs: {
        a: 1
      }
    };
    const actual = vdom(<div a={1}/>);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle children', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      attrs: {
        a: 1
      },
      children: [{tag: 'b'}, {tag: 'i'}]
    };
    const actual = vdom(<div a={1}><b/><i/></div>);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle nully and falsy children', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      attrs: {
        a: 1
      },
      children: ['child1', 'child2']
    };
    const actual = vdom(<div a={1}>{null}{'child1'}{false}{null}{'child2'}</div>);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle just a child', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: 'child1'
    };
    const actual = vdom(<div>child1</div>);
    assert.deepEqual(expected, actual);
  });

  tape.test('should handle nested tags', (assert) => {
    assert.plan(1);
    const expected = {
      tag: 'div',
      children: {
        tag: 'a'
      }
    };
    const actual = vdom(<div><a/></div>);
    assert.deepEqual(expected, actual);
  });

});
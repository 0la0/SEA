import assert from 'assert';
import { Observer, ObservableObject } from '../src/index.js';

const deepClone = obj => JSON.parse(JSON.stringify(obj));

describe('ObservableObject', () => {
  it('Only accepts an object in the constructor', () => {
    assert.throws(() => new ObservableObject(), TypeError);
    assert.throws(() => new ObservableObject(Function.prototype), TypeError);
    assert.throws(() => new ObservableObject('object'), TypeError);
  });

  it('Notifies observers when the value is set', () => {
    let val1 = {};
    let val2 = {};
    let val3 = {};
    const observable = new ObservableObject({ foo: 'bar' });
    const observer1 = new Observer(data => val1 = deepClone(data));
    const observer2 = new Observer(data => val2 = deepClone(data));
    const observer3 = new Observer(data => val3 = deepClone(data));

    observable.observe(observer1);
    assert.deepStrictEqual(val1, { foo: 'bar' });
    assert.deepStrictEqual(val2, {});
    assert.deepStrictEqual(val3, {});
    assert.equal(observable.observers.length, 1);

    observable.observe(observer2);
    observable.observe(observer3);
    assert.deepStrictEqual(val1, { foo: 'bar' });
    assert.deepStrictEqual(val2, { foo: 'bar' });
    assert.deepStrictEqual(val3, { foo: 'bar' });
    assert.equal(observable.observers.length, 3);

    observable.setValue({ something: 'else' });
    assert.deepStrictEqual(val1, { foo: 'bar', something: 'else' });
    assert.deepStrictEqual(val2, { foo: 'bar', something: 'else' });
    assert.deepStrictEqual(val3, { foo: 'bar', something: 'else' });
    assert.equal(observable.observers.length, 3);

    observable.removeObserver(observer1);
    observable.removeObserver();
    observable.setValue({ something: 'cool' });
    assert.deepStrictEqual(val1, { foo: 'bar', something: 'else' });
    assert.deepStrictEqual(val2, { foo: 'bar', something: 'cool' });
    assert.deepStrictEqual(val3, { foo: 'bar', something: 'cool' });
    assert.equal(observable.observers.length, 2);

    observable.removeObserver(observer2);
    observable.removeObserver(observer3);
    observable.setValue({ foo: 'baz' });
    assert.deepStrictEqual(val1, { foo: 'bar', something: 'else' });
    assert.deepStrictEqual(val2, { foo: 'bar', something: 'cool' });
    assert.deepStrictEqual(val3, { foo: 'bar', something: 'cool' });
    assert.equal(observable.observers.length, 0);

    assert.throws(() => observable.setValue('bye'), TypeError);
  });
});

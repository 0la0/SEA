import assert from 'assert';
import { Observer, Observable } from '../src/index.js';

describe('Observable', () => {
  it('Notifies observers when the value is set', () => {
    let val1 = 'initial value';
    let val2 = 'initial value';
    let val3 = 'initial value';
    const observable = new Observable('foo');
    const observer1 = new Observer(data => val1 = data);
    const observer2 = new Observer(data => val2 = data);
    const observer3 = new Observer(data => val3 = data);

    observable.observe(observer1);
    assert.equal(val1, 'foo');
    assert.equal(val2, 'initial value');
    assert.equal(val3, 'initial value');
    assert.equal(observable.observers.length, 1);

    observable.observe(observer2);
    observable.observe(observer3);
    assert.equal(val1, 'foo');
    assert.equal(val2, 'foo');
    assert.equal(val3, 'foo');
    assert.equal(observable.observers.length, 3);

    observable.setValue('hello');
    assert.equal(val1, 'hello');
    assert.equal(val2, 'hello');
    assert.equal(val3, 'hello');
    assert.equal(observable.observers.length, 3);

    observable.removeObserver(observer1);
    observable.removeObserver();
    observable.setValue('bye');
    assert.equal(val1, 'hello');
    assert.equal(val2, 'bye');
    assert.equal(val3, 'bye');
    assert.equal(observable.observers.length, 2);

    observable.removeObserver(observer2);
    observable.removeObserver(observer3);
    observable.setValue('...');
    assert.equal(val1, 'hello');
    assert.equal(val2, 'bye');
    assert.equal(val3, 'bye');
    assert.equal(observable.observers.length, 0);
  });
});

import assert from 'assert';
import { Observer } from '../src/index.js';

describe('Observer', () => {
  it('Only accepts a function in the constructor', () => {
    assert.throws(() => new Observer(), Error);
    assert.throws(() => new Observer({}), Error);
    assert.throws(() => new Observer('notification'), Error);
  });

  it('Notifies observers when the value is set', () => {
    let testValue = 'initial value';
    const observer = new Observer(data => testValue = data);
    observer.notify('hello');
    assert.equal(testValue, 'hello');
    observer.notify('bye');
    assert.equal(testValue, 'bye');
  });
});

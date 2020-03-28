import assert from 'assert';
import { Subscription } from '../src/index.js';

describe('Subscription', () => {
  describe('equality checks', () => {
    it('is equal for the same instance', () => {
      const subscription = new Subscription();
      assert.ok(subscription.equals(subscription));
    });

    it('is equal for deault arguments', () => {
      assert.ok(new Subscription().equals(new Subscription()));
    });

    it('is equal for same address, function reference', () => {
      const nextRef = () => {};
      assert.ok(new Subscription('test', nextRef).equals(new Subscription('test', nextRef)));
    });

    it('is not equal for different address, same function reference', () => {
      const nextRef = () => {};
      assert.ok(
        !(
          new Subscription('a', nextRef).equals(new Subscription('b', nextRef))
        )
      );
    });

    it('is not equal for same address, different function reference', () => {
      assert.ok(
        !(
          new Subscription('a', () => {}).equals(new Subscription('a', () => {}))
        )
      );
    });

    it('is not equal for subscription shape, invalid type', () => {
      const nextRef = () => {};
      assert.ok(
        !(
          new Subscription('a', nextRef).equals({ address: 'a', onNext: nextRef, })
        )
      );
    });
  });
});

import Subscription from './Subscription';

export default class EventBusBase {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    if (!(subscriber instanceof Subscription)) {
      throw new Error('EventBus.subscribe must be called with a Subscription');
    }
    if (this._hasSubscription(subscriber)) {
      return;
    }
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter(_subscriber => _subscriber !== subscriber);
  }

  _hasSubscription(subscriber) {
    return this.subscribers
      .some(_subscriber => _subscriber.equals(subscriber));
  }
}

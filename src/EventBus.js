import EventBusBase from './EventBusBase';

export default class EventBus extends EventBusBase {
  publish(message) {
    this.subscribers
      .filter(subscriber => subscriber.address === message.address)
      .forEach(subscriber => subscriber.onNext(message));
  }
}

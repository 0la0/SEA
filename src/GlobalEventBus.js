import EventBusBase from './EventBusBase.js';

const GLOBAL_EVENT = 'GLOBAL_EVENT';

export default class GlobalEventBus extends EventBusBase{
  constructor() {
    super();
    this.onEvent = this._onEvent.bind(this);
    document.addEventListener(GLOBAL_EVENT, this.onEvent);
  }

  publish(message) {
    const event = new CustomEvent(GLOBAL_EVENT, { detail: message, });
    document.dispatchEvent(event);
  }

  _onEvent(event) {
    const message = event.detail;
    this.subscribers
      .filter(subscriber => subscriber.address === message.address)
      .forEach(subscriber => subscriber.onNext(message));
  }
}

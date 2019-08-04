export default class Observer {
  constructor(notification) {
    if (typeof notification !== 'function') {
      throw new Error('Observer.constructor requires a function');
    }
    this.notification = notification;
  }

  notify(value) {
    this.notification(value);
  }
}

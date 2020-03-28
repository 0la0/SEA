import Observable from './Observable.js';

export default class ObservableObject extends Observable {
  constructor(value, observers = []) {
    if (typeof value !== 'object') {
      throw new TypeError('ObservableObject requries and object');
    }
    super(value, observers);
  }

  setValue(obj) {
    if (typeof obj !== 'object') {
      throw new TypeError('ObservableObject.setValue requires and object');
    }
    let hasChange = false;
    Object.keys(obj).forEach((key) => {
      if (this.value[key] !== obj[key]) {
        this.value[key] = obj[key];
        hasChange = true;
      }
    });
    if (hasChange) {
      this.notifyObservers();
    }
    return this;
  }
}

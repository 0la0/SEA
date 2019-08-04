export default class Observable {
  constructor(value, observers = []) {
    this.value = value;
    this.observers = [];
    observers.forEach(o => this.observe(o));
  }

  observe(observer) {
    this.observers = this.observers.concat(observer);
    observer.notify(this.value);
    return this;
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(o => o !== observer);
    return this;
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.notify(this.value));
    return this;
  }

  setValue(value) {
    if (this.value === value) {
      return this;
    }
    this.value = value;
    this.notifyObservers();
    return this;
  }
}

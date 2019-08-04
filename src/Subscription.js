const defaultOnNext = () => {};

export default class Subscription {
  constructor(address = '-', onNext = defaultOnNext) {
    this.address = address;
    this.onNext = onNext;
  }

  setAddress(address) {
    this.address = address;
    return this;
  }

  setOnNext(onNext) {
    this.onNext = onNext;
    return this;
  }

  equals(subscription) {
    if (!(subscription instanceof Subscription)) {
      return false;
    }
    return this.address === subscription.address
      && this.onNext === subscription.onNext;
  }
}

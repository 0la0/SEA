# SEA (Simple Event Architecture)
* Pub/Sub
* Observables

## Build scripts
install dependencies: `npm install`  
run tests: `npm test`  
run linter: `npm run lint`  

---

## Pub/Sub (Event Bus)
```js
import { EventBus, Subscription } from 'sea';

const eventBus = new EventBus();

const subscription = new Subscription('test', data => console.log('Subscriber received:', data));

eventBus.subscribe(subscription);

eventBus.publish({ address: 'test', val: 'hello' });

// eventBus.unsubscribe(subscription);
```
---
## Observable
```js
import { Observer, Observable } from 'sea';

const observable = new Observable('foo');
const observer = new Observer(data => console.log('update', data));
observable.observe(observer);
observable.setValue('updated');

// observable.removeObserver(observer);
```

---
## ObservableObject
```js
import { Observer, ObservableObject } from 'sea';

const observable = new ObservableObject({ foo: 'bar', });
const observer = new Observer(data => console.log('update', data));
observable.observe(observer);
observable.setValue({ something: 'else', });

// observable.removeObserver(observer);
```
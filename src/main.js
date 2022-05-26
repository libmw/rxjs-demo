import { Observable } from 'rxjs';
 
const observable = new Observable(subscriber => {
  console.log('new observable')
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
 
console.log('just before subscribe');
observable.subscribe({
  next(x) { console.log('got value ' + x); },
  error(err) { console.error('something wrong occurred: ' + err); },
  complete() { console.log('done'); }
});
observable.subscribe({
  next(x) { console.log('got value 1' + x); },
  error(err) { console.error('something wrong occurred: 1' + err); },
  complete() { console.log('done1'); }
});
console.log('just after subscribe');
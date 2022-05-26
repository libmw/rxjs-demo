import { Observable, lastValueFrom } from "rxjs";
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(new Error('错求鸡公了'));
    subscriber.complete(5);
  }, 1000);
});
const logValue = async () => {
  const value = await lastValueFrom(observable);
  console.log("value: ", value);
};

logValue();

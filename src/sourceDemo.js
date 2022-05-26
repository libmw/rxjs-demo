class Observable {
  constructor(eventEmitter) {
    this._eventEmitter = eventEmitter;
    this._pipeList = []
    
  }
  pipe() {
    this._pipeList = this._pipeList.concat(...arguments);
    return this;
  }
  subscribe(executor) {
    const { next, error, complete } = executor;
    const isDone = false;
    const _this = this;
    const emitter = {
      next(val) {
        if (isDone) {
          return;
        }
        next(_this._pipeList.reduce((preVal, pipe) => pipe(preVal), val));
      },
      error() {
        if (isDone) {
          return;
        }
        isDone = true;
        error(...arguments);
      },
      complete() {
        if (isDone) {
          return;
        }
        isDone = true;
        complete(...arguments);
      },
    };
    this._unsubscribe = this._eventEmitter(emitter);
    return this;
  }
  unsubscribe(){
    this._unsubscribe && this._unsubscribe();
  }
}
function map(mapFun) {
  return function (val) {
    return mapFun(val);
  };
}

const source = new Observable((observer) => {
  let i = 0;
  const timer = setInterval(() => {
    observer.next(++i);
  }, 1000);
  return function unsubscribe() {
    clearInterval(timer);
  };
});
const subscription = source
  .pipe(
    map((i) => ++i),
    map((i) => i * 10)
  )
  .subscribe({
    next: (v) => console.log(v),
    error: (err) => console.error(err),
    complete: () => console.log("complete"),
  });

setTimeout(() => {
  subscription.unsubscribe();
}, 4500);

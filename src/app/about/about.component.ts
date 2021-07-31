import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { response } from "express";
import {
  concat,
  fromEvent,
  interval,
  noop,
  merge,
  Observable,
  of,
  Subject,
  timer,
  asapScheduler,
  asyncScheduler,
  bindCallback,
  bindNodeCallback,
  combineLatest,
  range,
  defer,
  EMPTY,
  forkJoin,
  from,
  generate,
  iif,
  NEVER,
  onErrorResumeNext,
  partition,
  queueScheduler,
  race,
  throwError,
  zip,
} from "rxjs";
import {
  concatMap,
  concatMapTo,
  map,
  mapTo,
  scan,
  takeUntil,
  throttleTime,
  delay,
  startWith,
  take,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();

  constructor() {}

  ngOnInit() {
    /************************************************************************************************/

    console.log(
      "****************************************************************"
    );

    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);

    const result$ = concat(source1$, source2$, source3$);

    result$.subscribe((val) => console.log(val));

    /************************************************************************************************/

    /*
    console.log('*****************************************************************');

    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(map(val => 10 * val));

    const result1$ = merge(interval1$,interval2$);

    result1$.subscribe(console.log);
    */

    /*
    const interval3$ = interval(1000);

    const sub1 = interval3$.subscribe(console.log);

    setTimeout(() => sub1.unsubscribe(), 5000);
    */

    /*********************************************************************************** Observable */

    console.log(
      "* Observable ***************************************************"
    );

    const observable = new Observable(function (observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
    });

    console.log("just before subscribe");
    observable.subscribe({
      next: (x) => console.log("got value " + x),
      error: (err) => console.error("something wrong occurred: " + err),
      complete: () => console.log("done"),
    });
    console.log("just after subscribe");

    /************************************************** Observables as generalizations of functions */

    console.log(
      "* Observables as generalizations of functions ******************"
    );

    var foo = new Observable(function (observer) {
      console.log("Hello");
      observer.next(42);
    });

    foo.subscribe(function (x) {
      console.log(x);
    });
    foo.subscribe(function (y) {
      console.log(y);
    });

    console.log(
      "* Observables are asychronous, that is not true... *************"
    );

    console.log("before");
    foo.subscribe(function (x) {
      console.log(x);
    });
    console.log("after");

    console.log(
      "* Observables, however, can do this: ***************************"
    );

    var foo = new Observable(function (observer) {
      console.log("Hello");
      observer.next(42);
      observer.next(100); // "return" another value
      observer.next(200); // "return" yet another
    });

    console.log("before");
    foo.subscribe(function (x) {
      console.log(x);
    });
    console.log("after");

    const interval$ = timer(3000, 1000);

    const sub2 = interval$.subscribe((val) =>
      console.log("stream 1 => " + val)
    );

    setTimeout(() => sub2.unsubscribe(), 5000);

    /************************************************************************************** Subject */

    console.log(
      "* Subject ******************************************************"
    );

    const subject = new Subject();

    subject.subscribe({
      next: (v) => console.log("observerA: " + v),
    });
    subject.subscribe({
      next: (v) => console.log("observerB: " + v),
    });

    subject.next(1);
    subject.next(2);

    /********************************************************************************* Observer */

    console.log(
      "* Observer *****************************************************"
    );

    var observer = {
      next: (x) => console.log("Observer got a next value: " + x),
      error: (err) => console.error("Observer got an error: " + err),
      complete: () => console.log("Observer got a complete notification"),
    };

    observable.subscribe(observer);

    console.log(
      "* Observer without complete callback ***************************"
    );

    var observer1 = {
      next: (x) => console.log("Observer got a next value: " + x),
      error: (err) => console.error("Observer got an error: " + err),
    };

    observable.subscribe((x) => console.log("Observer got a next value: " + x));

    /********************************************************************************* Subscription */

    console.log(
      "* Subscription *************************************************"
    );

    var observable1 = interval(400);
    var observable2 = interval(300);

    var subscription = observable1.subscribe((x) => console.log("first: " + x));
    var childSubscription = observable2.subscribe((x) =>
      console.log("second: " + x)
    );

    subscription.add(childSubscription);

    setTimeout(() => {
      // Unsubscribes BOTH subscription and childSubscription
      subscription.unsubscribe();
    }, 1000);

    /********************************************************************************* First examples */

    console.log(
      "* First examples ***********************************************"
    );

    document.addEventListener("click", () => console.log("Clicked!"));

    fromEvent(document, "click").subscribe(() => console.log("Clicked!"));

    let count = 0;
    document.addEventListener("click", () =>
      console.log(`Clicked ${++count} times`)
    );

    fromEvent(document, "click")
      .pipe(scan((count) => count + 1, 0))
      .subscribe((count) => console.log(`Clicked ${count} times`));

    console.log(
      "* First examples - Flow ****************************************"
    );

    fromEvent(document, "click")
      .pipe(
        throttleTime(1000),
        scan((count) => count + 1, 0)
      )
      .subscribe((count) => console.log(`Clicked ${count} times`));

    console.log(
      "* asapScheduler ************************************************"
    );

    asyncScheduler.schedule(() => console.log("async")); // scheduling 'asap' first...
    asapScheduler.schedule(() => console.log("asap"));

    console.log(
      "* asyncScheduler ***********************************************"
    );

    const task = () => console.log("it works!");

    asyncScheduler.schedule(task, 2000);

    // After 2 seconds logs:
    // "it works!"

    console.log(
      "* bindCallback *************************************************"
    );

    const someFunction = (cb) => {
      cb(5, "some string", { someProperty: "someValue" });
    };

    const boundSomeFunction = bindCallback(someFunction);
    boundSomeFunction().subscribe((values) => {
      console.log(values);
    });

    console.log(
      "* combineLatest ************************************************"
    );

    /*
    const firstTimer = timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    const secondTimer = timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
    const combinedTimers = combineLatest([firstTimer, secondTimer]);
    combinedTimers.subscribe(value => console.log(value));
    // Logs
    // [0, 0] after 0.5s
    // [1, 0] after 1s
    // [1, 1] after 1.5s
    // [2, 1] after 2s
    */

    const observables = [1, 5, 10].map((n) =>
      of(n).pipe(
        delay(n * 1000), // emit 0 and then emit n after n seconds
        startWith(0)
      )
    );
    const combined = combineLatest(observables);
    combined.subscribe((value) => console.log(value));
    // Logs
    // [0, 0, 0] immediately
    // [1, 0, 0] after 1s
    // [1, 5, 0] after 5s
    // [1, 5, 10] after 10s

    console.log(
      "* concat *******************************************************"
    );

    const timer1 = interval(1000).pipe(take(4));
    const sequence = range(1, 10);
    const result = concat(timer1, sequence);
    result.subscribe((x) => console.log(x));

    // results in:
    // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10

    console.log(
      "* defer ********************************************************"
    );

    const clicksOrInterval = defer(function () {
      return Math.random() > 0.5
        ? fromEvent(document, "click")
        : interval(1000);
    });
    clicksOrInterval.subscribe((x) => console.log(x));

    // Results in the following behavior:
    // If the result of Math.random() is greater than 0.5 it will listen
    // for clicks anywhere on the "document"; when document is clicked it
    // will log a MouseEvent object to the console. If the result is less
    // than 0.5 it will emit ascending numbers, one every second(1000ms).

    console.log(
      "* EMPTY ********************************************************"
    );

    EMPTY.subscribe({
      next: () => console.log("Next"),
      complete: () => console.log("Complete!"),
    });

    // Outputs
    // Complete!

    console.log(
      "* forkJoin *****************************************************"
    );

    const observable3 = forkJoin({
      foo: of(1, 2, 3, 4),
      bar: Promise.resolve(8),
      baz: timer(4000),
    });
    observable3.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log("This is how it ends!"),
    });

    // Logs:
    // { foo: 4, bar: 8, baz: 0 } after 4 seconds
    // "This is how it ends!" immediately after

    console.log(
      "* from *********************************************************"
    );

    const array = [10, 20, 30];
    const result1 = from(array);

    result1.subscribe((x) => console.log(x));

    // Logs:
    // 10
    // 20
    // 30

    console.log(
      "* generate ****************************************************"
    );

    const result2 = generate(
      0,
      (x) => x < 3,
      (x) => x + 1,
      (x) => x
    );

    result2.subscribe((x) => console.log(x));

    // Logs:
    // 0
    // 1
    // 2

    console.log(
      "* iif *********************************************************"
    );

    let subscribeToFirst;
    const firstOrSecond = iif(
      () => subscribeToFirst,
      of("first"),
      of("second")
    );

    subscribeToFirst = true;
    firstOrSecond.subscribe((value) => console.log(value));

    // Logs:
    // "first"

    subscribeToFirst = false;
    firstOrSecond.subscribe((value) => console.log(value));

    // Logs:
    // "second"

    console.log(
      "* interval ****************************************************"
    );

    const numbers = interval(1000);

    const takeFourNumbers = numbers.pipe(take(4));

    takeFourNumbers.subscribe((x) => console.log("Next: ", x));

    // Logs:
    // Next: 0
    // Next: 1
    // Next: 2
    // Next: 3

    console.log(
      "* merge *******************************************************"
    );

    const timer3 = interval(1000).pipe(take(10));
    const timer4 = interval(2000).pipe(take(6));
    const timer5 = interval(500).pipe(take(10));
    const concurrent = 2; // the argument
    const merged = merge(timer3, timer4, timer5, concurrent);
    merged.subscribe((x) => console.log(x));

    // Results in the following:
    // - First timer3 and timer4 will run concurrently
    // - timer3 will emit a value every 1000ms for 10 iterations
    // - timer4 will emit a value every 2000ms for 6 iterations
    // - after timer3 hits its max iteration, timer2 will
    //   continue, and timer5 will start to run concurrently with timer4
    // - when timer4 hits its max iteration it terminates, and
    //   timer5 will continue to emit a value every 500ms until it is complete

    console.log(
      "* NEVER *******************************************************"
    );

    function info() {
      console.log("Will not be called");
    }
    const result3 = NEVER.pipe(startWith(7));
    result3.subscribe((x) => console.log(x), info, info);

    console.log(
      "* Subscribe with an Observer **********************************"
    );

    const sumObserver = {
      sum: 0,
      next(value) {
        console.log("Adding: " + value);
        this.sum = this.sum + value;
      },
      error() {
        // We actually could just remove this method,
        // since we do not really care about errors right now.
      },
      complete() {
        console.log("Sum equals: " + this.sum);
      },
    };

    of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
      .subscribe(sumObserver);

    // Logs:
    // "Adding: 1"
    // "Adding: 2"
    // "Adding: 3"
    // "Sum equals: 6"

    console.log(
      "* Subscribe with function - Observer **************************"
    );

    const sumObserver1 = {
      sum: 0,
      next(value) {
        console.log("Adding: " + value);
        this.sum = this.sum + value;
      },
      error() {
        // We actually could just remove this method,
        // since we do not really care about errors right now.
      },
      complete() {
        console.log("Sum equals: " + this.sum);
      },
    };

    of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
      .subscribe(sumObserver1);

    // Logs:
    // "Adding: 1"
    // "Adding: 2"
    // "Adding: 3"
    // "Sum equals: 6"

    console.log(
      "* Cancel a function - Observer ********************************"
    );

    const subscription1 = interval(1000).subscribe({
      next(num) {
        console.log(num);
      },
      complete() {
        // Will not be called, even when cancelling subscription.
        console.log("completed!");
      },
    });

    setTimeout(() => {
      subscription1.unsubscribe();
      console.log("unsubscribed!");
    }, 2500);

    // Logs:
    // 0 after 1s
    // 1 after 2s
    // "unsubscribed!" after 2.5s

    console.log(
      "* onErrorResumeNext *******************************************"
    );

    onErrorResumeNext(
      of(1, 2, 3, 0).pipe(
        map((x) => {
          if (x === 0) throw Error();
          return 10 / x;
        })
      ),
      of(1, 2, 3)
    ).subscribe(
      (val) => console.log(val),
      (err) => console.log(err), // Will never be called.
      () => console.log("done")
    );

    // Logs:
    // 10
    // 5
    // 3.3333333333333335
    // 1
    // 2
    // 3
    // "done"

    console.log(
      "* partition ***************************************************"
    );

    const observableValues = of(1, 2, 3, 4, 5, 6);
    const [evens$, odds$] = partition(
      observableValues,
      (value, index) => value % 2 === 0
    );

    odds$.subscribe((x) => console.log("odds", x));
    evens$.subscribe((x) => console.log("evens", x));

    // Logs:
    // odds 1
    // odds 3
    // odds 5
    // evens 2
    // evens 4
    // evens 6

    console.log(
      "* queueScheduler **********************************************"
    );

    queueScheduler.schedule(() => {
      queueScheduler.schedule(() => console.log("second")); // will not happen now, but will be put on a queue

      console.log("first");
    });

    // Logs:
    // "first"
    // "second"

    console.log(
      "* race ********************************************************"
    );

    const obs1 = interval(1000).pipe(mapTo("fast one"), take(1));
    const obs2 = interval(3000).pipe(mapTo("medium one"), take(1));
    const obs3 = interval(5000).pipe(mapTo("slow one"), take(1));

    race(obs3, obs1, obs2).subscribe((winner) => console.log(winner));

    // Outputs
    // a series of 'fast one'

    console.log(
      "* range *******************************************************"
    );

    const numbers1 = range(1, 3);

    numbers1.subscribe({
      next: (value) => {
        console.log(value);
      },
      complete: () => {
        console.log("Complete!");
      },
    });

    // Logs:
    // 1
    // 2
    // 3
    // "Complete!"

    console.log(
      "* throwError **************************************************"
    );

    const delays$ = of(1000, 2000, Infinity, 3000);

    delays$
      .pipe(
        concatMap((ms) => {
          if (ms < 10000) {
            return timer(ms);
          } else {
            // Cleaner and easier to read for most folks.
            throw new Error(`Invalid time ${ms}`);
          }
        })
      )
      .subscribe({
        next: console.log,
        error: console.error,
      });

    console.log(
      "* timer *******************************************************"
    );

    // Build a Date object that marks the
    // next minute.
    const currentDate = new Date();
    const startOfNextMinute = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes() + 1
    );

    // This could be any observable stream
    const source = interval(1000);

    const result4 = source.pipe(takeUntil(timer(startOfNextMinute)), take(1));

    result.subscribe(console.log);
    console.log(currentDate);
    console.log(startOfNextMinute);

    /*
    timer(0, 1000).subscribe((n) => console.log("timer", n));
    interval(1000).subscribe((n) => console.log("interval", n));
    */

    console.log(
      "* zip *********************************************************"
    );

    let age$ = of(27, 25, 29);
    let name$ = of("Foo", "Bar", "Beer");
    let isDev$ = of(true, true, false);

    zip(age$, name$, isDev$)
      .pipe(map(([age, name, isDev]) => ({ age, name, isDev })))
      .subscribe((x) => console.log(x));

    // Outputs
    // { age: 27, name: 'Foo', isDev: true }
    // { age: 25, name: 'Bar', isDev: true }
    // { age: 29, name: 'Beer', isDev: false }
  }

  ngOnDestroy() {}

  close() {}
}

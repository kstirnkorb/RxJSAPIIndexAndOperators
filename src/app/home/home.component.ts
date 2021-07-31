import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  defer,
  interval,
  Observable,
  of,
  noop,
  timer,
  from,
  fromEvent,
  Subject,
  Subscription,
  EMPTY,
  animationFrameScheduler,
  range,
} from "rxjs";
import {
  catchError,
  delayWhen,
  filter,
  map,
  retryWhen,
  shareReplay,
  tap,
  audit,
  auditTime,
  buffer,
  scan,
  subscribeOn,
  takeUntil,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  concatAll,
  concatMap,
  concatMapTo,
  count,
  debounce,
  debounceTime,
  defaultIfEmpty,
  delay,
  dematerialize,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  elementAt,
  endWith,
  every,
  exhaustMap,
  expand,
  finalize,
  find,
  findIndex,
  first,
  mergeMap,
  groupBy,
  ignoreElements,
  isEmpty,
  last,
  reduce,
  mapTo,
  materialize,
  max,
  mergeAll,
  mergeMapTo,
  mergeScan,
  min,
  observeOn,
  onErrorResumeNext,
  pairwise,
  repeat,
  repeatWhen,
  retry,
  sample,
  sampleTime,
  sequenceEqual,
  share,
  single,
  skip,
  skipLast,
  skipUntil,
  startWith,
  switchAll,
  switchMap,
  switchMapTo,
  take,
  takeLast,
  takeWhile,
  throttle,
  throttleTime,
  throwIfEmpty,
  timeInterval,
  timeout,
  timestamp,
  toArray,
  window,
  windowCount,
  windowTime,
  windowToggle,
  windowWhen,
  withLatestFrom,
} from "rxjs/operators";
import { Operators } from "./../model/operators";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private operators: string;

  private ngUnsubscribe$ = new Subject<void>();

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  ngOnInit() {
    /*
        <div class="box">
            <div>
                <div class="title">
                    
                </div>
                <button class="button">
                    audit
                </button>
            </div>
        </div>
        */
    /*
        export interface Operators {
            id: number;
            description: string;
            isDeprecated: boolean;
        }
        */
  }

  audit() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      audit((ev) => interval(1000)),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  auditTime() {
    const clicks1 = fromEvent(document, "click");
    const result = clicks1.pipe(
      auditTime(1000),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  buffer() {
    const clicks2 = fromEvent(document, "click");
    const intervalEvents = interval(1000);
    const buffered = intervalEvents.pipe(
      buffer(clicks2),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    buffered.subscribe((x) => console.log(x));
  }

  bufferCount() {
    const clicks = fromEvent(document, "click");
    const buffered = clicks.pipe(
      bufferCount(2),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    buffered.subscribe((x) => console.log(x));
  }

  bufferTime() {
    const clicks = fromEvent(document, "click");
    const buffered = clicks.pipe(
      bufferTime(2000, 5000),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    buffered.subscribe((x) => console.log(x));
  }

  bufferToggle() {
    const clicks = fromEvent(document, "click");
    const openings = interval(1000);
    const buffered = clicks.pipe(
      bufferToggle(openings, (i) => (i % 2 ? interval(500) : EMPTY)),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    buffered.subscribe((x) => console.log(x));
  }

  bufferWhen() {
    const clicks = fromEvent(document, "click");
    const buffered = clicks.pipe(
      bufferWhen(() => interval(1000 + Math.random() * 1000)),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    buffered.subscribe((x) => console.log(x));
  }

  catchError() {
    of(1, 2, 3, 4, 5)
      .pipe(
        map((n) => {
          if (n === 4) {
            throw "four!";
          }
          return n;
        }),
        catchError((err) => of("I", "II", "III", "IV", "V"))
      )
      .subscribe((x) => console.log(x));
    // 1, 2, 3, I, II, III, IV, V
  }

  concatAll() {
    const clicks = fromEvent(document, "click");
    const higherOrder = clicks.pipe(
      map((ev) => interval(1000).pipe(takeUntil(this.ngUnsubscribe$), take(4)))
    );
    const firstOrder = higherOrder.pipe(concatAll());
    firstOrder.subscribe((x) => console.log(x));

    // Results in the following:
    // (results are not concurrent)
    // For every click on the "document" it will emit values 0 to 3 spaced
    // on a 1000ms interval
    // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
  }

  concatMap() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      concatMap((ev) => interval(1000).pipe(take(4))),
      takeUntil(this.ngUnsubscribe$)
    );
    result.subscribe((x) => console.log(x));

    // Results in the following:
    // (results are not concurrent)
    // For every click on the "document" it will emit values 0 to 3 spaced
    // on a 1000ms interval
    // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
  }

  concatMapTo() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      concatMapTo(interval(1000).pipe(take(4))),
      takeUntil(this.ngUnsubscribe$)
    );
    result.subscribe((x) => console.log(x));

    // Results in the following:
    // (results are not concurrent)
    // For every click on the "document" it will emit values 0 to 3 spaced
    // on a 1000ms interval
    // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
  }

  count() {
    const seconds = interval(1000);
    const clicks = fromEvent(document, "click");
    const secondsBeforeClick = seconds.pipe(
      takeUntil(clicks),
      takeUntil(this.ngUnsubscribe$)
    );
    const result = secondsBeforeClick.pipe(count());
    result.subscribe((x) => console.log(x));
  }

  debounce() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      scan((i) => ++i, 1),
      debounce((i) => interval(200 * i)),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  debouceTime() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      debounceTime(1000),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  defaultIfEmpty() {
    const clicks = fromEvent(document, "click");
    const clicksBeforeFive = clicks.pipe(takeUntil(interval(5000)));
    const result = clicksBeforeFive.pipe(
      defaultIfEmpty(),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  delay() {
    const clicks = fromEvent(document, "click");
    const delayedClicks = clicks.pipe(
      delay(1000),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    ); // each click emitted after 1 second
    delayedClicks.subscribe((x) => console.log(x));
  }

  delayWhen() {
    const clicks = fromEvent(document, "click");
    const delayedClicks = clicks.pipe(
      delayWhen((event) => interval(Math.random() * 5000)),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    delayedClicks.subscribe((x) => console.log(x));
  }

  dematerialize() {
    /*
        const notifA = { kind: 'N', value: 'A' };
        const notifB = { kind: 'N', value: 'B' };
        const notifE = { kind: 'E', error: new TypeError('x.toUpperCase is not a function') }

        const materialized = of(notifA, notifB, notifE);

        const upperCase = materialized.pipe(
            dematerialize(),
            takeUntil(this.ngUnsubscribe$),
            take(1)
        );
        upperCase.subscribe({
            next: x => console.log(x),
            error: e => console.error(e)
        });

        // Results in:
        // A
        // B
        // TypeError: x.toUpperCase is not a function
        */
  }

  distinct() {
    of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
      .pipe(distinct(), takeUntil(this.ngUnsubscribe$), take(4))
      .subscribe((x) => console.log(x));

    // Outputs
    // 1
    // 2
    // 3
    // 4
  }

  distinctUntilChanged() {
    //
  }

  distinctUntilKeyChanged() {
    interface Person {
      age: number;
      name: string;
    }

    of(
      { age: 4, name: "Foo" },
      { age: 7, name: "Bar" },
      { age: 5, name: "Foo" },
      { age: 6, name: "Foo" }
    )
      .pipe(distinctUntilKeyChanged("name"), takeUntil(this.ngUnsubscribe$))
      .subscribe((x) => console.log(x));

    // displays:
    // { age: 4, name: 'Foo' }
    // { age: 7, name: 'Bar' }
    // { age: 5, name: 'Foo' }
  }

  elementAt() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(elementAt(2), takeUntil(this.ngUnsubscribe$));
    result.subscribe((x) => console.log(x));

    // Results in:
    // click 1 = nothing
    // click 2 = nothing
    // click 3 = MouseEvent object logged to console
  }

  endWith() {
    const ticker$ = interval(5000).pipe(map(() => "tick"));

    const documentClicks$ = fromEvent(document, "click");

    ticker$
      .pipe(
        startWith("interval started"),
        takeUntil(documentClicks$),
        endWith("interval ended by click"),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((x) => console.log(x));

    // Result (assuming a user clicks after 15 seconds)
    // "interval started"
    // "tick"
    // "tick"
    // "tick"
    // "interval ended by click"
  }

  every() {
    of(1, 2, 3, 4, 5, 6)
      .pipe(
        every((x) => x < 5),
        takeUntil(this.ngUnsubscribe$),
        take(1)
      )
      .subscribe((x) => console.log(x)); // -> false
  }

  exhaustMap() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      exhaustMap((ev) => interval(1000).pipe(take(5))),
      takeUntil(this.ngUnsubscribe$)
    );
    result.subscribe((x) => console.log(x));
  }

  expand() {
    const clicks = fromEvent(document, "click");
    const powersOfTwo = clicks.pipe(
      mapTo(1),
      expand((x) => of(2 * x).pipe(delay(1000))),
      takeUntil(this.ngUnsubscribe$),
      take(10)
    );
    powersOfTwo.subscribe((x) => console.log(x));
  }

  filter() {
    /*
        const clicks = fromEvent(document, 'click');
        const clicksOnDivs = clicks.pipe(filter(ev => ev.target.tagName === 'DIV'));
        clicksOnDivs.subscribe(x => console.log(x));
        */
  }

  finalize() {
    // emit value in sequence every 1 second
    const source = interval(1000);
    const example = source.pipe(
      takeUntil(this.ngUnsubscribe$),
      take(5), //take only the first 5 values
      finalize(() => console.log("Sequence complete")) // Execute when the observable completes
    );
    const subscribe = example.subscribe((val) => console.log(val));

    // results:
    //   0
    //   1
    //   2
    //   3
    //   4
    //   'Sequence complete'
  }

  find() {
    /*
        const clicks = fromEvent(document, 'click');
        const result = clicks.pipe(find(ev => ev.target.tagName === 'DIV'));
        result.subscribe(x => console.log(x));
        */
  }

  findIndex() {
    /*
        const clicks = fromEvent(document, 'click');
        const result = clicks.pipe(findIndex(ev => ev.target.tagName === 'DIV'));
        result.subscribe(x => console.log(x));
        */
  }

  first() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      first(),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  groupBy() {
    of(
      { id: 1, name: "JavaScript" },
      { id: 2, name: "Parcel" },
      { id: 2, name: "webpack" },
      { id: 1, name: "TypeScript" },
      { id: 3, name: "TSLint" }
    )
      .pipe(
        groupBy((p) => p.id),
        mergeMap((group$) =>
          group$.pipe(
            takeUntil(this.ngUnsubscribe$),
            take(1),
            reduce((acc, cur) => [...acc, cur], [])
          )
        )
      )
      .subscribe((p) => console.log(p));

    // displays:
    // [ { id: 1, name: 'JavaScript'},
    //   { id: 1, name: 'TypeScript'} ]
    //
    // [ { id: 2, name: 'Parcel'},
    //   { id: 2, name: 'webpack'} ]
    //
    // [ { id: 3, name: 'TSLint'} ]
  }

  ignoreElements() {
    of("you", "talking", "to", "me")
      .pipe(ignoreElements(), takeUntil(this.ngUnsubscribe$), take(1))
      .subscribe(
        (word) => console.log(word),
        (err) => console.log("error:", err),
        () => console.log("the end")
      );
    // result:
    // 'the end'
  }

  isEmpty() {
    const source = new Subject<string>();
    const result = source.pipe(
      isEmpty(),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );

    source.subscribe((x) => console.log(x));
    result.subscribe((x) => console.log(x));

    source.next("a");
    source.next("b");
    source.next("c");
    source.complete();

    // Outputs
    // a
    // false
    // b
    // c
  }

  last() {
    const source = from(["x", "y", "z"]);
    const example = source.pipe(
      last(),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    //output: "Last alphabet: z"
    example.subscribe((val) => console.log(`Last alphabet: ${val}`));
  }

  map() {
    /*
        const clicks = fromEvent(document, 'click');
        const positions = clicks.pipe(map(ev => ev.clientX));
        positions.subscribe(x => console.log(x));
        */
  }

  mapTo() {
    const clicks = fromEvent(document, "click");
    const greetings = clicks.pipe(
      mapTo("Hi"),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    greetings.subscribe((x) => console.log(x));
  }

  materialize() {
    const letters = of("a", "b", 13, "d");
    const upperCase = letters;
    const materialized = upperCase.pipe(
      materialize(),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    materialized.subscribe((x) => console.log(x));

    // Results in the following:
    // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
    // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
    // - Notification {kind: "E", value: undefined, error: TypeError:
    //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
    //   [as project] (http://1…, hasValue: false}
  }

  max() {
    interface Person {
      age: number;
      name: string;
    }
    of(
      { age: 7, name: "Foo" },
      { age: 5, name: "Bar" },
      { age: 9, name: "Beer" }
    )
      .pipe(
        max<Person>((a: Person, b: Person) => (a.age < b.age ? -1 : 1)),
        takeUntil(this.ngUnsubscribe$),
        take(1)
      )
      .subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
  }

  mergeAll() {
    const clicks = fromEvent(document, "click");
    const higherOrder = clicks.pipe(
      map((ev) => interval(1000)),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    const firstOrder = higherOrder.pipe(mergeAll());
    firstOrder.subscribe((x) => console.log(x));
  }

  mergeMap() {
    const letters = of("a", "b", "c");
    const result = letters.pipe(
      mergeMap((x) => interval(1000).pipe(map((i) => x + i))),
      takeUntil(this.ngUnsubscribe$),
      take(9)
    );
    result.subscribe((x) => console.log(x));

    // Results in the following:
    // a0
    // b0
    // c0
    // a1
    // b1
    // c1
    // continues to list a,b,c with respective ascending integers
  }

  mergeMapTo() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      mergeMapTo(interval(1000)),
      takeUntil(this.ngUnsubscribe$),
      take(10)
    );
    result.subscribe((x) => console.log(x));
  }

  mergeScan() {
    const click$ = fromEvent(document, "click");
    const one$ = click$.pipe(mapTo(1));
    const seed = 0;
    const count$ = one$.pipe(
      mergeScan((acc, one) => of(acc + one), seed),
      takeUntil(this.ngUnsubscribe$)
    );
    count$.subscribe((x) => console.log(x));

    // Results:
    // 1
    // 2
    // 3
    // 4
    // ...and so on for each click
  }

  min() {
    of(5, 4, 7, 2, 8)
      .pipe(min(), takeUntil(this.ngUnsubscribe$))
      .subscribe((x) => console.log(x)); // -> 2
  }

  observeOn() {
    /*
    const someDiv = document.querySelector("#someDiv");
    const intervals = interval(10);                // Intervals are scheduled
                                                   // with async scheduler by default...
    intervals.pipe(
      observeOn(animationFrameScheduler),          // ...but we will observe on animationFrame
    )                                              // scheduler to ensure smooth animation.
    .subscribe(val => {
      someDiv.style.height = val + 'px';
    });
    */
  }

  onErrorResumeNext() {
    of(1, 2, 3, 0)
      .pipe(
        map((x) => {
          if (x === 0) {
            throw Error();
          }
          return 10 / x;
        }),
        onErrorResumeNext(of(1, 2, 3))
      )
      .subscribe(
        (val) => console.log(val),
        (err) => console.log(err), // Will never be called.
        () => console.log("that's it!")
      );

    // Logs:
    // 10
    // 5
    // 3.3333333333333335
    // 1
    // 2
    // 3
    // "that's it!"
  }

  pairwise() {
    /*
    const clicks = fromEvent(document, "click");
    const pairs = clicks.pipe(pairwise());
    const distance = pairs.pipe(
      map((pair) => {
        const x0 = pair[0].clientX;
        const y0 = pair[0].clientY;
        const x1 = pair[1].clientX;
        const y1 = pair[1].clientY;
        return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
      })
    );
    distance.subscribe((x) => console.log(x));
    */
  }

  reduce() {
    const clicksInFiveSeconds = fromEvent(document, "click").pipe(
      takeUntil(interval(5000))
    );
    const ones = clicksInFiveSeconds.pipe(mapTo(1));
    const seed = 0;
    const count = ones.pipe(reduce((acc, one) => acc + one, seed));
    count.subscribe((x) => console.log(x));
  }

  repeat() {
    const source = of("Repeat message");
    const example = source.pipe(repeat(3));
    example.subscribe((x) => console.log(x));

    // Results
    // Repeat message
    // Repeat message
    // Repeat message
  }

  repeatWhen() {
    const source = of("Repeat message");
    const documentClick$ = fromEvent(document, "click");

    source
      .pipe(repeatWhen(() => documentClick$))
      .subscribe((data) => console.log(data));
  }

  retryWhen() {
    const source = interval(1000);
    const example = source.pipe(
      map((val) => {
        if (val > 5) {
          // error will be picked up by retryWhen
          throw val;
        }
        return val;
      }),
      retryWhen((errors) =>
        errors.pipe(
          // log error message
          tap((val) => console.log(`Value ${val} was too high!`)),
          // restart in 5 seconds
          delayWhen((val) => timer(val * 1000)),
          takeUntil(this.ngUnsubscribe$),
          take(1)
        )
      )
    );

    const subscribe = example.subscribe((val) => console.log(val));

    // results:
    //   0
    //   1
    //   2
    //   3
    //   4
    //   5
    //   "Value 6 was too high!"
    //  --Wait 5 seconds then repeat
  }

  sample() {
    const seconds = interval(1000);
    const clicks = fromEvent(document, "click");
    const result = seconds.pipe(
      sample(clicks),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  sampleTime() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      sampleTime(1000),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  scan() {
    const numbers$ = of(1, 2, 3);

    numbers$
      .pipe(
        // Get the sum of the numbers coming in.
        scan((total, n) => total + n),
        // Get the average by dividing the sum by the total number
        // received so var (which is 1 more than the zero-based index).
        map((sum, index) => sum / (index + 1))
      )
      .subscribe(console.log);
  }

  sequenceEqual() {
    /*
    const codes = from([
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
      "Enter", // no start key, clearly.
    ]);

    const keys = fromEvent(document, "keyup").pipe(map((e) => e.code));
    const matches = keys.pipe(
      bufferCount(11, 1),
      mergeMap((last11) => from(last11).pipe(sequenceEqual(codes)))
    );
    matches.subscribe((matched) =>
      console.log("Successful cheat at Contra? ", matched)
    );
    */
  }

  share() {
    const source = interval(1000).pipe(
      map((x: number) => {
        console.log("Processing: ", x);
        return x * x;
      }),
      share(),
      takeUntil(this.ngUnsubscribe$),
      take(3)
    );

    source.subscribe((x) => console.log("subscription 1: ", x));
    source.subscribe((x) => console.log("subscription 1: ", x));

    // Logs:
    // Processing:  0
    // subscription 1:  0
    // subscription 1:  0
    // Processing:  1
    // subscription 1:  1
    // subscription 1:  1
    // Processing:  2
    // subscription 1:  4
    // subscription 1:  4
  }

  shareReplay() {
    const obs$ = interval(1000);
    const shared$ = obs$.pipe(
      take(4),
      shareReplay(3),
      takeUntil(this.ngUnsubscribe$)
    );
    shared$.subscribe((x) => console.log("sub A: ", x));
    shared$.subscribe((y) => console.log("sub B: ", y));
  }

  single() {
    const source1 = of(
      { name: "Ben" },
      { name: "Tracy" },
      { name: "Laney" },
      { name: "Lily" }
    );

    source1
      .pipe(single((x) => x.name.startsWith("B")))
      .subscribe((x) => console.log(x));
    // Emits "Ben"

    const source2 = of(
      { name: "Ben" },
      { name: "Tracy" },
      { name: "Bradley" },
      { name: "Lincoln" }
    );

    source2
      .pipe(single((x) => x.name.startsWith("B")))
      .subscribe((x) => console.log(x));
    // Error emitted: SequenceError('Too many values match')

    const source3 = of(
      { name: "Laney" },
      { name: "Tracy" },
      { name: "Lily" },
      { name: "Lincoln" }
    );

    source3
      .pipe(single((x) => x.name.startsWith("B")))
      .subscribe((x) => console.log(x));
    // Error emitted: NotFoundError('No values match')
  }

  skip() {
    //emit every half second
    const source = interval(500);
    //skip the first 10 emitted values
    const example = source.pipe(
      skip(1),
      takeUntil(this.ngUnsubscribe$),
      take(10)
    );
    //output: 10...11...12...13........
    const subscribe = example.subscribe((val) => console.log(val));
  }

  skipLast() {
    const numbers = of(1, 2, 3, 4, 5);
    const skipLastTwo = numbers.pipe(
      skipLast(2),
      takeUntil(this.ngUnsubscribe$),
      take(10)
    );
    skipLastTwo.subscribe((x) => console.log(x));

    // Results in:
    // 1 2 3
    // (4 and 5 are skipped)
  }

  skipUntil() {
    const intervalObservable = interval(1000);
    const click = fromEvent(document, "click");

    const emitAfterClick = intervalObservable.pipe(
      skipUntil(click),
      takeUntil(this.ngUnsubscribe$),
      take(10)
    );
    // clicked at 4.6s. output: 5...6...7...8........ or
    // clicked at 7.3s. output: 8...9...10..11.......
    const subscribe = emitAfterClick.subscribe((value) => console.log(value));
  }

  skipWhile() {
    /*
    import { from } from 'rxjs';
    import { skipWhile } from 'rxjs/operators';

    const source = from(['Green Arrow', 'SuperMan', 'Flash', 'SuperGirl', 'Black Canary'])
    // Skip the heroes until SuperGirl
    const example = source.pipe(skipWhile((hero) => hero !== 'SuperGirl'));
    // output: SuperGirl, Black Canary
    example.subscribe((femaleHero) => console.log(femaleHero));
    */
  }

  startWith() {
    timer(1000)
      .pipe(
        map(() => "timer emit"),
        startWith("timer start"),
        takeUntil(this.ngUnsubscribe$),
        take(2)
      )
      .subscribe((x) => console.log(x));

    // results:
    // "timer start"
    // "timer emit"
  }

  switchAll() {
    const clicks = fromEvent(document, "click").pipe(
      tap(() => console.log("click"))
    );
    const source = clicks.pipe(
      map((ev) => interval(1000)),
      takeUntil(this.ngUnsubscribe$)
    );

    source.pipe(switchAll()).subscribe((x) => console.log(x));

    // Output
    // click
    // 1
    // 2
    // 3
    // 4
    // ...
    // click
    // 1
    // 2
    // 3
    // ...
    // click
    // ...
  }

  switchMap() {
    const switched = of(1, 2, 3).pipe(
      switchMap((x: number) => of(x, x ** 2, x ** 3))
    );
    switched.subscribe((x) => console.log(x));
    // outputs
    // 1
    // 1
    // 1
    // 2
    // 4
    // 8
    // ... and so on
  }

  switchMapTo() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      switchMapTo(interval(1000)),
      takeUntil(this.ngUnsubscribe$),
      take(10)
    );
    result.subscribe((x) => console.log(x));
  }

  take() {
    const intervalCount = interval(1000);
    const takeFive = intervalCount.pipe(
      take(5),
      takeUntil(this.ngUnsubscribe$)
    );
    takeFive.subscribe((x) => console.log(x));

    // Logs:
    // 0
    // 1
    // 2
    // 3
    // 4
  }

  takeLast() {
    const many = range(1, 100);
    const lastThree = many.pipe(takeLast(3), takeUntil(this.ngUnsubscribe$));
    lastThree.subscribe((x) => console.log(x));
  }

  takeUntil() {
    const source = interval(1000);
    const clicks = fromEvent(document, "click");
    const result = source.pipe(takeUntil(clicks));
    result.subscribe((x) => console.log(x));
  }

  takeWhile() {
    /*
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(takeWhile((ev) => ev.clientX > 200));
    result.subscribe((x) => console.log(x));
    */
  }

  tap() {
    of(Math.random())
      .pipe(
        tap(console.log),
        map((n) => (n > 0.5 ? "big" : "small")),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(console.log);
  }

  throttle() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      throttle((ev) => interval(1000)),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  throttleTime() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      throttleTime(1000),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  throwIfEmpty() {
    const click$ = fromEvent(document, "click");

    click$
      .pipe(
        takeUntil(timer(1000)),
        throwIfEmpty(
          () => new Error("the document was not clicked within 1 second")
        ),
        takeUntil(this.ngUnsubscribe$),
        take(1)
      )
      .subscribe({
        next() {
          console.log("The button was clicked");
        },
        error(err) {
          console.error(err);
        },
      });
  }

  timeInterval() {
    const seconds = interval(1000);

    seconds
      .pipe(timeInterval(), takeUntil(this.ngUnsubscribe$), take(3))
      .subscribe(
        (value) => console.log(value),
        (err) => console.log(err)
      );

    seconds.pipe(timeout(900)).subscribe(
      (value) => console.log(value),
      (err) => console.log(err)
    );

    // NOTE: The values will never be this precise,
    // intervals created with `interval` or `setInterval`
    // are non-deterministic.

    // {value: 0, interval: 1000}
    // {value: 1, interval: 1000}
    // {value: 2, interval: 1000}
  }

  timestamp() {
    const clickWithTimestamp = fromEvent(document, "click").pipe(
      timestamp(),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );

    // Emits data of type {value: MouseEvent, timestamp: number}
    clickWithTimestamp.subscribe((data) => {
      console.log(data);
    });
  }

  toArray() {
    const source = interval(1000);
    const example = source.pipe(
      take(10),
      toArray(),
      takeUntil(this.ngUnsubscribe$)
    );

    const subscribe = example.subscribe((val) => console.log(val));

    // output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  window() {
    const clicks = fromEvent(document, "click");
    const sec = interval(1000);
    const result = clicks.pipe(
      window(sec),
      map((win) => win.pipe(take(2), takeUntil(this.ngUnsubscribe$))), // each window has at most 2 emissions
      mergeAll() // flatten the Observable-of-Observables
    );
    result.subscribe((x) => console.log(x));
  }

  windowCount() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      windowCount(3),
      map((win) => win.pipe(skip(1), takeUntil(this.ngUnsubscribe$))), // skip first of every 3 clicks
      mergeAll() // flatten the Observable-of-Observables
    );
    result.subscribe((x) => console.log(x));
  }

  windowTime() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      windowTime(1000),
      map((win) => win.pipe(take(2))), // each window has at most 2 emissions
      mergeAll(), // flatten the Observable-of-Observables
      takeUntil(this.ngUnsubscribe$)
    );
    result.subscribe((x) => console.log(x));
  }

  windowToggle() {
    const clicks = fromEvent(document, "click");
    const openings = interval(1000);
    const result = clicks.pipe(
      windowToggle(openings, (i) => (i % 2 ? interval(500) : EMPTY)),
      mergeAll(),
      takeUntil(this.ngUnsubscribe$)
    );
    result.subscribe((x) => console.log(x));
  }

  windowWhen() {
    const clicks = fromEvent(document, "click");
    const result = clicks.pipe(
      windowWhen(() => interval(1000 + Math.random() * 4000)),
      map((win) => win.pipe(take(2))), // each window has at most 2 emissions
      mergeAll(), // flatten the Observable-of-Observables
      takeUntil(this.ngUnsubscribe$)
    );
    result.subscribe((x) => console.log(x));
  }

  withLatestFrom() {
    const clicks = fromEvent(document, "click");
    const timer = interval(1000);
    const result = clicks.pipe(
      withLatestFrom(timer),
      takeUntil(this.ngUnsubscribe$),
      take(1)
    );
    result.subscribe((x) => console.log(x));
  }

  operatorsNa() {
    console.log("N/A");
  }
}

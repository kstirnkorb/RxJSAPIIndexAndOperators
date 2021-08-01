# Installation pre-requisites

IMPORTANT: Please use the latest Node and especially NPM, to make sure the package-lock.json is used.

# Installing the Angular CLI

With the following command the angular-cli will be installed globally in your machine:

    npm install -g @angular/cli

# How To install this repository

Its also possible to install the modules as usual using npm:

    npm install

NPM 5 or above has the big advantage that if you use it you will be installing the exact same dependencies than I installed in my machine, so you wont run into issues caused by semantic versioning updates.

This should take a couple of minutes. If there are issues, please post the complete error message in the Questions section of the course.

# To Run the Development Backend Server

In order to be able to provide realistic examples, we will need in our playground a small REST API backend server. We can start the sample application backend with the following command:

    npm run server

This is a small Node REST API server.

# To run the Development UI Server

To run the frontend part of our code, we will use the Angular CLI:

    npm start

The application is visible at port 4200: [http://localhost:4200](http://localhost:4200). DON'T FORGET... More Tools... Developer Tools... ON IT.

# RxJS (Deprecated, soon be deprecated, n/a) and Operators (deprecated, soon be deprecated, n/a)

RxJS (Deprecated, soon be deprecated, n/a)

##

animationFrame - deprecated

##

animationFrames - soon be deprecated

##

animationFrameScheduler - n/a

##

ArgumentOutOfRangeError - n/a

##

asap - deprecated

##

asapScheduler - n/a

##

async - deprecated

##

asyncScheduler - n/a

##

AsyncSubject - n/a

##

BehaviorSubject - n/a

##

bindCallback - n/a

##

bindNodeCallback - n/a

##

combineLatest - n/a

##

CompleteNotification - n/a

##

CompletionObserver - n/a

##

concat - n/a

##

config - n/a

##

connectable - n/a

##

ConnectableObservable - deprecated

##

Cons - n/a

##

defer - n/a

##

empty - deprecated

##

EMPTY - n/a

##

EmptyError - n/a

##

ErrorNotification - n/a

##

ErrorObserver - n/a

##

FactoryOrValue - n/a

##

Falsy - n/a

##

firstValueFrom - soon be deprecated

##

forkJoin - n/a

##

from - n/a

##

fromEvent - n/a

##

fromEventPattern - n/a

##

generate - n/a

##

GlobalConfig - n/a

##

GroupedObservable - n/a

##

Head - n/a

##

identity - n/a

##

iif - n/a

##

InteropObservable - n/a

##

interval - n/a

##

isObservable - n/a

##

lastValueFrom - soon be deprecated

##

merge - n/a

##

MonoTypeOperatorFunction - n/a

##

never - deprecated

##

NEVER - n/a

##

NextNotification - n/a

##

NextObserver - n/a

##

noop - n/a

##

NotFoundError - n/a

##

Notifcation - deprecated

##

NotificationKind - deprecated

##

ObjectUnsubscribedError - n/a

##

Observable - n/a

##

observable - n/a

##

ObservableInput - n/a

##

ObservableInputTuple - n/a

##

ObservableLike - deprecated

##

ObservableNotification - n/a

##

ObservedValueOf - n/a

##

ObservedValuesFromArray - deprecated

##

ObservedValueTupleFromArray - n/a

##

ObservedValueUnionFromArray - n/a

##

Observer - n/a

##

of - n/a

##

onErrorResumeNext - n/a

##

Operator - deprecated

##

OperatorFunction - n/a

##

pairs - deprecated

##

PartialObserver - n/a

##

partition - n/a

##

pipe - n/a

##

queue - deprecated

##

queueScheduler - n/a

##

race - n/a

##

range - n/a

##

ReadableStreamLike - n/a

##

ReplaySubject - n/a

##

scheduled - n/a

##

Scheduler - deprecated

##

SchedulerAction - n/a

##

SchedulerLike - n/a

##

SequenceError - n/a

##

Subject - n/a

##

SubjectLike - n/a

##

Subscribable - n/a

##

SubscribableOrPromise - deprecated

##

Subscriber - n/a

##

Subscription - n/a

##

SubscriptionLike - n/a

##

Tail - n/a

##

TeardownLogic - n/a

##

throwError - n/a

##

TimeInterval - n/a

##

TimeoutError - n/a

##

timer - n/a

##

Timestamp - n/a

##

TimestampProvider - n/a

##

TruthyTypesOf - n/a

##

UnaryFunction - n/a

##

Unsubscribable - n/a

##

UnsubscriptionError - n/a

##

using - n/a

##

ValueFromArray - n/a

##

ValueFromNotification - n/a

##

VirtualAction - n/a

##

VirtualTimeScheduler - n/a

##

zip n/a

##

Operators (deprecated, soon be deprecated, n/a)
audit n/a
auditTime n/a
buffer n/a
bufferCount n/a
bufferTime n/a
bufferToggle n/a
bufferWhen n/a
catchError n/a
combineAll deprecated
combineLatest deprecated
combineLatestAll soon be deprecated
combineLatestWith soon be deprecated
concat deprecated
concatAll n/a
concatMap n/a
concatMapTo n/a
concatWith soon be deprecated
connect soon be deprecated
count n/a
debounce n/a
debounceTime n/a
defaultIfEmpty n/a
delay n/a
delayWhen n/a
dematerialize n/a
distinct n/a
distinctUntilChanged n/a
distinctUntilKeyChanged n/a
elementAt n/a
endWith n/a
every n/a
exhaust deprecated
exhaustAll soon be deprecated
exhaustMap n/a
expand n/a
filter n/a
finalize n/a
find n/a
findIndex n/a
first n/a
flatMap deprecated
groupBy n/a
ignoreElements n/a
isEmpty n/a
last n/a
map n/a
mapTo n/a
materialize n/a
max n/a
merge soon be deprecated
mergeAll n/a
mergeMap n/a
mergeMapTo n/a
mergeScan n/a
mergeWith soon be deprecated
min n/a
multicast deprecated
observeOn n/a
onErrorResumeNext n/a
pairwise n/a
partition deprecated
pluck deprecated
publish deprecated
publishBehavior deprecated
publishLast deprecated
publishReplay deprecated
race deprecated
raceWith soon be deprecated
reduce n/a
refCount deprecated
repeat n/a
repeatWhen n/a
retry n/a
retryWhen n/a
sample n/a
sampleTime n/a
scan n/a
sequenceEqual n/a
share n/a
shareReplay n/a
single n/a
skip n/a
skipLast n/a
skipUntil n/a
skipWhile n/a
startWith n/a
subscribeOn n/a
switchAll n/a
switchMap n/a
switchMapTo n/a
switchScan n/a
take n/a
takeLast n/a
takeUntil n/a
takeWhile n/a
tap n/a
throttle n/a
throttleTime n/a
throwIfEmpty n/a
timeInterval n/a
timeout soon be deprecated
timeoutWith n/a
timestamp n/a
toArray n/a
window n/a
windowCount n/a
windowTime n/a
windowToggle n/a
windowWhen n/a
withLatestFrom n/a
zip deprecated
zipAll n/a
zipWith n/a

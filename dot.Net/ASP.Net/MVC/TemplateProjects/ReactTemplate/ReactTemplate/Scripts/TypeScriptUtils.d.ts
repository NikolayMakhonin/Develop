/// <reference path="../../../../../../../../../_SVN/remote/NetPro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/typings/jquery/jquery.d.ts" />
/// <reference path="../../../../../../../../../_SVN/remote/NetPro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../../../../../../../_SVN/remote/NetPro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/typings/jasmine/karma-jasmine.d.ts" />
declare module mika.utils.Events {
    interface IEventArgs {
    }
    class EventArgs implements IEventArgs {
        static Empty: EventArgs;
    }
}
declare module mika.utils.Contracts.Patterns {
    interface IDisposable {
        dispose(): any;
    }
}
declare module mika.utils.Events {
    import IDisposable = utils.Contracts.Patterns.IDisposable;
    import IFuncQuant = mika.utils.Async.Quants.IFuncQuant;
    import IQuantFunc = mika.utils.Async.Quants.IQuantFunc;
    interface IBaseEventListener<TEventArgs extends EventArgs> extends Function {
        (o: any, e: TEventArgs, waitFor?: (listnerId: number) => boolean | void): any;
        _ListenerId?: any;
    }
    interface IEventListener<TEventArgs extends EventArgs> extends IBaseEventListener<TEventArgs> {
        (o: any, e: TEventArgs, waitFor?: (listnerId: number) => boolean | void): boolean | void;
        _ListenerId?: any;
    }
    interface IQuantizedEventListener<TEventArgs extends EventArgs> extends IBaseEventListener<TEventArgs> {
        (o: any, e: TEventArgs, waitFor?: (listnerId: number) => boolean | void, quantizedWaitFor?: (listnerId: number) => IFuncQuant<boolean>): IFuncQuant<boolean> | boolean | void;
        _ListenerId?: any;
    }
    interface IEventInvoker<TEventArgs extends IEventArgs> extends IDisposable {
        invoke(o: Object, e: TEventArgs): any;
    }
    interface IQuantizedEventInvoker<TEventArgs extends IEventArgs> extends IEventInvoker<TEventArgs> {
        invoke(o: Object, e: TEventArgs): IQuantFunc[];
    }
    interface IEventHandlerTemplate<TEventArgs extends IEventArgs, TEventListener extends IBaseEventListener<any>> {
        count(): number;
        add(listener: TEventListener): any;
        remove(listener: TEventListener): any;
    }
    interface IEventHandler<TEventArgs extends IEventArgs> extends IEventHandlerTemplate<TEventArgs, IEventListener<TEventArgs>> {
    }
    interface IQuantizedEventHandler<TEventArgs extends IEventArgs> extends IEventHandlerTemplate<TEventArgs, IQuantizedEventListener<TEventArgs>> {
    }
}
declare module mika.utils {
    class Error {
        name: string;
        message: string;
        stack: string;
        constructor(message?: string);
    }
    class StackTrace extends Error {
        name: any;
        constructor(message?: string);
    }
    class Exception extends StackTrace {
        name: string;
        innerError: any;
        constructor(message?: string, innerError?: any);
        toString(): string;
    }
    class IllegalArgumentException extends Exception {
        name: string;
        constructor(message?: string, innerError?: any);
    }
    class IndexOutOfBoundsException extends Exception {
        name: string;
        constructor(message?: string, innerError?: any);
    }
    class IllegalStateException extends Exception {
        name: string;
        constructor(message?: string, innerError?: any);
    }
    class UnsupportedOperationException extends Exception {
        name: string;
        constructor(message?: string, innerError?: any);
    }
    class NoSuchElementException extends Exception {
        name: string;
        constructor(message?: string, innerError?: any);
    }
    class NullPointerException extends Exception {
        name: string;
        constructor(message?: string, innerError?: any);
    }
}
declare module mika.utils.Events {
    class EventHandlerBase<TEventArgs extends EventArgs, TEventListener extends IBaseEventListener<any>> implements IEventHandlerTemplate<TEventArgs, TEventListener>, IEventInvoker<EventArgs> {
        _disposed: boolean;
        add(listener: TEventListener): void;
        remove(listener: TEventListener): void;
        count(): number;
        invoke(o: Object, e: TEventArgs): void;
        dispose(): void;
    }
}
declare module mika.utils.Events {
    class EventHandlerTemplate<TEventArgs extends EventArgs, TEventListener extends IBaseEventListener<any>> extends EventHandlerBase<TEventArgs, TEventListener> {
        protected listeners: TEventListener[];
        count(): number;
        add(listener: TEventListener): void;
        remove(listener: TEventListener): void;
        dispose(): void;
    }
}
declare module mika.utils.Events {
    class EventHandler<TEventArgs extends EventArgs> extends EventHandlerTemplate<TEventArgs, IEventListener<TEventArgs>> {
        invoke(o: Object, e: TEventArgs): void;
    }
}
declare module mika.utils.Async.Quants {
    import EventArgs = mika.utils.Events.EventArgs;
    class UnhandledExceptionEventArgs extends EventArgs {
        private _exception;
        private _throwAfterEventHandlers;
        getException(): any;
        getThrowAfterEventHandlers(): boolean;
        setThrowAfterEventHandlers(value: boolean): void;
        constructor(exception: any);
    }
}
declare module mika.utils.Async.Quants {
    enum ScopeType {
        Cycle = 0,
        Func = 1,
        Try = 2,
        Catch = 3,
        System = 4,
    }
    interface IQuantFunc {
        (param?: any): IQuantFunc[];
    }
    interface IQuantParams {
        ScopeType: ScopeType;
        _ITERATOR: IQuant;
        _CATCH: IQuant;
        _FINALLY: IQuant;
        _RESULT: IQuant;
    }
    interface IQuant extends IQuantFunc, IQuantParams {
    }
    interface ITryQuant extends IQuant {
        Catch: (catchFunc: (exception: any) => IQuantFunc[]) => ITryQuant;
        Finally: (finallyList: IQuantFunc[]) => ITryQuant;
    }
    interface IFuncQuant<TResult> extends IQuant {
        Result: (resultFunc: (result: TResult) => IQuantFunc[]) => IFuncQuant<TResult>;
    }
}
declare module mika.utils.Async.Quants {
    class Scope {
        constructor(quant: IQuant, body: IQuant[]);
        quant: IQuant;
        body: IQuant[];
    }
}
declare module mika.utils.List {
    interface IIterator<E> {
        hasNext(): boolean;
        next(): E;
    }
}
declare module mika.utils.List {
    interface IIterable<T> {
        iterator(): List.IIterator<T>;
    }
}
interface String {
    format(...args: any[]): string;
}
declare module mika.utils.Strings {
    import IIterable = mika.utils.List.IIterable;
    class StringBuilder {
        constructor();
        isEmpty: () => boolean;
        prepend: (str: string) => StringBuilder;
        append: (str: string) => StringBuilder;
        clear: () => void;
        toString: () => string;
    }
    module StringUtils {
        function Join(separator: string, list: IIterable<any>): string;
        function parseFuncArguments(func: any): string[];
        function parseFunctionName(fun: any): any;
        function parseFunctionBody(fun: any): any;
    }
}
declare module mika.utils.Async.Quants {
    class QuantsException extends Exception {
        name: string;
        constructor(message?: string, innerError?: any, scopeStack?: Scope[]);
        private static scopeStackToString(scopeStack);
        private static appendScopeString(sb, scope);
    }
    class QuantsUnhandledException extends QuantsException {
        name: string;
        constructor(message?: string, innerError?: any, scopeStack?: Scope[]);
    }
    class QuantsSintaxException extends QuantsException {
        name: string;
        constructor(message?: string, innerError?: any, scopeStack?: Scope[]);
    }
}
interface String {
    /** Не рекомендуется клонировать объеты этим методом, разве что для отладки и тестирования */
    clone<T>(deep?: boolean): T;
}
interface Number {
    /** Не рекомендуется клонировать объеты этим методом, разве что для отладки и тестирования */
    clone<T>(deep?: boolean): T;
}
interface Boolean {
    /** Не рекомендуется клонировать объеты этим методом, разве что для отладки и тестирования */
    clone<T>(deep?: boolean): T;
}
interface Date {
    /** Не рекомендуется клонировать объеты этим методом, разве что для отладки и тестирования */
    clone<T>(deep?: boolean): T;
}
interface Array<T> {
    /** Не рекомендуется клонировать объеты этим методом, разве что для отладки и тестирования */
    clone(deep?: boolean): T;
}
interface Function {
    subClassOf(baseClass: Function): boolean;
    getBaseClass(): Function;
}
interface Class extends Function {
}
declare var __extends: (_class: any, baseClass: any) => void;
declare module mika.utils {
    module ClassUtils {
        function getClassName(): any;
        /** Клонирует объект, но не клонирует структуру наследования, все свойства. Не клонирует методы, так что следи за тем, чтобы свойства типа функция, не попали в клон, иначе они могут изменить оригинальный объект */
        function clone(object: any, deep?: boolean): any;
        /** Не рекомендуется клонировать объеты этим методом, разве что для отладки и тестирования */
        function subClassOf(Class: Function, baseClass: Function): boolean;
        function ArrayConstructor(length?: number, fillValue?: any): () => any[];
        function ConstConstructor(initValue: any): () => any;
    }
}
declare module mika.utils.List {
    interface IComparable<T> {
        compareTo(o: T): number;
    }
}
interface String {
    hashCode(): number;
}
interface Boolean {
    hashCode(): number;
}
interface Number {
    hashCode(): number;
}
declare module mika.utils {
    module CompareUtils {
        function identityHashCode(object: any): number;
        function hashCode(object: any): any;
        function equals(o1: any, o2: any): boolean;
        /** Only for: number, strings, boolean and not (string, boolean) !! not null or undefined*/
        function CompareSimple(o1: any, o2: any): number;
        function EqualsSimple(o1: any, o2: any): boolean;
        function CompareTypes(f1: Class, f2: Class): number;
        function CompareString(s1: string, s2: string, ignoreCase?: boolean): number;
        function CompareStringIgnoreCase(s1: string, s2: string): number;
        function EqualsString(s1: string, s2: string, ignoreCase?: boolean): boolean;
        function EqualsStringIgnoreCase(s1: string, s2: string): boolean;
        function CompareObjects<T>(o1: T, o2: T): number;
    }
}
declare module mika.utils.List {
    class ArrayIterator<T> implements mika.utils.List.IIterator<T> {
        private _index;
        private _array;
        constructor(array: T[]);
        hasNext(): boolean;
        next(): T;
    }
}
declare module mika.utils.List {
    interface ICollection<T> extends List.IIterable<T> {
        add(item: T): boolean;
        remove(item: T): boolean;
        size(): number;
        contains(item: T): boolean;
        clear(): any;
    }
}
declare module mika.utils.List {
    interface ISet<T> extends List.ICollection<T> {
        get(index: number): T;
        set(index: number, value: T): T;
        insert(index: number, item: T): boolean;
        removeAt(index: number): T;
        indexOf(item: T): number;
        toArray<T2 extends T>(): T2[];
    }
}
declare module mika.utils.List {
    interface IComparator<T> extends Function {
        (o1: T, o2: T): number;
    }
}
interface Array<T> extends mika.utils.List.ISet<T> {
    copyOf<T2>(index?: number, count?: number): T2[];
    copyTo<T2>(dest: T2[], srcIndex?: number, srcCount?: number, dstIndex?: number): any;
    binarySearch(item: T, comparator?: mika.utils.List.IComparator<T>, startIndex?: number, length?: number): number;
    fill(value: T, startIndex?: number, count?: number): any;
    addArray<T2 extends T>(array: T2[]): any;
}
declare module mika.utils.List {
}
declare module mika.utils.Async.Quants {
    class QuantsFactory {
        static Scope(quantList: IQuantFunc[]): IQuant;
        static Cycle(init: () => any, condition: () => boolean, iterator: () => any, bodyList: IQuantFunc[]): IQuantFunc[];
        static Try(tryList: IQuantFunc[]): ITryQuant;
        static Func<TResult>(bodyList: IQuantFunc[]): IFuncQuant<TResult>;
    }
    interface IQuantProcessor {
        _BREAK: IQuantFunc;
        _CONTINUE: IQuantFunc;
        _RETURN: IQuantFunc;
        _CATCH: IQuantFunc;
        _FINALLY: IQuantFunc;
    }
}
declare module mika.utils.Async.Quants {
    import IEventHandler = mika.utils.Events.IEventHandler;
    class QuantsProcessor {
        private static _currentQuantsProcessor;
        private static _currentQuantsProcessorStack;
        static getCurrentQuantsProcessor(): QuantsProcessor;
        static _BREAK(): IQuantFunc[];
        static _CONTINUE(): IQuantFunc[];
        static _RETURN(resultValue?: any): IQuantFunc[];
        static invoke<TResult>(funcs: IQuantFunc[]): IFuncQuant<TResult>;
        private _initScope;
        private _scopeStack;
        private _currentScope;
        private _currentQuant;
        constructor(quants?: IQuantFunc[]);
        private stop();
        reinit(): void;
        init(quants?: IQuantFunc[]): void;
        next(): boolean;
        private _next();
        _invokeList: IQuantFunc[];
        private invoke<TResult>(funcs);
        iterate(): boolean;
        catchHandler(exception: any): IQuantFunc[];
        _break(): IQuantFunc[];
        _continue(): IQuantFunc[];
        _return(resultValue: any): IQuantFunc[];
        private _unhandledException;
        unhandledException(): IEventHandler<UnhandledExceptionEventArgs>;
        private getScopeStack(currentScope?, currentQuant?);
    }
}
declare module mika.utils.List {
    interface ILinkItem<T> {
        getPrevious(): ILinkItem<T>;
        setPrevious(previous: ILinkItem<T>): any;
        getNext(): ILinkItem<T>;
        setNext(next: ILinkItem<T>): any;
        getValue(): T;
        setValue(value: T): any;
    }
}
declare module mika.utils.List {
    class LinkItem<T> implements ILinkItem<T> {
        private _value;
        private _previous;
        private _next;
        constructor(value: T, previous?: ILinkItem<T>, next?: ILinkItem<T>);
        getPrevious(): ILinkItem<T>;
        setPrevious(previous: ILinkItem<T>): void;
        getNext(): ILinkItem<T>;
        setNext(next: ILinkItem<T>): void;
        getValue(): T;
        setValue(value: T): void;
    }
}
declare module mika.utils.List {
    import EventArgs = utils.Events.EventArgs;
    class ThreadPriorityChangedEventArgs extends EventArgs {
        private _oldPriority;
        getOldPriority(): number;
        constructor(oldPriority: number);
    }
}
declare module mika.utils.Async {
    import IQuantFunc = mika.utils.Async.Quants.IQuantFunc;
    import ThreadPriorityChangedEventArgs = mika.utils.List.ThreadPriorityChangedEventArgs;
    import IDisposable = mika.utils.Contracts.Patterns.IDisposable;
    import ThreadStateChangedEventArgs = mika.utils.List.ThreadStateChangedEventArgs;
    import IEventHandler = mika.utils.Events.IEventHandler;
    import UnhandledExceptionEventArgs = mika.utils.Async.Quants.UnhandledExceptionEventArgs;
    import IComparable = mika.utils.List.IComparable;
    enum ThreadState {
        /** Только что создан */
        New = 0,
        Running = 1,
        Paused = 2,
        /** Вызван метод Stop() */
        Aborted = 3,
        /** Поток завершился с исключением */
        Error = 4,
        Disposed = 5,
        /** Поток успешно выполнен */
        Completed = 6,
    }
    enum ThreadTimerState {
        Stopped = 0,
        Paused = 1,
        Running = 2,
    }
    enum ThreadPriority {
        High = 0,
        Normal = 1,
        Low = 2,
    }
    interface WaitTimerQuantCallBack {
        (timeOutExpired: boolean): IQuantFunc[];
    }
    interface IThread extends IDisposable, IComparable<IThread> {
        id(): number;
        start(): any;
        abort(suspendCurrentThread?: boolean, waitTimeOut?: number, callback?: WaitTimerQuantCallBack): any;
        wait(suspendCurrentThread?: boolean, timeOut?: number, callback?: WaitTimerQuantCallBack): any;
        pause(timeOut?: number): any;
        iterate(): boolean;
        getFuncs(): IQuantFunc[];
        setFuncs(threadFunc: IQuantFunc[]): any;
        getPriority(): ThreadPriority;
        setPriority(priority: ThreadPriority): any;
        priorityChanged(): IEventHandler<ThreadPriorityChangedEventArgs>;
        stateChanged(): IEventHandler<ThreadStateChangedEventArgs>;
        getState(): ThreadState;
        unhandledException(): IEventHandler<UnhandledExceptionEventArgs>;
        dispose(suspendCurrentThread?: boolean, abortTimeOut?: number): any;
    }
    interface IThreadTimer extends IThread {
        /** Create timer StackTrace */
        getInterval(): number;
        getTimerState(): ThreadTimerState;
        /** interval < 0 == not repeat */
        setInterval(interval: number): any;
        stop(): any;
        /** firstInterval < 0 == interval | firstInterval is null == 0 | interval < 0 == not repeat */
        start(firstInterval?: number, interval?: number): any;
    }
}
declare module mika.utils.List {
    import EventArgs = utils.Events.EventArgs;
    import ThreadState = mika.utils.Async.ThreadState;
    import IThread = mika.utils.Async.IThread;
    class ThreadStateChangedEventArgs extends EventArgs {
        private _oldState;
        private _thread;
        getThread(): IThread;
        getOldState(): number;
        constructor(thread: IThread, oldState: ThreadState);
    }
}
declare module mika.utils.Async {
    import ILinkItem = mika.utils.List.ILinkItem;
    import ThreadStateChangedEventArgs = mika.utils.List.ThreadStateChangedEventArgs;
    import UnhandledExceptionEventArgs = mika.utils.Async.Quants.UnhandledExceptionEventArgs;
    import IEventHandler = mika.utils.Events.IEventHandler;
    class ThreadQueue {
        private _queue;
        private _queueCount;
        create(thread: IThread): ILinkItem<IThread>;
        add(threadItem: ILinkItem<IThread>): void;
        remove(threadItem: ILinkItem<IThread>): void;
        next(): ILinkItem<IThread>;
        count(): number;
    }
    class ThreadDeferredQueue {
        private _passive;
        private _active;
        private _threadPriorityList;
        constructor(threadPriorityList: ThreadPriorityList);
        create(thread: IThread): ILinkItem<IThread>;
        add(threadItem: ILinkItem<IThread>): void;
        remove(threadItem: ILinkItem<IThread>): void;
        next(): ILinkItem<IThread>;
        activeCount(): number;
        passiveCount(): number;
    }
    class ThreadPriorityList {
        private _addedThreads;
        private _maxActiveThreads;
        private _priorityCount;
        getMaxActiveThreads(): number;
        setMaxActiveThreads(count: number): void;
        private _priorityList;
        private _unhandledException;
        private _runningChanged;
        unhandledException(): IEventHandler<UnhandledExceptionEventArgs>;
        runningChanged(): IEventHandler<ThreadStateChangedEventArgs>;
        private unhandledExceptionListener;
        isRunning(): boolean;
        getNextThread(): IThread;
        addThread(thread: IThread): void;
        private getThreadQueue(priority);
        private createThreadItem(thread);
        private addThreadItem(threadItem, priority);
        private removeThreadItem(threadItem, priority);
    }
}
declare module mika.utils.Async {
    import UnhandledExceptionEventArgs = mika.utils.Async.Quants.UnhandledExceptionEventArgs;
    import IEventHandler = mika.utils.Events.IEventHandler;
    import EventArgs = mika.utils.Events.EventArgs;
    class ThreadProcessor {
        static threadsTime: number;
        static userTime: number;
        private static _currentThreadProcessorStack;
        static getCurrentThreadProcessor(): ThreadProcessor;
        static _instance: ThreadProcessor;
        static getInstance(): ThreadProcessor;
        private _priorityList;
        private _timer;
        private _currentTimeOut;
        private _unhandledException;
        private _runningChanged;
        runningChanged(): IEventHandler<EventArgs>;
        isRunning(): boolean;
        unhandledException(): IEventHandler<UnhandledExceptionEventArgs>;
        private unhandledExceptionListener;
        constructor();
        addThread(thread: IThread): void;
        private runningChangedListener;
        private deferredStart();
        private start;
        iterate(countIterations: number): boolean;
        private iteratePrivate;
    }
}
declare module mika.utils.Async {
    class TimeOut {
        private _timer;
        private _handler;
        private _state;
        start(handle: Function, timeOut: number): void;
        stop(): void;
    }
}
declare module mika.utils.Async {
    interface WaitTimerCallBack extends Function {
        (timeOutExpired: boolean): any;
    }
    class WaitTimer {
        private _waitTimers;
        /** if (timeOut == null) unlimited timeout */
        wait(callBack: WaitTimerCallBack, timeOut?: number): void;
        complete(): void;
        clear(): void;
        count(): number;
    }
}
declare module mika.utils.Async {
    import ThreadPriorityChangedEventArgs = mika.utils.List.ThreadPriorityChangedEventArgs;
    import ThreadStateChangedEventArgs = mika.utils.List.ThreadStateChangedEventArgs;
    import IQuantFunc = mika.utils.Async.Quants.IQuantFunc;
    import IEventHandler = mika.utils.Events.IEventHandler;
    import UnhandledExceptionEventArgs = mika.utils.Async.Quants.UnhandledExceptionEventArgs;
    class Thread implements IThread {
        private static _nextId;
        private _id;
        private _currentQuantWait;
        private _bSetNewFunc;
        private _newFunc;
        private _func;
        private _priority;
        private _state;
        private _quantsProcessor;
        private static _currentThreadStack;
        static getCurrentThread(): Thread;
        constructor(threadFunc?: IQuantFunc[], addToThreadProcessor?: boolean);
        private _unhandledException;
        unhandledException(): IEventHandler<UnhandledExceptionEventArgs>;
        private unhandledExceptionListener;
        id(): number;
        start(): void;
        private _waitTimer;
        private getWaitTimer();
        /** if (timeOut == null) unlimited timeout */
        abort(suspendCurrentThread?: boolean, waitTimeOut?: number, callback?: WaitTimerQuantCallBack): void;
        private abortPrivate(suspendCurrentThread?, waitTimeOut?, callback?, outThreadCallBack?);
        /** if (timeOut == null) unlimited timeout */
        wait(suspendCurrentThread?: boolean, timeOut?: number, callback?: WaitTimerQuantCallBack): void;
        private _invokeWaitStackTrace;
        private waitPrivate(suspendCurrentThread?, timeOut?, callback?, outThreadCallBack?);
        static pause(timeOut?: number): void;
        /** if (timeOut == null) unlimited timeout */
        pause(timeOut?: number): void;
        getFuncs(): IQuantFunc[];
        getPriority(): ThreadPriority;
        setPriority(priority: ThreadPriority): void;
        private _priorityChanged;
        priorityChanged(): IEventHandler<ThreadPriorityChangedEventArgs>;
        private _stateChanged;
        stateChanged(): IEventHandler<ThreadStateChangedEventArgs>;
        setFuncs(threadFunc: IQuantFunc[]): void;
        private setState(state);
        getState(): ThreadState;
        private _dispose;
        /** if (timeOut == null) unlimited timeout */
        dispose(suspendCurrentThread?: boolean, abortTimeOut?: number, callBack?: () => void): void;
        iterate(): boolean;
        compareTo(thread: IThread): number;
    }
}
declare module mika.utils.Async {
    import IQuantFunc = mika.utils.Async.Quants.IQuantFunc;
    class ThreadTimer extends Thread implements IThreadTimer {
        /** If (timeout >= MAX_TIME_OUT) then stop */
        static MAX_TIME_OUT: number;
        private _firstInterval;
        private _interval;
        private _timer;
        private _timerState;
        constructor(threadFunc: IQuantFunc[], interval: number, addToThreadProcessor?: boolean);
        getInterval(): number;
        /** interval < 0 == not repeat */
        setInterval(interval: number): void;
        /** firstInterval < 0 == interval | firstInterval is null == 0 | interval < 0 == not repeat */
        start(firstInterval?: number, interval?: number): void;
        private checkInterval();
        private deferredFirstStart();
        private deferredIntervalStart();
        private _firstStart;
        private _intervalStart;
        private _start;
        stop(): void;
        pause(timeOut?: number): void;
        iterate(): boolean;
        abort(suspendCurrentThread?: boolean, waitTimeOut?: number, callback?: WaitTimerCallBack): void;
        setFuncs(threadFunc: IQuantFunc[]): void;
        getTimerState(): ThreadTimerState;
        dispose(suspendCurrentThread?: boolean, abortTimeOut?: number, callBack?: () => void): void;
    }
}
declare module mika.utils.TimeUtils {
    import IComparable = mika.utils.List.IComparable;
    class DateTime implements IComparable<DateTime> {
        private static _baseStartTicks;
        private static _ticksPerMilliseconds;
        private _ticks;
        getTicks(): number;
        constructor(date?: Date);
        constructor(ticks?: number);
        constructor(year?: any, month?: number, day?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number);
        TotalMilliseconds(): number;
        TotalSeconds(): number;
        static FromSeconds(seconds: number): DateTime;
        static FromDays(days: number): DateTime;
        static FromMilliseconds(milliseconds: number): DateTime;
        toDate(): Date;
        AddTicks(ticks: number): DateTime;
        Add(timeSpan: TimeSpan): DateTime;
        static MinValue: DateTime;
        static MaxValue: DateTime;
        compareTo(dateTime: DateTime): number;
        hashCode(): number;
        equals(o: Object): boolean;
        toString(): string;
    }
}
declare module mika.utils.TimeUtils {
    import IComparable = mika.utils.List.IComparable;
    class TimeSpan implements IComparable<TimeSpan> {
        private _ticks;
        getTicks(): number;
        static TicksPerMillisecond: number;
        static TicksPerSecond: number;
        static TicksPerMinute: number;
        static TicksPerHour: number;
        static TicksPerDay: number;
        static TicksPerWeek: number;
        static TicksPerMonth: number;
        static TicksPerYear: number;
        constructor(ticks?: number);
        constructor(days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number);
        TotalMilliseconds(): number;
        TotalSeconds(): number;
        TotalMinutes(): number;
        TotalHours(): number;
        TotalDays(): number;
        TotalWeeks(): number;
        TotalMonths(): number;
        TotalYears(): number;
        static FromSeconds(seconds: number): TimeSpan;
        static FromMilliseconds(milliseconds: number): TimeSpan;
        Add(ticks: number): TimeSpan;
        Add(timeSpan: TimeSpan): TimeSpan;
        Tick(): number;
        Millisecond(): number;
        Second(): number;
        Minute(): number;
        Hour(): number;
        DayOfMonth(): number;
        Day(): number;
        DayOfWeek(): number;
        Week(): number;
        Month(): number;
        Year(): number;
        static MinValue: TimeSpan;
        static Zero: TimeSpan;
        static MaxValue: TimeSpan;
        compareTo(timeSpan: TimeSpan): number;
        hashCode(): number;
        equals(o: Object): boolean;
        toString(): string;
    }
}
declare module mika.utils.Threads {
    import IComparable = mika.utils.List.IComparable;
    import IDisposable = mika.utils.Contracts.Patterns.IDisposable;
    import TimeSpan = mika.utils.TimeUtils.TimeSpan;
    import WaitTimerCallBack = mika.utils.Async.WaitTimerCallBack;
    import IQuantFunc = mika.utils.Async.Quants.IQuantFunc;
    import WaitTimerQuantCallBack = mika.utils.Async.WaitTimerQuantCallBack;
    class DeferredAction implements IDisposable, IComparable<any> {
        private _minNextActionTime;
        /** in milliseconds */
        getMinNextActionTime(): number;
        /** in milliseconds */
        setMinNextActionTime(value: number): void;
        private _ReExecuteOnAbortSuspended;
        /** Перезапустить если поток был убит после долгого простоя */
        getReExecuteOnAbortSuspended(): boolean;
        /** Перезапустить если поток был убит после долгого простоя */
        setReExecuteOnAbortSuspended(value: boolean): void;
        private _AlwaysWaitBeforeExecute;
        getAlwaysWaitBeforeExecute(): boolean;
        setAlwaysWaitBeforeExecute(value: boolean): void;
        private _ReExecuteOnError;
        private _executeActionAnotherOne;
        getReExecuteOnError(): boolean;
        setReExecuteOnError(value: boolean): void;
        private _lastActionEndTime;
        private actionThread;
        getId(): number;
        private getActions();
        private setActions(value);
        private getThread();
        constructor(actions: IQuantFunc[], minNextActionTime: number);
        constructor(actions: IQuantFunc[], minNextActionTime: TimeSpan);
        private createThread(actions);
        private stateChanged_listener;
        ForceDeferredExecute(suspendCurrentThread?: boolean, timeOut?: number, callback?: WaitTimerQuantCallBack): void;
        ForceExecute(suspendCurrentThread?: boolean, timeOut?: number, callback?: WaitTimerQuantCallBack): void;
        Execute(): void;
        disposed: boolean;
        /** if (timeOut == null) unlimited timeout */
        dispose(suspendCurrentThread?: boolean, abortTimeOut?: number, callBack?: () => void): void;
        /** if (timeOut == null) unlimited timeout */
        abort(waitTimeOut?: number, suspendCurrentThread?: boolean, callback?: WaitTimerCallBack): void;
        compareTo(obj: DeferredAction): number;
    }
}
declare module mika.utils.Async.Events {
    import EventArgs = mika.utils.Events.EventArgs;
    import IQuantizedEventInvoker = mika.utils.Events.IQuantizedEventInvoker;
    import IQuantizedEventListener = mika.utils.Events.IQuantizedEventListener;
    import IQuantFunc = mika.utils.Async.Quants.IQuantFunc;
    import EventHandlerTemplate = mika.utils.Events.EventHandlerTemplate;
    class QuantizedEventHandler<TEventArgs extends EventArgs> extends EventHandlerTemplate<TEventArgs, IQuantizedEventListener<TEventArgs>> implements IQuantizedEventInvoker<TEventArgs> {
        invoke(o: Object, e: TEventArgs): IQuantFunc[];
    }
}
declare module mika.utils.List {
    import Func1 = utils.Contracts.Delegates.Func1;
    class ConvertIterator<TSource, TDest> implements IIterator<TDest> {
        private _Iterator;
        private _convertFunc;
        constructor(Iterator: IIterator<any>, convertFunc?: Func1<TSource, TDest>);
        hasNext(): boolean;
        next(): TDest;
        remove(): void;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface Func1<T1, TResult> extends Function {
        (v1: T1): TResult;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface Func2<T1, T2, TResult> extends Function {
        (v1: T1, v2: T2): TResult;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface IEqualityComparator<T> extends Func2<T, T, Boolean> {
    }
}
declare module mika.utils.List {
    import Func1 = utils.Contracts.Delegates.Func1;
    import EqualityComparator = utils.Contracts.Delegates.IEqualityComparator;
    class HashItem<T> implements IComparable<T> {
        protected _hashCode: number;
        protected _value: T;
        protected _type: Class;
        protected _typeHashCode: number;
        Value(): T;
        constructor(value: T, getHashCode?: Func1<T, number>);
        compareTo(obj: Object): number;
        compareToExt(obj: Object, Comparator: IComparator<T>, equalityComparator: EqualityComparator<T>): number;
        static ConvertToHashItems<T>(items: ISet<T>): ISet<HashItem<T>>;
        static ConvertToItems<T>(items: ISet<HashItem<T>>): ISet<T>;
        equals(obj: Object): boolean;
        toString(): string;
        hashCode(): number;
    }
}
declare module mika.utils.List {
    import Func1 = utils.Contracts.Delegates.Func1;
    class CustomHashCodeItem<T> extends HashItem<T> {
        constructor(value: T, getHashCode: Func1<T, number>);
    }
}
declare module mika.utils.List {
    enum DictionaryChangedType {
        /** установлены Index: свойства, OldValue */
        Removed = 0,
        /** установлены Index: свойства, NewValue */
        Added = 1,
        /** установлены Index: свойства, OldValue, NewValue, */
        Setted = 2,
    }
}
declare module mika.utils.List {
    import EventArgs = utils.Events.EventArgs;
    class DictionaryChangedEventArgs<TKey, TValue> extends EventArgs {
        private _Key;
        getKey(): TKey;
        private _OldValue;
        getOldValue(): TValue;
        private _NewValue;
        getNewValue(): TValue;
        private _ChangedType;
        getChangedType(): DictionaryChangedType;
        constructor(changedType: DictionaryChangedType, key: TKey, oldValue: TValue, newValue: TValue);
    }
}
declare module mika.utils.List {
    interface IDictionary<TKey, TValue> extends IMap<TKey, TValue>, ICollection<IMap.Entry<TKey, TValue>> {
        putAll<T2 extends TKey, T3 extends TValue>(m: IMap<T2, T3>): any;
    }
}
declare module mika.utils.List {
    import EventHandler = utils.Events.IEventHandler;
    interface IDictionaryChanged<TKey, TValue> {
        DictionaryChanged(): EventHandler<DictionaryChangedEventArgs<TKey, TValue>>;
        onItemModifiedByKey(index: TKey, oldValue: TValue): any;
    }
}
declare module mika.utils.List {
    interface IDictionaryChangedDict<TKey, TValue> extends IDictionary<TKey, TValue>, IDictionaryChanged<TKey, TValue> {
    }
}
declare module mika.utils.List {
    interface IMap<TKey, TValue> {
        containsKey(key: TKey): boolean;
        pull(key: TKey): TValue;
        put(key: TKey, value: TValue, notPutIfExists?: boolean): boolean;
        removeKey(key: TKey): boolean;
        keys(): ISet<TKey>;
        values(): ISet<TValue>;
        size(): number;
        clear(): any;
    }
    interface IObjectMap<TValue> extends IMap<string, TValue> {
        setObject(object: Object): any;
        getObject(): any;
    }
    module IMap {
        interface Entry<TKey, TValue> {
            getKey(): TKey;
            getValue(): TValue;
            setValue(value: TValue): TValue;
            equals(o: Object): boolean;
            hashCode(): number;
        }
    }
}
declare module mika.utils.List {
    /** !! Обрати внимание, что при запуске метода hashcode() в объект записывается свойство _hashCode, которое станет элементом этого словаря */
    class ObjectMap<TValue> implements List.IObjectMap<TValue> {
        private _object;
        constructor(object?: Object);
        setObject(object: Object): void;
        getObject(): {};
        containsKey(key: string): boolean;
        pull(key: string): TValue;
        put(key: string, value: TValue, notAddIfExists?: boolean): boolean;
        removeKey(key: string): boolean;
        clear(): void;
        /** Низкопроизводительная операция, рекомендуется использовать только для отладки*/
        size(): number;
        /** Низкопроизводительная операция, рекомендуется использовать только для отладки*/
        keys(): ISet<string>;
        /** Низкопроизводительная операция, рекомендуется использовать только для отладки*/
        values(): ISet<TValue>;
    }
}
declare module mika.utils.List {
    class SimpleEntry<TKey, TValue> implements mika.utils.List.IMap.Entry<TKey, TValue> {
        private _key;
        private _value;
        constructor(key: TKey, value: TValue);
        getKey(): TKey;
        getValue(): TValue;
        setValue(value: TValue): TValue;
        toString(): string;
        equals(o: any): boolean;
        hashCode(): number;
    }
}
declare module mika.utils.List {
    enum CollectionChangedType {
        /** установлены свойства: OldIndex, OldItems */
        Removed = 0,
        /** установлены свойства: NewIndex, NewItems */
        Added = 1,
        /** установлены свойства: OldIndex == NewIndex, OldItems[1], NewItems[1], */
        Setted = 2,
        /** не установлены свойства */
        Resorted = 3,
        /** установлены свойства: OldIndex, NewIndex, NewItems[1] */
        Moved = 4,
        /** установлены свойства: OldIndex, NewIndex */
        Shift = 5,
    }
}
declare module mika.utils.List {
    import EventArgs = utils.Events.EventArgs;
    class CollectionChangedEventArgs<T> extends EventArgs {
        private _OldIndex;
        /** индекс первого элемента OldItems */
        getOldIndex(): number;
        private _NewIndex;
        /** индекс первого элемента NewItems */
        getNewIndex(): number;
        private _OldItems;
        getOldItems(): T[];
        private _NewItems;
        getNewItems(): T[];
        private _ChangedType;
        getChangedType(): CollectionChangedType;
        constructor(changedType: CollectionChangedType, oldIndex: number, newIndex: number, oldItems: T[], newItems: T[]);
    }
}
declare module mika.utils.List {
    interface IQueue<E> extends mika.utils.List.IIterable<E> {
        enqueue(e: E): any;
        dequeue(): E;
        peek(): E;
        size(): number;
        clear(): any;
    }
}
declare module mika.utils.List {
    class Queue<E> implements mika.utils.List.IQueue<E> {
        private _array;
        constructor();
        enqueue(e: E): void;
        dequeue(): E;
        peek(): E;
        size(): number;
        clear(): void;
        iterator(): mika.utils.List.IIterator<E>;
    }
}
declare module mika.utils.List {
    interface ISortedCollection {
        getAutoSort(): boolean;
        setAutoSort(value: boolean): any;
        sort(): any;
        reSort(): any;
    }
}
declare module mika.utils.List {
    interface IList<T> extends mika.utils.List.ISet<T> {
        setSize(value: number, defaultValue?: T): any;
        insertAll<T2 extends T>(collection: mika.utils.List.ICollection<T2>, index: number): boolean;
        addAll<T2 extends T>(collection: mika.utils.List.IIterable<T2>): boolean;
    }
}
declare module mika.utils.List {
    import EventHandler = utils.Events.IEventHandler;
    interface ICollectionChanged<T> {
        collectionChanged(): EventHandler<CollectionChangedEventArgs<T>>;
        onItemModified(index: number, oldItem?: T): any;
    }
}
declare module mika.utils.List {
    interface ICollectionChangedList<T> extends IList<T>, ICollectionChanged<T> {
    }
}
declare module mika.utils.List {
    import IEventHandler = utils.Events.IEventHandler;
    class SortedList<T> implements ICollectionChangedList<T>, ISortedCollection {
        private _notAddIfExists;
        getNotAddIfExists(): boolean;
        setNotAddIfExists(value: boolean): void;
        private static RESIZE_COEF;
        private static RESIZE_COEF_2;
        private _list;
        private _comparator;
        private _countSorted;
        private _defaultValue;
        countSorted(): number;
        private _autoSort;
        getAutoSort(): boolean;
        setAutoSort(value: boolean): void;
        private compare;
        getComparator(): List.IComparator<T>;
        setComparator<T2 extends T>(value: List.IComparator<T2>): void;
        constructor(autoSort?: boolean, notAddIfExists?: boolean, list?: T[], comparator?: List.IComparator<T>, defaultValue?: T);
        private _collectionChanged;
        collectionChanged(): IEventHandler<CollectionChangedEventArgs<T>>;
        private OnCollectionChanged(eventArgs);
        size(): number;
        setSize(value: number, defaultValue?: T): void;
        private setSizePrivate(value, defaultValue?, enableCollectionChanged?);
        private binarySearch(startIndex, length, item);
        indexOf(item: T): number;
        insert(index: number, item: T): boolean;
        private insertPrivate(index, item);
        remove(item: T): boolean;
        removeAt(index: number): T;
        private removeAtPrivate(index);
        get(index: number): T;
        set(index: number, value: T): T;
        move(oldIndex: number, newIndex: number): boolean;
        private movePrivate(oldIndex, newIndex);
        add(item: T): boolean;
        insertAll<T2 extends T>(collection: List.ICollection<T2>, index: number): boolean;
        addAll<T2 extends T>(collection: List.IIterable<T2>): boolean;
        private addArray<T2>(array);
        reSort(): void;
        sort(): void;
        clear(): void;
        contains(item: T): boolean;
        toArray<T2 extends T>(): T2[];
        isReadOnly(): boolean;
        iterator(): List.IIterator<T>;
        isEmpty(): boolean;
        onItemModified(index: number, oldItem?: T): void;
    }
}
declare module mika.utils {
    class RefParam<TParam> {
        constructor(value?: TParam);
        value: TParam;
    }
}
declare module mika.utils.Events {
    class CustomEventHandler<TEventArgs extends EventArgs> implements IEventHandler<TEventArgs> {
        private _add;
        private _remove;
        private _invoke;
        private _count;
        constructor(add: (listener: IEventListener<TEventArgs>) => any, remove: (listener: IEventListener<TEventArgs>) => any, invoke: (o, e: TEventArgs) => any, count: () => number);
        add(listener: IEventListener<TEventArgs>): void;
        remove(listener: IEventListener<TEventArgs>): void;
        invoke(o: any, e: TEventArgs): void;
        dispose(): void;
        count(): number;
    }
}
declare module mika.utils.List {
    import Func1 = utils.Contracts.Delegates.Func1;
    import EqualityComparator = utils.Contracts.Delegates.IEqualityComparator;
    import IComparator = List.IComparator;
    import DictionaryChangedEventArgs = List.DictionaryChangedEventArgs;
    import IEventHandler = utils.Events.IEventHandler;
    import EventHandler = utils.Events.EventHandler;
    class SortDict<TKey, TValue> implements IDictionaryChangedDict<TKey, TValue>, ICollectionChanged<List.IMap.Entry<TKey, TValue>> {
        private _items;
        private _keys;
        private _values;
        private _createHashItem;
        private _comparator;
        getComparator(): IComparator<TKey>;
        private _EqualityComparator;
        getEqualityComparator(): EqualityComparator<TKey>;
        _getKeyHashCode: Func1<TKey, number>;
        getGetKeyHashCode(): Func1<TKey, number>;
        private mapEntryComparator;
        constructor(Comparator?: IComparator<TKey>, equalityComparator?: EqualityComparator<TKey>, getKeyHashCode?: Func1<TKey, number>, createHashItem?: Func1<TKey, HashItem<TKey>>);
        private static convertKeyValuePairArray<TKey, TValue>(items);
        private _items_CollectionChanged_listener;
        private _items_CollectionChanged(sender, e);
        private createHashItem(key);
        containsKey(key: TKey): boolean;
        private getKeys();
        private getValues();
        keys(): ISet<TKey>;
        removeKey(key: TKey): boolean;
        TryGetValue(key: TKey, value: RefParam<TValue>): boolean;
        values(): ISet<TValue>;
        pull(key: TKey): TValue;
        put(key: TKey, value: TValue, notAddIfExists?: boolean): boolean;
        protected setItem(index: number, item: List.IMap.Entry<HashItem<TKey>, TValue>): void;
        add(item: List.IMap.Entry<TKey, TValue>): boolean;
        clear(): void;
        /** === this.ContainsKey(item.Key) */
        contains(item: List.IMap.Entry<TKey, TValue>): boolean;
        CopyTo(array: List.IMap.Entry<TKey, TValue>[], arrayIndex: number): void;
        size(): number;
        IsReadOnly(): boolean;
        /** === this.remove(item.Key); */
        remove(item: List.IMap.Entry<TKey, TValue>): boolean;
        private _convertEntryFunc;
        entries(): ISet<List.IMap.Entry<TKey, TValue>>;
        iterator(): IIterator<List.IMap.Entry<TKey, TValue>>;
        isEmpty(): boolean;
        putAll<T2 extends TKey, T3 extends TValue>(map: List.IMap<T2, T3>): void;
        _dictionaryChanged: EventHandler<DictionaryChangedEventArgs<TKey, TValue>>;
        private _dictionaryChangedObject;
        private DictionaryChangedEventHandler(sender, e);
        private _queueDictionaryChanged;
        private _queueDictionaryChangedHandling;
        private OnDictionaryChanged(eventArgs);
        private _collectionChanged;
        private _CollectionChanged;
        onItemModifiedByKey(key: TKey, oldValue?: TValue): void;
        onItemModified(index: number, oldItem?: List.IMap.Entry<TKey, TValue>): void;
        private _collectionChangedObject;
        private CollectionChangedEventHandler(sender, e);
        DictionaryChanged(): IEventHandler<DictionaryChangedEventArgs<TKey, TValue>>;
        collectionChanged(): IEventHandler<CollectionChangedEventArgs<List.IMap.Entry<TKey, TValue>>>;
    }
}
declare module mika.utils.List {
    import EqualityComparator = utils.Contracts.Delegates.IEqualityComparator;
    class StringIgnoreCaseHashItem extends HashItem<string> {
        constructor(value: string);
        compareToExt(obj: Object, comparator: IComparator<string>, equalityComparator: EqualityComparator<string>): number;
        private static hashCoder(key);
        static castTo(value: string): StringIgnoreCaseHashItem;
        static castFrom(item: StringIgnoreCaseHashItem): string;
    }
}
declare module mika.utils.List {
    class SortedListIterator<T> implements mika.utils.List.IIterator<T> {
        private _count;
        private _index;
        private _list;
        constructor(list: Object[], count: number);
        hasNext(): boolean;
        next(): T;
    }
}
declare module mika.datamodel.contracts {
    interface IDataBaseResult<TResultData> {
        /** Запрос обработан, не отменен и не заменен полностью другим. */
        result: boolean;
        tryAgain?: boolean;
        data?: TResultData;
        error?: boolean;
    }
}
declare module mika.datamodel.contracts {
    import IDisposable = utils.Contracts.Patterns.IDisposable;
    interface IDataBase<TEntity, TEntityResult, TQuery, TQueryResult> extends IDisposable {
        /** Equivalent SQL: INSERT OR IGNORE */
        Add(item: TEntity, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
        /** Equivalent SQL: DELETE IF EXISTS */
        Delete(item: TEntity, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
        /** Equivalent SQL: INSERT OR REPLACE */
        Replace(item: TEntity, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
        /** Equivalent SQL: INSERT OR UPDATE */
        Update(item: TEntity, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
        /** Equivalent SQL: SELECT|Other */
        Query(query: TQuery, callback: (result: IDataBaseResult<TQueryResult>) => void): void;
    }
}
declare module mika.datamodel.contracts {
    import WaitTimerQuantCallBack = mika.utils.Async.WaitTimerQuantCallBack;
    interface IDataBaseAsync<TEntity, TEntityResult, TQuery, TQueryResult> extends IDataBase<TEntity, TEntityResult, TQuery, TQueryResult> {
        ForceSynchronize(suspendCurrentThread?: boolean, timeOut?: number, callback?: WaitTimerQuantCallBack): any;
        ClearActionList(): any;
        CountActions(): number;
        WaitItem(itemId: TEntity, callback: (result: IDataBaseResult<TEntityResult>) => void): void;
        LockItem(itemId: TEntity, callback: (result: IDataBaseResult<TEntityResult>, unlock: () => void) => void): void;
    }
}
declare module mika.datamodel.contracts {
    interface IObjectMerger<T> {
        merge(oldItem: T, newItem: T): T;
    }
}
declare module mika.datamodel {
    import IDataBaseAsync = datamodel.contracts.IDataBaseAsync;
    import IComparator = utils.List.IComparator;
    import IObjectMerger = datamodel.contracts.IObjectMerger;
    import WaitTimerQuantCallBack = mika.utils.Async.WaitTimerQuantCallBack;
    import IDataBaseResult = mika.datamodel.contracts.IDataBaseResult;
    /** !! Внимание: для корректной работы, не забудь определить методы hashcode и compareTo в классе TEntity, либо передать эти функции конструктору (itemsComparator, getHashCode) */
    class BaseDataBaseAsyncSaver<TEntity, TEntityResult, TQuery, TQueryResult> implements IDataBaseAsync<TEntity, TEntityResult, TQuery, TQueryResult> {
        private onlyForceSave;
        private _deferredSynchronize;
        protected _dataBaseModel: IDataBaseAsync<TEntity, TEntityResult, TQuery, TQueryResult>;
        private _id;
        private _newActions;
        private _processedItems;
        private _lockedItems;
        private _processedQueries;
        private _items;
        private _queries;
        private _itemsMerger;
        private _autoSynchronize;
        private _maxAsyncOperations;
        private static _globalMaxAsyncOperations;
        private static _globalCurrentAsyncOperations;
        private _maxTryCount;
        private _synchronizePause;
        private _itemsComparator;
        private _queryComparator;
        constructor(dataBaseModel: IDataBaseAsync<TEntity, TEntityResult, TQuery, TQueryResult>, itemsMerger: IObjectMerger<TEntity>, itemsComparator?: IComparator<TEntity>, getHashCode?: (TEntity) => number, queryComparator?: IComparator<TQuery>, getQueryHashCode?: (TQuery) => number, autoSynchronize?: boolean);
        private checkNewAction();
        private checkNewAction2(item);
        private addNewAction(action);
        private _itemsChangedListener;
        private globalCurrentAsyncOperationsDecreaseListener;
        private static _globalCurrentAsyncOperationsDecrease;
        WaitItem(itemId: TEntity, callback: (result: IDataBaseResult<TEntityResult>) => void): void;
        LockItem(itemId: TEntity, callback: (result: IDataBaseResult<TEntityResult>, unlock: () => void) => void): void;
        private unLockItem(itemId);
        getNotHandledCount(): number;
        getAutoSynchronize(): boolean;
        setAutoSynchronize(value: boolean): void;
        getSynchronizeInterval(): number;
        setSynchronizeInterval(value: number): void;
        getMaxAsyncOperations(): number;
        setMaxAsyncOperations(value: number): void;
        static getGlobalMaxAsyncOperations(): number;
        static setGlobalMaxAsyncOperations(value: number): void;
        getMaxTryCount(): number;
        setMaxTryCount(value: number): void;
        getCurrentAsyncOperationsCount(): number;
        static getGlobalCurrentAsyncOperationsCount(): number;
        ClearActionList(): void;
        CountActions(): number;
        private allowNewProcessItem();
        private resultHandler<TItem2, TResult2>(result, action, precessedItems, items, addHandler, updateHandler, queryHandler, defaultHandler?);
        private resultMergeWithDefault;
        private resultMergeWithUpdate;
        private resultMergeAdd;
        private synchronize;
        Add(item: TEntity, callback: (result: IDataBaseResult<TEntityResult>) => void): void;
        Delete(item: TEntity, callback: (result: IDataBaseResult<TEntityResult>) => void): void;
        Replace(item: TEntity, callback: (result: IDataBaseResult<TEntityResult>) => void): void;
        Update(item: TEntity, callback: (result: IDataBaseResult<TEntityResult>) => void): void;
        Query(query: TQuery, callback: (result: IDataBaseResult<TQueryResult>) => void): void;
        ForceSynchronize(suspendCurrentThread?: boolean, timeOut?: number, callback?: WaitTimerQuantCallBack): void;
        ForceDeferredSynchronize(suspendCurrentThread?: boolean, timeOut?: number, callback?: WaitTimerQuantCallBack): void;
        Synchronize(): void;
        protected disposed: boolean;
        dispose(suspendCurrentThread?: boolean, abortTimeOut?: number, callBack?: () => void): void;
    }
}
declare module mika.data.ajax {
    module AjaxUtils {
        function globalErrorHandler(url: any, xhr: any, status: any, error: any): void;
        function globalSuccessHandled(url: any, data: any, status: any, xhr: any): void;
    }
}
declare module mika.utils.data.OData.V4 {
    class ODataParams {
        constructor(propertyDelimeter?: string, arrayDelimeter?: string);
        valueToString(value: any): string;
    }
}
declare module mika.utils.data.OData.V4 {
    /** $format=...
     * http://docs.oasis-open.org/odata/odata-json-format/v4.0/odata-json-format-v4.0.html
     * */
    class ODataFormat extends ODataParams {
        constructor();
        /** Response formats:
         * application/json
         * */
        "": string;
        /** to specify the amount of metadata included in the response
         * none, minimal, full
         * */
        "odata.metadata": string;
        /** http://docs.oasis-open.org/odata/odata-json-format/v4.0/errata02/os/odata-json-format-v4.0-errata02-os-complete.html#_Payload_Ordering_Constraints_1 */
        "odata.streaming": boolean;
        /** if Edm.Int64 and Edm.Decimal numbers are represented as strings */
        "IEEE754Compatible": boolean;
        charset: string;
    }
}
declare module mika.utils.data.OData.V4 {
    /** http://docs.oasis-open.org/odata/odata/v4.0/cs01/part1-protocol/odata-v4.0-cs01-part1-protocol.html#_Common_Headers */
    interface ICommonHeaders {
        /** == $format */
        "Content-Type"?: string;
        charset: string;
        "Content-Encoding"?: string;
        "OData-Version"?: string;
        "OData-MaxVersion"?: string;
    }
    /** http://docs.oasis-open.org/odata/odata/v4.0/cs01/part1-protocol/odata-v4.0-cs01-part1-protocol.html#_Response_Headers */
    interface IResponseHeaders extends ICommonHeaders {
        /** == $format */
        "ETag"?: string;
        "Location": string;
        "OData-EntityId"?: string;
        "Preference-Applied"?: string;
        "Retry-After"?: string;
    }
}
declare module mika.utils.data.OData.V4 {
    class CommonHeaders {
        /** == $format */
        "Content-Type": ODataFormat;
        "Content-Encoding": string;
        "OData-Version": string;
        "OData-MaxVersion": string;
    }
    class CallbackParams {
        url: string;
        constructor(url: string);
        toString(): string;
    }
    class PreferHeader extends ODataParams {
        constructor();
        "odata.continue-on-error": boolean;
        "odata.include-annotations": string;
        "odata.maxpagesize": number;
        "odata.track-changes": boolean;
        /** representation, minimal */
        "return": string;
        "respond-async": boolean;
        "wait": number;
        valueToString(value: any): string;
    }
    /** http://docs.oasis-open.org/odata/odata/v4.0/cs01/part1-protocol/odata-v4.0-cs01-part1-protocol.html#_Request_Headers */
    class RequestHeaders extends CommonHeaders {
        "Accept": string;
        "Accept-Charset": string;
        "If-Match": string;
        "If-None-Match": string;
        "OData-MaxVersion": string;
        "Prefer": CallbackParams;
    }
}
declare module mika.utils.data.OData.V4 {
    /** http://docs.oasis-open.org/odata/odata-json-format/v4.0/errata02/os/odata-json-format-v4.0-errata02-os-complete.html#ResourceReference */
    interface IEntityReference {
        /** "@odata.id": "http://services.odata.org/V3/OData/OData.svc/Products(0)" */
        "@odata.id"?: string;
    }
    /** http://docs.oasis-open.org/odata/odata-json-format/v4.0/errata02/os/odata-json-format-v4.0-errata02-os-complete.html#Entitiy */
    interface IEntity extends IEntityReference {
        /** "@odata.type": "ODataDemo.Product" */
        "@odata.type"?: string;
        /** "@odata.id": "http://services.odata.org/V3/OData/OData.svc/Products(0)"
         * "@odata.id": "Customers('ALFKI')"
         */
        "@odata.id"?: string;
        /** "@odata.editLink": "Products(0)"
         * "@odata.editLink": "Customers('ALFKI')"
         */
        "@odata.editLink"?: string;
        /** "@odata.etag": "W/\"MjAxMy0wNS0yN1QxMTo1OFo=\"" */
        "@odata.etag"?: string;
    }
}
declare module mika.utils.data.OData.V4 {
    /** http://docs.oasis-open.org/odata/odata-json-format/v4.0/errata02/os/odata-json-format-v4.0-errata02-os-complete.html#_Toc403940604 */
    interface IResponse {
        /** the root context URL of the payload and the context URL for any deleted entries or added or deleted links in a delta response, or for entities or entity collections whose set cannot be determined from the root context URL.
         * "@odata.context": "http://services.odata.org/V4/TripPinServiceRW/$metadata"
         * */
        "@odata.context"?: string;
        /** the ETag of the metadata document as applicable */
        "@odata.metadataEtag"?: string;
        /** the ETag of the entity, as appropriate */
        "@odata.etag"?: string;
        /** the total count of a collection of entities or collection of entity references, if requested */
        "@odata.count"?: string;
        /** the next link of a collection with partial results */
        "@odata.nextLink"?: string;
        /** the delta link for obtaining changes to the result, if requested */
        "@odata.deltaLink"?: string;
        /** the ID of the entity */
        "@odata.id"?: string;
        /** the link used to read the entity, if the edit link cannot be used to read the entity */
        "@odata.readLink"?: string;
        /** the link used to edit/update the entity, if the entity is updatable and the @odata.id does not represent a URL that can be used to edit the entity */
        "@odata.editLink"?: string;
        /** the link used to retrieve the values of a navigation property */
        "@odata.navigationLink"?: string;
        /** the link used to describe the relationship between this entity and related entities */
        "@odata.associationLink"?: string;
        /** the type of the containing object or targeted property if the type of the object or targeted property cannot be heuristically determined */
        "@odata.type"?: string;
        /** the link used to read the stream */
        "@odata.mediaReadLink"?: string;
        /** the link used to edit/update the stream */
        "@odata.mediaEditLink"?: string;
        /** the ETag of the stream, as appropriate */
        "@odata.mediaEtag"?: string;
        /** the content type of the stream */
        "@odata.mediaContentType"?: string;
    }
    interface IResponseList<TEntity extends IEntity> extends IResponse {
        value: TEntity[];
    }
    interface IResponseSingle<TEntity extends IEntity> extends IResponse {
        value: TEntity;
    }
    interface IResponseEntity extends IEntity, IResponse {
    }
    interface IResponseError {
        "@odata.error": any;
    }
}
declare module mika.utils.data.OData.V4 {
    enum HttpMethod {
        GET = 0,
        POST = 1,
        PUT = 2,
        DELETE = 3,
        PATCH = 4,
        MERGE = 5,
    }
    class ODataRelParams<TId> extends ODataParams {
        /** $id=http://localhost:6570/odata/Bind2(19) */
        $id: string;
    }
    class ODataRequest<TParams extends ODataParams, TId> {
        constructor(method: HttpMethod, serviceUrl: string, resource: string, id: TId);
        headers: RequestHeaders;
        method: HttpMethod;
        /** http://services.odata.org/OData/OData.svc */
        serviceUrl: string;
        /** Category(1)/Products
         * Categories(1)/Products(1)/Supplier/Address/City/$value
         */
        resource: string;
        id: TId;
        /** $top=2&$orderby=name */
        params: TParams;
        protected static addSlash(url: string): string;
        makeUrl(): string;
        static makeUrlResource(serviceUrl: string, resourcePart: string): string;
        static makeUrlPartResource(resource: string, id: any): string;
        makeUrlPartResource(): string;
        makeContent(): any;
        getResponse(callback: (response: IResponse, errorCode: number) => any): JQueryPromise<any>;
    }
}
declare module mika.utils.data.OData.V4 {
    interface IODataSelectParams {
        /** $select=field1,field2
         * $select=*
         */
        $select?: string[];
        /**$select=Name,Products&$expand=Products/Suppliers*/
        $expand?: string[];
        /** {@link http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#FilterSystemQueryOption OData Documentation}
         * Logical:
         * and, or, not
         * eq   ==
         * ne   !=
         * gt   >
         * ge   >=
         * lt   <
         * le   <=
         *
         * Arithmetic: add, sub, mul, div, mod
         * $filter=Price div 2 gt 4
         *
         * Grouping: (...)
         * $filter=(Price sub 5) gt 10
         *
         * String Functions:
         * bool substringof(find, text)
         * bool endswith(text, end)
         * bool startswith(text, start)
         * int length(text)
         * int indexof(text, find)
         * string replace(text, find, replace)
         * string substring(text, pos, length?)
         * string tolower(text)
         * string toupper(text)
         * string trim(text)
         * string concat(text, text)
         *
         * Date Functions:
         * int year(DateTime)
         * int month(DateTime)
         * int day(DateTime)
         * int hour(DateTime)
         * int minute(DateTime)
         * int second(DateTime)
         *
         * Math Functions (double|decimal):
         * double round(double)
         * double floor(double)
         * double ceiling(double)
         *
         * Type Functions:
         * bool IsOf(type)
         * bool IsOf(expression, type)
         * $filter=isof('NorthwindModel.Order')
         * $filter=isof(ShipCountry, 'Edm.String')
         *
         * Examples:
         * $filter=Address/City eq 'Redmond'
         * $filter=Price le 200 and Price gt 3.5
         * $filter=not endswith(Description,'milk')
         */
        $filter?: string;
        /** The $levels expand option can be used to specify the number of levels of recursion for a hierarchy in which the related entity type is the same as, or can be cast to, the source entity type. The same expand options are applied at each level of the hierarchy. */
        $levels?: number;
        /** $orderby=Name desc
         * $orderby=Name asc
         * $orderby=Name
         */
        $orderby?: string[];
        $top?: number;
        $skip?: number;
        /** $format=application/json
         * $format=application/json;odata.metadata=full */
        $format?: ODataFormat;
        /** Include count of entities to response
         * $inlinecount=allpages
         response: odata.count=11 */
        $inlinecount?: string;
    }
}
declare module mika.utils.data.OData.V4 {
    class ODataSelectParams extends ODataParams implements IODataSelectParams {
        constructor(params?: IODataSelectParams);
        $select: string[];
        $expand: string[];
        $filter: string;
        $levels: number;
        $orderby: string[];
        $top: number;
        $skip: number;
        $format: mika.utils.data.OData.V4.ODataFormat;
        $inlinecount: string;
    }
}
declare module mika.utils.data.OData.V4 {
    class ODataModificationRequest<TEntity extends IEntity, TId> extends ODataRequest<ODataParams, TId> {
        constructor(method: HttpMethod, serviceUrl: string, resource: string, data: TEntity, id: TId);
        data: TEntity;
        makeContent(): TEntity;
    }
    class ODataSelectRequest<TId> extends ODataRequest<ODataSelectParams, TId> {
        constructor(params: IODataSelectParams, id?: TId, serviceUrl?: string, resource?: string);
    }
    /** INSERT OR IGNORE */
    class ODataAddRequest<TEntity extends IEntity, TId> extends ODataModificationRequest<TEntity, TId> {
        constructor(serviceUrl: string, resource: string, data: TEntity, id: TId);
    }
    /** INSERT OR MERGE */
    class ODataUpdateRequest<TEntity extends IEntity, TId> extends ODataModificationRequest<TEntity, TId> {
        constructor(serviceUrl: string, resource: string, data: TEntity, id: TId);
    }
    /** DELETE */
    class ODataDeleteRequest<TEntity extends IEntity, TId> extends ODataModificationRequest<TEntity, TId> {
        constructor(serviceUrl: string, resource: string, id: TId);
        makeContent(): any;
    }
    /** INSERT OR REPLACE */
    class ODataReplaceRequest<TEntity extends IEntity, TId> extends ODataModificationRequest<TEntity, TId> {
        constructor(serviceUrl: string, resource: string, data: TEntity, id: TId);
    }
}
declare module mika.utils.data.OData.V4 {
    import IDataBaseResult = mika.datamodel.contracts.IDataBaseResult;
    import IDataBase = mika.datamodel.contracts.IDataBase;
    interface IODataBase<TEntity extends IEntity, TEntityResult extends IEntity, TQuery extends ODataRequest<ODataParams, any>, TQueryResult extends IResponse> extends IDataBase<TEntity, TEntityResult, TQuery, TQueryResult> {
        DeleteById(entityId: any, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
    }
}
declare module mika.utils.data.OData.V4 {
    interface IODataRequestsBuilder<TEntity extends IEntity, TId, TQuery extends ODataRequest<ODataParams, any>> {
        Add(entity: TEntity): ODataRequest<ODataParams, TId>;
        Update(entity: TEntity): ODataRequest<ODataParams, TId>;
        DeleteById(id: TId): ODataRequest<ODataParams, TId>;
        Delete(entity: TEntity): ODataRequest<ODataParams, TId>;
        Replace(entity: TEntity): ODataRequest<ODataParams, TId>;
        Query(query: TQuery): TQuery;
    }
}
declare module mika.utils.data.OData.V4 {
    class ODataRequestsBuilder<TEntity extends IEntity, TQuery extends ODataRequest<ODataParams, any>, TId> implements IODataRequestsBuilder<TEntity, TId, TQuery> {
        serviceUrl: string;
        resource: string;
        idField: string;
        nullId: TId;
        constructor(serviceUrl: string, resource: string, idField: string, nullId: TId);
        Add(entity: TEntity): ODataModificationRequest<TEntity, TId>;
        Update(entity: TEntity): ODataModificationRequest<TEntity, TId>;
        DeleteById(id: TId): ODataRequest<ODataParams, TId>;
        Delete(entity: TEntity): ODataRequest<ODataParams, TId>;
        Replace(entity: TEntity): ODataModificationRequest<TEntity, TId>;
        Query(query: TQuery): TQuery;
    }
}
declare module mika.utils.data.OData.V4 {
    import IDataBaseResult = mika.datamodel.contracts.IDataBaseResult;
    class ODataBase<TEntity extends IEntity, TId, TEntityResult extends IEntity, TQuery extends ODataRequest<ODataParams, any>, TQueryResult extends IResponse> implements IODataBase<TEntity, TEntityResult, TQuery, TQueryResult> {
        private _requestBuilder;
        constructor(requestBuilder: IODataRequestsBuilder<TEntity, TId, TQuery>);
        private static _tryAgainCodes;
        protected getResponse(entity: TEntity, query: ODataRequest<any, any>, callback?: (result: IDataBaseResult<TEntityResult | TQueryResult>) => void): void;
        Add(entity: TEntity, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
        DeleteById(entityId: TId, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
        Delete(entity: TEntity, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
        Replace(entity: TEntity, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
        Update(entity: TEntity, callback?: (result: IDataBaseResult<TEntityResult>) => void): void;
        Query(query: TQuery, callback: (result: IDataBaseResult<TQueryResult>) => void): void;
        dispose(): void;
    }
}
declare module mika.utils.data.OData.V4 {
    class ODataBaseRel<TId, TQuery extends ODataRequest<ODataParams, any>, TQueryResult extends IResponse> extends ODataBase<IRelation<TId>, TId, IEntity, TQuery, TQueryResult> {
    }
}
declare module mika.utils.data.OData.V4 {
    class ODataRelRequest<TParams extends ODataParams, TId> extends ODataRequest<TParams, TId> {
        constructor(method: HttpMethod, serviceUrl: string, resource: string, resourceRel: string, id: TId, idRel: TId);
        resourceRel: string;
        idRel: TId;
        makeUrlPartResource(): string;
        makeUrlPartResourceRel(): string;
        makeUrlRel(): string;
    }
}
declare module mika.utils.data.OData.V4 {
    /** INSERT OR IGNORE */
    class ODataModificationRelRequest<TId> extends ODataRelRequest<ODataRelParams<TId>, TId> {
        constructor(method: HttpMethod, serviceUrl: string, resource: string, resourceRel: string, id: TId, idRel: TId);
        makeContent(): IEntityReference;
    }
    /** INSERT OR IGNORE */
    class ODataAddRelRequest<TEntity extends IEntity, TId> extends ODataModificationRelRequest<TId> {
        constructor(serviceUrl: string, resource: string, resourceRel: string, id: TId, idRel: TId);
    }
    /** INSERT OR MERGE */
    class ODataUpdateRelRequest<TEntity extends IEntity, TId> extends ODataModificationRelRequest<TId> {
        constructor(serviceUrl: string, resource: string, resourceRel: string, id: TId, idRel: TId);
    }
    /** DELETE */
    class ODataDeleteRelRequest<TEntity extends IEntity, TId> extends ODataModificationRelRequest<TId> {
        constructor(serviceUrl: string, resource: string, resourceRel: string, id: TId, idRel: TId);
        makeUrl(): string;
        makeContent(): any;
    }
    /** INSERT OR REPLACE */
    class ODataReplaceRelRequest<TEntity extends IEntity, TId> extends ODataModificationRelRequest<TId> {
        constructor(serviceUrl: string, resource: string, resourceRel: string, id: TId, idRel: TId);
    }
}
declare module mika.utils.data.OData.V4 {
    interface IRelation<TId> {
        id: TId;
        idRel: TId;
    }
}
declare module mika.utils.data.OData.V4 {
    interface IODataRelRequestsBuilder<TId, TQuery extends ODataRequest<ODataRelParams<any>, any>> extends IODataRequestsBuilder<IRelation<TId>, TId, TQuery> {
    }
}
declare module mika.utils.data.OData.V4 {
    class ODataRelRequestsBuilder<TQuery extends ODataRelRequest<ODataRelParams<any>, any>, TId> implements IODataRelRequestsBuilder<TId, TQuery> {
        serviceUrl: string;
        resource: string;
        resourceRel: string;
        constructor(serviceUrl: string, resource: string, resourceRel: string);
        Add(relation: IRelation<TId>): ODataRequest<ODataParams, TId>;
        Update(relation: IRelation<TId>): ODataRequest<ODataParams, TId>;
        Delete(relation: IRelation<TId>): ODataRequest<ODataParams, TId>;
        Replace(relation: IRelation<TId>): ODataRequest<ODataParams, TId>;
        Query(query: TQuery): TQuery;
        DeleteById(id: TId): ODataRequest<ODataParams, TId>;
    }
}
declare module mika.utils.Serialization {
    class SerializationUtils {
        static base64ToBinary(base64: string): string;
        static binaryToBase64(data: string, startIndex?: number, length?: number): string;
        static stringToBinaryUTF8(str: string): string;
        static binaryUTF8ToString(data: string, startIndex?: number, length?: number): string;
    }
}
interface Math {
    MAX_INT8: number;
    MIN_INT8: number;
    MAX_UINT8: number;
    MAX_INT16: number;
    MIN_INT16: number;
    MAX_UINT16: number;
    MAX_INT32: number;
    MIN_INT32: number;
    MAX_UINT32: number;
    MAX_Float32: number;
    MIN_Float32: number;
    MAX_Float64: number;
    MIN_Float64: number;
    pow2(x: number): number;
    log2(x: number): number;
    random(max?: number): number;
    random(min?: number, max?: number): number;
    randomInt(max?: number): number;
    randomInt(min?: number, max?: number): number;
}
declare module mika.utils {
}
declare module mika.utils.UUID {
    import IComparable = mika.utils.List.IComparable;
    class UUID implements IComparable<UUID> {
        private static generate();
        private static checkUUIDRegEx;
        static isValid(uuidStr: string): boolean;
        private _uuidStr;
        private _binaryStr;
        constructor(binaryStr?: string);
        static parse(uuidStr: string, validate?: boolean): UUID;
        compareTo(uuid: UUID): number;
        equals(uuid: UUID): boolean;
        toBinary(): string;
        toString(): string;
    }
}
declare module mika.utils.Serialization {
    class NumberSerializer {
        static packI8(n: number): string;
        static unpackI8(data: string, startIndex?: number): number;
        static packU8(n: number): string;
        static unpackU8(data: string, startIndex?: number): number;
        static packU8Clamped(n: number): string;
        static packI16(n: number): string;
        static unpackI16(data: string, startIndex?: number): number;
        static packU16(n: number): string;
        static unpackU16(data: string, startIndex?: number): number;
        static packI32(n: number): string;
        static unpackI32(data: string, startIndex?: number): number;
        static packU32(n: number): string;
        static unpackU32(data: string, startIndex?: number): number;
        static packF32: (v: number) => string;
        static unpackF32: (b: string, startIndex?: number) => number;
        static packF64: (v: number) => string;
        static unpackF64: (b: string, startIndex?: number) => number;
    }
}
declare module mika.utils.Serialization {
    import UUID = mika.utils.UUID.UUID;
    import ICollection = mika.utils.List.ICollection;
    import IDictionary = mika.utils.List.IDictionary;
    interface ReadItemFunc<TItem> extends Function {
        (): TItem;
    }
    class BinaryReader {
        constructor(data: string);
        readFloat32: (nullable?: boolean) => number;
        readFloat64: (nullable?: boolean) => number;
        readInt8: (nullable?: boolean) => number;
        readUInt8: (nullable?: boolean) => number;
        readInt16: (nullable?: boolean) => number;
        readUInt16: (nullable?: boolean) => number;
        readInt32: (nullable?: boolean) => number;
        readUInt32: (nullable?: boolean) => number;
        readBoolean: () => boolean;
        readStringUTF8: (nullable?: boolean) => string;
        readBinaryData: (nullable?: boolean) => string;
        readUUID: (nullable?: boolean) => UUID;
        readToCollection: <T>(collection: ICollection<T>, readItem: ReadItemFunc<T>, nullableItems?: boolean) => number;
        readCollection: <T>(addItem: (item: T) => any, readItem: ReadItemFunc<T>, initCount?: (count: number) => any, nullableItems?: boolean) => number;
        readToArray: <T>(array: T[], readItem: ReadItemFunc<T>, nullableItems?: boolean) => number;
        readArray: <T>(readItem: ReadItemFunc<T>, nullableItems?: boolean) => Array<T>;
        readToDictionary: <TKey, TValue>(dictionary: IDictionary<TKey, TValue>, readKey: ReadItemFunc<TKey>, readValue: ReadItemFunc<TValue>, nullableKeys?: boolean, nullableValues?: boolean) => number;
        readToObject: (object: {}) => number;
        readObject: () => any;
        readAny: () => any;
    }
}
declare module mika.utils.Serialization {
    import UUID = mika.utils.UUID.UUID;
    import ICollection = mika.utils.List.ICollection;
    import IDictionary = mika.utils.List.IDictionary;
    interface WriteItemAction<TItem> extends Function {
        (item: TItem): any;
    }
    class BinaryBuilder {
        constructor();
        writeFloat32: (value: number, nullable?: boolean) => BinaryBuilder;
        writeFloat64: (value: number, nullable?: boolean) => BinaryBuilder;
        writeInt8: (value: number, nullable?: boolean) => BinaryBuilder;
        writeUInt8: (value: number, nullable?: boolean) => BinaryBuilder;
        writeInt16: (value: number, nullable?: boolean) => BinaryBuilder;
        writeUInt16: (value: number, nullable?: boolean) => BinaryBuilder;
        writeInt32: (value: number, nullable?: boolean) => BinaryBuilder;
        writeUInt32: (value: number, nullable?: boolean) => BinaryBuilder;
        writeBoolean: (value: boolean) => BinaryBuilder;
        writeStringUTF8: (value: string, nullable?: boolean) => BinaryBuilder;
        writeBinaryData: (data: string, nullable?: boolean) => BinaryBuilder;
        writeUUID: (uuid: UUID, nullable?: boolean) => BinaryBuilder;
        writeCollection: <T>(collection: ICollection<T>, writeItem: WriteItemAction<T>, nullableItems?: boolean) => BinaryBuilder;
        writeArray: <T>(array: T[], writeItem: WriteItemAction<T>, nullableItems?: boolean) => BinaryBuilder;
        writeDictionary: <TKey, TValue>(dictionary: IDictionary<TKey, TValue>, writeKey: WriteItemAction<TKey>, writeValue: WriteItemAction<TValue>, nullableKeys?: boolean, nullableValues?: boolean) => BinaryBuilder;
        writeObject: (object: {}, deepWrite: boolean, writefloat64?: boolean) => BinaryBuilder;
        writeAny: (value: any, deepWrite: boolean, writefloat64?: boolean) => boolean;
        toString: () => string;
    }
}
declare module mika.utils.Serialization {
    interface IBinarySerializable {
        Serialize(writer: BinaryBuilder): any;
        DeSerialize(reader: BinaryReader): any;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface Func<TResult> extends Function {
        (): TResult;
    }
}
declare module mika.utils.Serialization {
    import IComparable = utils.List.IComparable;
    import IIterable = utils.List.IIterable;
    import UUID = utils.UUID.UUID;
    import Func = utils.Contracts.Delegates.Func;
    import IBinarySerializable = Serialization.IBinarySerializable;
    import IIterator = utils.List.IIterator;
    import IEventHandler = utils.Events.IEventHandler;
    import EventArgs = utils.Events.EventArgs;
    import ISet = utils.List.ISet;
    class TagCombine implements IComparable<TagCombine>, IBinarySerializable, IIterable<UUID> {
        private _ids;
        constructor(ids: UUID[]);
        compareTo(obj: Object): number;
        hashCode(): number;
        equals(o: Object): boolean;
        private static _currentVersion;
        Serialize(writer: BinaryBuilder): void;
        DeSerialize(reader: BinaryReader): void;
        IsSubTags(combine: TagCombine): boolean;
        AddTag(id: UUID): void;
        toString(): string;
        iterator(): IIterator<UUID>;
        getIds(): UUID[];
    }
    class TypeIdentityList {
        private _typeIdConstructors;
        private _typeConstructors;
        private _typeToId;
        private _idToType;
        private _typeToTags;
        private _typeIdToTags;
        private _tagsToType;
        private _types;
        private _typesWithConstructor;
        constructor();
        getTypes(): ISet<Class>;
        getTypesWithConstructor(): ISet<Class>;
        AddType(type: Class, id: UUID, _constructor: Func<Object>): boolean;
        private addTagCombine(type, id);
        CreateInstanceByType(type: Class): Object;
        CreateInstanceByTags(tags: IIterable<UUID>): Object;
        GetConstructorByTags(tags: IIterable<UUID>): Func<Object>;
        GetConstructorByType(type: Class): Func<Object>;
        private getSubTypesIds(tags, ref_tagCombine);
        GetSubTypes(baseType: Class, withConstructor: boolean): ISet<Class>;
        GetSubTypesFromTags(tags: IIterable<UUID>, withConstructor: boolean): ISet<Class>;
        GetTypeFromTag(tag: UUID): Class;
        GetTypeFromTags(tags: IIterable<UUID>): Class;
        private idsToTypes(ids);
        GetTypeTags(type: Class): UUID[];
        GetTypeTag(type: Class): UUID;
        private _types_CollectionChanged_listener;
        private _types_CollectionChanged(sender, e);
        private _TypesChanged;
        TypesChanged(): IEventHandler<EventArgs>;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface Action1<T1> extends Function {
        (v1: T1): any;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface Action2<T1, T2> extends Function {
        (v1: T1, v2: T2): any;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface Action3<T1, T2, T3> extends Function {
        (v1: T1, v2: T2, v3: T3): any;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface Action4<T1, T2, T3, T4> extends Function {
        (v1: T1, v2: T2, v3: T3, v4: T4): any;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface Func3<T1, T2, T3, TResult> extends Function {
        (v1: T1, v2: T2, v3: T3): TResult;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface Func4<T1, T2, T3, T4, TResult> extends Function {
        (v1: T1, v2: T2, v3: T3, v4: T4): TResult;
    }
}
declare module mika.utils.Contracts.Delegates {
    interface FuncN<TArgs, TResult> extends Function {
        (...args: TArgs[]): TResult;
    }
}
declare var fail: (message?: string) => any;
declare var DEBUG_MODE: boolean;
declare module mika.utils.Tests {
    function globalInit(): boolean;
    class TestUtils {
        private static _debugLog;
        static debugLogClear(): void;
        private static debugLog(message);
        static STRIP_COMMENTS: RegExp;
        static ARGUMENT_NAMES: RegExp;
        static getFuncParamNames(func: Function): string[];
        /** Чтобы отлаживать тесты в браузере, запрещаю ReSharper-у останавливать сервер */
        static DisableResharperStopping(): void;
        static StopTestByFirstFailure(): void;
        static showLastThreads(): void;
        private static consoleLog;
        private static consoleClear;
        static Init(): void;
    }
}
declare module mika.utils.TimeUtils {
    class TimeSpanFormat {
        private _parts;
        private _patterns;
        constructor(patterns: string[], parts: TimeSpanPart[]);
        format(timeSpan: TimeSpan): string;
    }
}
declare module mika.utils.TimeUtils {
    enum TimeSpanPart {
        /** 1 Year = 12 Months = 360 days */
        Year = 0,
        /** 1 Month = 30 days */
        Month = 1,
        Week = 2,
        Day = 3,
        DayOfMonth = 4,
        DayOfWeek = 5,
        Hour = 6,
        Minute = 7,
        Second = 8,
        Millisecond = 9,
        Tick = 10,
    }
}

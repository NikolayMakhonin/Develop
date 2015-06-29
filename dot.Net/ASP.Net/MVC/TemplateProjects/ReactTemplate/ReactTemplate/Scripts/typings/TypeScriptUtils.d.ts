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
declare module mika.logger {
    interface ILog {
        v(tag: String, msg: String, exception?: Object): number;
        d(tag: String, msg: String, exception?: Object): number;
        i(tag: String, msg: String, exception?: Object): number;
        w(tag: String, msg: String, exception?: Object): number;
        e(tag: String, msg: String, exception?: Object): number;
        wtf(tag: String, msg: String, exception?: Object): number;
        getStackTraceString(exception: Object): String;
        println(priority: number, tag: String, msg: String): number;
    }
}
declare module mika.logger {
    class LogConsole implements ILog {
        v(tag: String, msg: String, exception?: Object): number;
        d(tag: String, msg: String, exception?: Object): number;
        i(tag: String, msg: String, exception?: Object): number;
        w(tag: String, msg: String, exception?: Object): number;
        e(tag: String, msg: String, exception?: Object): number;
        wtf(tag: String, msg: String, exception?: Object): number;
        getStackTraceString(exception: Object): String;
        println(priority: number, tag: String, msg: String): number;
        private log(funcName, ...objects);
    }
}
declare module mika.logger {
    class Log {
        static currentLogger: ILog;
        static tagPrefix: string;
        private static ctor;
        static v(tag: string, msg: string, exception?: Object): number;
        static d(tag: string, msg: string, exception?: Object): number;
        static i(tag: string, msg: string, exception?: Object): number;
        static w(tag: string, msg: string, exception?: Object): number;
        static e(tag: string, msg: string, exception?: Object): number;
        static wtf(tag: string, msg: string, exception?: Object): number;
        static getStackTraceString(exception: Object): string;
        static println(priority: number, tag: string, msg: string): number;
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
        append: (str: string) => StringBuilder;
        toString: () => string;
    }
    class StringUtils {
        static Join(separator: string, list: IIterable<any>): string;
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
declare module mika.utils.List {
    import EventArgs = utils.Events.EventArgs;
    import ThreadState = mika.utils.Async.ThreadState;
    class ThreadStateChangedEventArgs extends EventArgs {
        private _oldState;
        getOldState(): number;
        constructor(oldState: ThreadState);
    }
}
declare module mika.utils.Async {
    import ILinkItem = mika.utils.List.ILinkItem;
    import UnhandledExceptionEventArgs = mika.utils.Async.Quants.UnhandledExceptionEventArgs;
    import IEventHandler = mika.utils.Events.IEventHandler;
    import EventArgs = mika.utils.Events.EventArgs;
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
        runningChanged(): IEventHandler<EventArgs>;
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
        private iterate;
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
    }
}
declare module mika.utils.Async {
    import IQuantFunc = mika.utils.Async.Quants.IQuantFunc;
    import ThreadPriorityChangedEventArgs = mika.utils.List.ThreadPriorityChangedEventArgs;
    import IDisposable = mika.utils.Contracts.Patterns.IDisposable;
    import ThreadStateChangedEventArgs = mika.utils.List.ThreadStateChangedEventArgs;
    import IEventHandler = mika.utils.Events.IEventHandler;
    import UnhandledExceptionEventArgs = mika.utils.Async.Quants.UnhandledExceptionEventArgs;
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
    interface IThread extends IDisposable {
        id(): number;
        start(): any;
        abort(waitTimeOut?: number, suspendCurrentThread?: boolean, callback?: WaitTimerQuantCallBack): any;
        wait(timeOut?: number, suspendCurrentThread?: boolean, callback?: WaitTimerQuantCallBack): any;
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
        dispose(abortTimeOut?: number): any;
    }
    interface IThreadTimer extends IThread {
        /** Create timer StackTrace */
        getInterval(): number;
        getTimerState(): ThreadTimerState;
        setInterval(interval: number): any;
        stop(): any;
        start(firstInterval?: number, interval?: number): any;
    }
}
declare module mika.utils.Async {
    import IThread = mika.utils.Async.IThread;
    import ThreadPriorityChangedEventArgs = mika.utils.List.ThreadPriorityChangedEventArgs;
    import ThreadStateChangedEventArgs = mika.utils.List.ThreadStateChangedEventArgs;
    import IQuantFunc = mika.utils.Async.Quants.IQuantFunc;
    import IEventHandler = mika.utils.Events.IEventHandler;
    import UnhandledExceptionEventArgs = mika.utils.Async.Quants.UnhandledExceptionEventArgs;
    class Thread implements IThread {
        private static _nextId;
        private _id;
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
        abort(waitTimeOut?: number, suspendCurrentThread?: boolean, callback?: WaitTimerQuantCallBack): void;
        private abortPrivate(waitTimeOut?, suspendCurrentThread?, callback?, outThreadCallBack?);
        /** if (timeOut == null) unlimited timeout */
        wait(timeOut?: number, suspendCurrentThread?: boolean, callback?: WaitTimerQuantCallBack): void;
        private waitPrivate(timeOut?, suspendCurrentThread?, callback?, outThreadCallBack?);
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
        dispose(abortTimeOut?: number): void;
        iterate(): boolean;
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
        /** interval < 0 == stop */
        setInterval(interval: number): void;
        /** interval < 0 == stop, firstInterval < 0 == interval */
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
        abort(waitTimeOut?: number, suspendCurrentThread?: boolean, callback?: WaitTimerCallBack): void;
        setFuncs(threadFunc: IQuantFunc[]): void;
        getTimerState(): ThreadTimerState;
        dispose(abortTimeOut?: number): void;
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
        /** Не рекомендуется клонировать объеты этим методом, разве что для отладки и тестирования */
        function clone<T>(object: Object, deep?: boolean): T;
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
        private unhandledException_listener;
        private stateChanged_listener;
        ForceDeferredExecute(suspendCurrentThread?: boolean): void;
        ForceExecute(suspendCurrentThread?: boolean): void;
        Execute(): void;
        disposed: boolean;
        /** if (timeOut == null) unlimited timeout */
        dispose(abortTimeOut?: number): void;
        /** if (timeOut == null) unlimited timeout */
        abort(waitTimeOut?: number, suspendCurrentThread?: boolean, callback?: WaitTimerCallBack): void;
        compareTo(obj: DeferredAction): number;
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
    interface IBaseMap<TKey, TValue> {
        containsKey(key: TKey): boolean;
        pull(key: TKey): TValue;
        put(key: TKey, value: TValue, notPutIfExists?: boolean): boolean;
        removeKey(key: TKey): boolean;
        size(): any;
        clear(): any;
    }
    interface IObjectMap<TValue> extends IBaseMap<string, TValue> {
        setObject(object: Object): any;
        getObject(): any;
    }
    interface IMap<TKey, TValue> extends IBaseMap<TKey, TValue> {
        keys(): ISet<TKey>;
        values(): ISet<TValue>;
        size(): number;
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
    /** внимание, обрати внимание, что при запуске метода hashcode() в объект записывается свойство _hashCode, которое станет элементом этого словаря */
    class ObjectMap<TValue> implements List.IObjectMap<TValue> {
        private _object;
        constructor(object?: Object);
        setObject(object: Object): void;
        getObject(): {};
        containsKey(key: string): boolean;
        pull(key: string): TValue;
        put(key: string, value: TValue, notAddIfExists: boolean): boolean;
        removeKey(key: string): boolean;
        clear(): void;
        /** Низкопроизводительная операция, рекомендуется использовать только для отладки*/
        size(): number;
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
        /** установлены OldIndex: свойства, OldItems */
        Removed = 0,
        /** установлены NewIndex: свойства, NewItems */
        Added = 1,
        /** установлены private OldIndex: свойства == NewIndex, OldItems[1], NewItems[1], */
        Setted = 2,
        /** не установлены свойства */
        Resorted = 3,
        /** установлены OldIndex: свойства, NewIndex, NewItems[1] */
        Moved = 4,
        /** установлены OldIndex: свойства, NewIndex */
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
        private _queueCollectionChanged;
        private _queueCollectionChangedHandling;
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
        constructor(add: (listener: IEventListener<TEventArgs>) => any, remove: (listener: IEventListener<TEventArgs>) => any, invoke: (o, e: TEventArgs) => any, count: () => any);
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
    interface Func<TResult> extends Function {
        (): TResult;
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

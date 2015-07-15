declare module nodejs {

    export module react {

        export module flux {

			/** Error new FluxComponent(); 
			TypeError: Cannot read property 'flux' of undefined
    at FluxComponent.getFlux (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:2430:22)
    at FluxComponent.initialize (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:2436:22)
    at new FluxComponent (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1591:14)
    at js2tsClass.writeClass (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:260:36)
    at js2tsClass.writeSubElements (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:223:42)
    at js2tsClass.writeModule (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…cript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:40:48)
    at js2tsClass.writeModules (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:253:30)
    at js2tsClass.writeModule (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…cript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:42:35)
    at js2tsClass.writeModules (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:253:30)
    at js2tsClass.writeModule (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…cript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:42:35)
			*/
            export class FluxComponent {

                constructor(props, context);
                wrapChild(child);
                getChildProps();
                render(...args);
                getChildContext();
                getFlux();
                initialize();
                componentWillUnmount();
                componentWillReceiveProps(nextProps);
                updateStores(...args);
                getStoreState(...args);
                connectToStores(...args);
                __reactAutoBindMap: { getDOMNode: Function; };
                getDOMNode();
                mixins: any;
                statics: any;
                propTypes: any;
                contextTypes: any;
                childContextTypes: any;
                getDefaultProps: any;
                getInitialState: any;
                componentWillMount: any;
                componentDidMount: any;
                shouldComponentUpdate: any;
                componentWillUpdate: any;
                componentDidUpdate: any;
                updateComponent: any;
                setState(partialState, callback);
                forceUpdate(callback);
                replaceState(newState, callback);
                isMounted();
                setProps(partialProps, callback);
                replaceProps(newProps, callback);

            }

            export module FluxComponent {

                export module contextTypes {

                    export function flux();

                }

                export module childContextTypes {

                    export function flux();

                }

                export module propTypes {

                    export function connectToStores();
                    export function flux();
                    export function render();
                    export function stateGetter();

                }


            }

            export class Dispatcher {

                $Dispatcher_callbacks: any;
                $Dispatcher_isPending: any;
                $Dispatcher_isHandled: any;
                $Dispatcher_isDispatching: boolean;
                $Dispatcher_pendingPayload: any;
                register(callback);
                unregister(id);
                waitFor(ids);
                dispatch(payload);
                isDispatching();
                $Dispatcher_invokeCallback(id);
                $Dispatcher_startDispatching(payload);
                $Dispatcher_stopDispatching();

            }

            export module flummox {

                export var __esModule: boolean;
                export class Flux {

                    dispatcher: Dispatcher;
                    _stores: any;
                    _actions: any;
                    createStore(key, _Store, ...args);
                    getStore(key);
                    removeStore(key);
                    createActions(key, _Actions, ...args);
                    getActions(key);
                    getActionIds(key);
                    removeActions(key);
                    getAllActionIds();
                    dispatch(actionId, body);
                    dispatchAsync(actionId, promise, actionArgs);
                    _dispatch(payload);
                    waitFor(tokensOrStores);
                    removeAllStoreListeners(event);
                    serialize();
                    deserialize(serializedState);
                    getConstants(key);
                    getAllConstants();
                    dehydrate();
                    hydrate(serializedState);
                    _events;
                    listeners(event);
                    emit(event, a1, a2, a3, a4, a5, ...args);
                    on(event, fn, context);
                    once(event, fn, context);
                    removeListener(event, fn, once);
                    removeAllListeners(event);
                    off(event, fn, once);
                    addListener(event, fn, context);
                    setMaxListeners();

                }

                export module Flux {

                    export class EventEmitter {

                        /** == EventEmitter*/
                        static EventEmitter: Function;
                        /** == EventEmitter*/
                        static EventEmitter2: Function;
                        /** == EventEmitter*/
                        static EventEmitter3: Function;
                        _events;
                        listeners(event);
                        emit(event, a1, a2, a3, a4, a5, ...args);
                        on(event, fn, context);
                        once(event, fn, context);
                        removeListener(event, fn, once);
                        removeAllListeners(event);
                        off(event, fn, once);
                        addListener(event, fn, context);
                        setMaxListeners();

                    }

                    export class EventEmitter2 {

                        /** == EventEmitter2*/
                        static EventEmitter: Function;
                        /** == EventEmitter2*/
                        static EventEmitter2: Function;
                        /** == EventEmitter2*/
                        static EventEmitter3: Function;
                        _events;
                        listeners(event);
                        emit(event, a1, a2, a3, a4, a5, ...args);
                        on(event, fn, context);
                        once(event, fn, context);
                        removeListener(event, fn, once);
                        removeAllListeners(event);
                        off(event, fn, once);
                        addListener(event, fn, context);
                        setMaxListeners();

                    }

                    export class EventEmitter3 {

                        /** == EventEmitter3*/
                        static EventEmitter: Function;
                        /** == EventEmitter3*/
                        static EventEmitter2: Function;
                        /** == EventEmitter3*/
                        static EventEmitter3: Function;
                        _events;
                        listeners(event);
                        emit(event, a1, a2, a3, a4, a5, ...args);
                        on(event, fn, context);
                        once(event, fn, context);
                        removeListener(event, fn, once);
                        removeAllListeners(event);
                        off(event, fn, once);
                        addListener(event, fn, context);
                        setMaxListeners();

                    }


                }

                export class Flummox {

                    dispatcher: Dispatcher;
                    _stores: any;
                    _actions: any;
                    createStore(key, _Store, ...args);
                    getStore(key);
                    removeStore(key);
                    createActions(key, _Actions, ...args);
                    getActions(key);
                    getActionIds(key);
                    removeActions(key);
                    getAllActionIds();
                    dispatch(actionId, body);
                    dispatchAsync(actionId, promise, actionArgs);
                    _dispatch(payload);
                    waitFor(tokensOrStores);
                    removeAllStoreListeners(event);
                    serialize();
                    deserialize(serializedState);
                    getConstants(key);
                    getAllConstants();
                    dehydrate();
                    hydrate(serializedState);
                    _events;
                    listeners(event);
                    emit(event, a1, a2, a3, a4, a5, ...args);
                    on(event, fn, context);
                    once(event, fn, context);
                    removeListener(event, fn, once);
                    removeAllListeners(event);
                    off(event, fn, once);
                    addListener(event, fn, context);
                    setMaxListeners();

                }

                export module Flummox {

                    export class EventEmitter {

                        /** == EventEmitter*/
                        static EventEmitter: Function;
                        /** == EventEmitter*/
                        static EventEmitter2: Function;
                        /** == EventEmitter*/
                        static EventEmitter3: Function;
                        _events;
                        listeners(event);
                        emit(event, a1, a2, a3, a4, a5, ...args);
                        on(event, fn, context);
                        once(event, fn, context);
                        removeListener(event, fn, once);
                        removeAllListeners(event);
                        off(event, fn, once);
                        addListener(event, fn, context);
                        setMaxListeners();

                    }

                    export class EventEmitter2 {

                        /** == EventEmitter2*/
                        static EventEmitter: Function;
                        /** == EventEmitter2*/
                        static EventEmitter2: Function;
                        /** == EventEmitter2*/
                        static EventEmitter3: Function;
                        _events;
                        listeners(event);
                        emit(event, a1, a2, a3, a4, a5, ...args);
                        on(event, fn, context);
                        once(event, fn, context);
                        removeListener(event, fn, once);
                        removeAllListeners(event);
                        off(event, fn, once);
                        addListener(event, fn, context);
                        setMaxListeners();

                    }

                    export class EventEmitter3 {

                        /** == EventEmitter3*/
                        static EventEmitter: Function;
                        /** == EventEmitter3*/
                        static EventEmitter2: Function;
                        /** == EventEmitter3*/
                        static EventEmitter3: Function;
                        _events;
                        listeners(event);
                        emit(event, a1, a2, a3, a4, a5, ...args);
                        on(event, fn, context);
                        once(event, fn, context);
                        removeListener(event, fn, once);
                        removeAllListeners(event);
                        off(event, fn, once);
                        addListener(event, fn, context);
                        setMaxListeners();

                    }


                }

                export class Store {

                    static assignState(oldState, newState);
                    state: any;
                    _handlers: any;
                    _asyncHandlers: any;
                    _catchAllHandlers: any[];
                    _catchAllAsyncHandlers: { begin: any[]; success: any[]; failure: any[]; };
                    setState(newState);
                    replaceState(newState);
                    getStateAsObject();
                    _assignState(...args);
                    forceUpdate();
                    register(actionId, handler);
                    registerAsync(actionId, beginHandler, successHandler, failureHandler);
                    registerAll(handler);
                    registerAllAsync(beginHandler, successHandler, failureHandler);
                    _bindAsyncHandlers(asyncHandlers);
                    waitFor(tokensOrStores);
                    handler(payload);
                    _performHandler(_handlers, args);
                    _performHandlers(_handlers, args);
                    _events;
                    listeners(event);
                    emit(event, a1, a2, a3, a4, a5, ...args);
                    on(event, fn, context);
                    once(event, fn, context);
                    removeListener(event, fn, once);
                    removeAllListeners(event);
                    off(event, fn, once);
                    addListener(event, fn, context);
                    setMaxListeners();

                }

                export module Store {

                    export class EventEmitter {

                        /** == EventEmitter*/
                        static EventEmitter: Function;
                        /** == EventEmitter*/
                        static EventEmitter2: Function;
                        /** == EventEmitter*/
                        static EventEmitter3: Function;
                        _events;
                        listeners(event);
                        emit(event, a1, a2, a3, a4, a5, ...args);
                        on(event, fn, context);
                        once(event, fn, context);
                        removeListener(event, fn, once);
                        removeAllListeners(event);
                        off(event, fn, once);
                        addListener(event, fn, context);
                        setMaxListeners();

                    }

                    export class EventEmitter2 {

                        /** == EventEmitter2*/
                        static EventEmitter: Function;
                        /** == EventEmitter2*/
                        static EventEmitter2: Function;
                        /** == EventEmitter2*/
                        static EventEmitter3: Function;
                        _events;
                        listeners(event);
                        emit(event, a1, a2, a3, a4, a5, ...args);
                        on(event, fn, context);
                        once(event, fn, context);
                        removeListener(event, fn, once);
                        removeAllListeners(event);
                        off(event, fn, once);
                        addListener(event, fn, context);
                        setMaxListeners();

                    }

                    export class EventEmitter3 {

                        /** == EventEmitter3*/
                        static EventEmitter: Function;
                        /** == EventEmitter3*/
                        static EventEmitter2: Function;
                        /** == EventEmitter3*/
                        static EventEmitter3: Function;
                        _events;
                        listeners(event);
                        emit(event, a1, a2, a3, a4, a5, ...args);
                        on(event, fn, context);
                        once(event, fn, context);
                        removeListener(event, fn, once);
                        removeAllListeners(event);
                        off(event, fn, once);
                        addListener(event, fn, context);
                        setMaxListeners();

                    }


                }

				/** Error new Actions(); 
				RangeError: Maximum call stack size exceeded
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1761:33)
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1767:16)
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1767:16)
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1767:16)
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1767:16)
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1767:16)
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1767:16)
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1767:16)
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1767:16)
    at Actions.action [as _dispatch] (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ro/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:1767:16)
				*/
                export class Actions {

                    getActionIds();
                    _getActionMethodNames(instance);
                    _wrapAction(methodName, ...args);
                    _createActionId(methodName);
                    _dispatch(actionId, body, args, methodName);
                    _dispatchAsync(actionId, promise, args, methodName);

                }


            }


        }

        export module React {

            export class Component {

                constructor(props, context);
                props;
                context;
                setState(partialState, callback);
                forceUpdate(callback);

            }

            export function initializeTouchEvents(shouldUseTouch);
            export function createClass(spec);
            export class createElement {

                constructor(type, props, children, ...args);
                "type";
                key: any;
                ref: any;
                _owner: any;
                _context: any;
                _store: { props: any; originalProps: any; };
                _isReactElement: boolean;
                props: any;

            }

            export function cloneElement(element, props, children, ...args);
            export function createFactory(type);
            export function createMixin(mixin);
            export function constructAndRenderComponent(constructor, props, container);
            export function constructAndRenderComponentByID(constructor, props, id);
            export function findDOMNode(componentOrElement);
            export function render(...args);
            export function renderToString(element);
            export function renderToStaticMarkup(element);
            export function unmountComponentAtNode(container);
            export function isValidElement(object);
            export function withContext(newContext, scopedCallback);
            export function __spread(target, sources, ...args);
            export var version: string;
            export module Children {

                export function map(children, func, context);
                export function forEach(children, forEachFunc, forEachContext);
                export function count(children, context);
                export function only(children);

            }

            export module DOM {

                export function a();
                export function abbr();
                export function address();
                export function area();
                export function article();
                export function aside();
                export function audio();
                export function b();
                export function base();
                export function bdi();
                export function bdo();
                export function big();
                export function blockquote();
                export function body();
                export function br();
                export function button();
                export function canvas();
                export function caption();
                export function cite();
                export function code();
                export function col();
                export function colgroup();
                export function data();
                export function datalist();
                export function dd();
                export function del();
                export function details();
                export function dfn();
                export function dialog();
                export function div();
                export function dl();
                export function dt();
                export function em();
                export function embed();
                export function fieldset();
                export function figcaption();
                export function figure();
                export function footer();
                export function form();
                export function h1();
                export function h2();
                export function h3();
                export function h4();
                export function h5();
                export function h6();
                export function head();
                export function header();
                export function hr();
                export function html();
                export function i();
                export function iframe();
                export function img();
                export function input();
                export function ins();
                export function kbd();
                export function keygen();
                export function label();
                export function legend();
                export function li();
                export function link();
                export function main();
                export function map();
                export function mark();
                export function menu();
                export function menuitem();
                export function meta();
                export function meter();
                export function nav();
                export function noscript();
                export function object();
                export function ol();
                export function optgroup();
                export function option();
                export function output();
                export function p();
                export function param();
                export function picture();
                export function pre();
                export function progress();
                export function q();
                export function rp();
                export function rt();
                export function ruby();
                export function s();
                export function samp();
                export function script();
                export function section();
                export function select();
                export function small();
                export function source();
                export function span();
                export function strong();
                export function style();
                export function sub();
                export function summary();
                export function sup();
                export function table();
                export function tbody();
                export function td();
                export function textarea();
                export function tfoot();
                export function th();
                export function thead();
                export function time();
                export function title();
                export function tr();
                export function track();
                export function u();
                export function ul();
                export function video();
                export function wbr();
                export function circle();
                export function clipPath();
                export function defs();
                export function ellipse();
                export function g();
                export function line();
                export function linearGradient();
                export function mask();
                export function path();
                export function pattern();
                export function polygon();
                export function polyline();
                export function radialGradient();
                export function rect();
                export function stop();
                export function svg();
                export function text();
                export function tspan();

            }

            export module PropTypes {

                export function array();
                export function bool();
                export function func();
                export function object();
                export class arrayOf {

                    constructor(typeChecker);
                    isRequired();

                }

                export function element();
                export class instanceOf {

                    constructor(expectedClass);
                    isRequired();

                }

                export function node();
                export class objectOf {

                    constructor(typeChecker);
                    isRequired();

                }

                export class oneOf {

                    constructor(expectedValues);
                    isRequired();

                }

                export class oneOfType {

                    constructor(arrayOfTypeCheckers);
                    isRequired();

                }

                export class shape {

                    constructor(shapeTypes);
                    isRequired();

                }


            }

            export module addons {

                export class CSSTransitionGroup {

                    static displayName: string;
                    static defaultProps: { transitionAppear: boolean; transitionEnter: boolean; transitionLeave: boolean; };
                    constructor(props, context);
                    getDOMNode();
                    _wrapChild();
                    props;
                    context;
                    state: any;
                    __reactAutoBindMap: { getDOMNode: Function; _wrapChild: Function; };
                    render();
                    mixins: any;
                    statics: any;
                    propTypes: any;
                    contextTypes: any;
                    childContextTypes: any;
                    getDefaultProps: any;
                    getInitialState: any;
                    getChildContext: any;
                    componentWillMount: any;
                    componentDidMount: any;
                    componentWillReceiveProps: any;
                    shouldComponentUpdate: any;
                    componentWillUpdate: any;
                    componentDidUpdate: any;
                    componentWillUnmount: any;
                    updateComponent: any;
                    setState(partialState, callback);
                    forceUpdate(callback);
                    replaceState(newState, callback);
                    isMounted();
                    setProps(partialProps, callback);
                    replaceProps(newProps, callback);

                }

                export module CSSTransitionGroup {

                    export class getDefaultProps {

                        static isReactClassApproved: any;
                        transitionAppear: boolean;
                        transitionEnter: boolean;
                        transitionLeave: boolean;

                    }

                    export module propTypes {

                        export function transitionName();
                        export function transitionAppear();
                        export function transitionEnter();
                        export function transitionLeave();

                    }


                }

				/** Error new TransitionGroup(); 
				TypeError: Cannot read property 'children' of undefined
    at React.createClass.getInitialState (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…o/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:22226:71)
    at new Constructor (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…o/JavaScript/TypeScriptUtils/TypeScriptUtils/libs/nodejs/react.js:12403:54)
    at js2tsClass.writeClass (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:260:36)
    at js2tsClass.writeSubElements (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:223:42)
    at js2tsClass.writeModule (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…cript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:40:48)
    at js2tsClass.writeModules (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:253:30)
    at js2tsClass.writeModule (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…cript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:42:35)
    at js2tsClass.writeModules (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:253:30)
    at js2tsClass.writeModule (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…cript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:42:35)
    at js2tsClass.writeModules (http://localhost:60986/referenceFile?path=~/../../../../../../../_SVN/remot…ript/TypeScriptUtils/TypeScriptUtils/mika/utils/Converters/js2ts.js:253:30)
				*/
                export class TransitionGroup {

                    static displayName: string;
                    constructor(props, context);
                    __reactAutoBindMap: { getDOMNode: Function; performAppear: Function; _handleDoneAppearing: Function; performEnter: Function; _handleDoneEntering: Function; performLeave: Function; _handleDoneLeaving: Function; };
                    getDOMNode();
                    getInitialState();
                    componentWillMount();
                    componentDidMount();
                    componentWillReceiveProps(nextProps);
                    componentDidUpdate();
                    performAppear(key);
                    _handleDoneAppearing(key);
                    performEnter(key);
                    _handleDoneEntering(key);
                    performLeave(key);
                    _handleDoneLeaving(key);
                    render();
                    mixins: any;
                    statics: any;
                    propTypes: any;
                    contextTypes: any;
                    childContextTypes: any;
                    getDefaultProps: any;
                    getChildContext: any;
                    shouldComponentUpdate: any;
                    componentWillUpdate: any;
                    componentWillUnmount: any;
                    updateComponent: any;
                    setState(partialState, callback);
                    forceUpdate(callback);
                    replaceState(newState, callback);
                    isMounted();
                    setProps(partialProps, callback);
                    replaceProps(newProps, callback);

                }

                export module TransitionGroup {

                    export class getDefaultProps {

                        static isReactClassApproved: any;
                        component: string;
                        childFactory(arg);

                    }

                    export module propTypes {

                        export function component();
                        export function childFactory();

                    }

                    export module defaultProps {

                        export var component: string;
                        export function childFactory(arg);

                    }


                }

                export function batchedUpdates(callback, a, b, c, d);
                export function classSet(classNames, ...args);
                export function cloneWithProps(child, props);
                export function createFragment(object);
                export function update(value, spec);
                export module LinkedStateMixin {

                    export function linkState(key);

                }

                export module PureRenderMixin {

                    export function shouldComponentUpdate(nextProps, nextState);

                }

                export module Perf {

                    export var _allMeasurements: any[];
                    export var _mountStack: number[];
                    export var _injected: boolean;
                    export function start();
                    export function stop();
                    export class getLastMeasurements {

                        clone(deep);
                        addArray(array);
                        fill(value, startIndex, count);
                        copyOf(index, count);
                        copyTo(dest, srcIndex, srcCount, dstIndex);
                        binarySearch(item, comparator, startIndex, length);
                        get(index);
                        set(index, value);
                        insert(index, item);
                        removeAt(index);
                        toArray();
                        add(item);
                        remove(item);
                        size();
                        contains(item);
                        clear();
                        iterator();

                    }

                    export function printExclusive(measurements);
                    export function printInclusive(measurements);
                    export function getMeasurementsSummaryMap(measurements);
                    export function printWasted(measurements);
                    export function printDOM(measurements);
                    export function _recordWrite(id, fnName, totalTime, args);
                    export function measure(moduleName, fnName, func, ...args);

                }

                export module TestUtils {

                    export function renderIntoDocument(instance);
                    export function isElement(element);
                    export function isElementOfType(inst, convenienceConstructor);
                    export function isDOMComponent(inst);
                    export function isDOMComponentElement(inst);
                    export function isCompositeComponent(inst);
                    export function isCompositeComponentWithType(inst, type);
                    export function isCompositeComponentElement(inst);
                    export function isCompositeComponentElementWithType(inst, type);
                    export function getRenderedChildOfCompositeComponent(inst);
                    export class findAllInRenderedTree {

                        constructor(inst, test);
                        clone(deep);
                        addArray(array);
                        fill(value, startIndex, count);
                        copyOf(index, count);
                        copyTo(dest, srcIndex, srcCount, dstIndex);
                        binarySearch(item, comparator, startIndex, length);
                        get(index);
                        set(index, value);
                        insert(index, item);
                        removeAt(index);
                        toArray();
                        add(item);
                        remove(item);
                        size();
                        contains(item);
                        clear();
                        iterator();

                    }

                    export class scryRenderedDOMComponentsWithClass {

                        constructor(root, className);
                        clone(deep);
                        addArray(array);
                        fill(value, startIndex, count);
                        copyOf(index, count);
                        copyTo(dest, srcIndex, srcCount, dstIndex);
                        binarySearch(item, comparator, startIndex, length);
                        get(index);
                        set(index, value);
                        insert(index, item);
                        removeAt(index);
                        toArray();
                        add(item);
                        remove(item);
                        size();
                        contains(item);
                        clear();
                        iterator();

                    }

                    export function findRenderedDOMComponentWithClass(root, className);
                    export class scryRenderedDOMComponentsWithTag {

                        constructor(root, tagName);
                        clone(deep);
                        addArray(array);
                        fill(value, startIndex, count);
                        copyOf(index, count);
                        copyTo(dest, srcIndex, srcCount, dstIndex);
                        binarySearch(item, comparator, startIndex, length);
                        get(index);
                        set(index, value);
                        insert(index, item);
                        removeAt(index);
                        toArray();
                        add(item);
                        remove(item);
                        size();
                        contains(item);
                        clear();
                        iterator();

                    }

                    export function findRenderedDOMComponentWithTag(root, tagName);
                    export class scryRenderedComponentsWithType {

                        constructor(root, componentType);
                        clone(deep);
                        addArray(array);
                        fill(value, startIndex, count);
                        copyOf(index, count);
                        copyTo(dest, srcIndex, srcCount, dstIndex);
                        binarySearch(item, comparator, startIndex, length);
                        get(index);
                        set(index, value);
                        insert(index, item);
                        removeAt(index);
                        toArray();
                        add(item);
                        remove(item);
                        size();
                        contains(item);
                        clear();
                        iterator();

                    }

                    export function findRenderedComponentWithType(root, componentType);
                    export function mockComponent(module, mockTagName);
                    export function simulateNativeEventOnNode(topLevelType, node, fakeNativeEvent);
                    export function simulateNativeEventOnDOMComponent(topLevelType, comp, fakeNativeEvent);
                    export class nativeTouchData {

                        constructor(x, y);
                        touches: { pageX; pageY; }[];

                    }

                    export class createRenderer {

                        _instance: any;
                        getRenderOutput();
                        render(element, context);
                        unmount();
                        _render(element, transaction, context);

                    }

                    export module Simulate {

                        export function blur(domComponentOrNode, eventData);
                        export function click(domComponentOrNode, eventData);
                        export function contextMenu(domComponentOrNode, eventData);
                        export function copy(domComponentOrNode, eventData);
                        export function cut(domComponentOrNode, eventData);
                        export function doubleClick(domComponentOrNode, eventData);
                        export function drag(domComponentOrNode, eventData);
                        export function dragEnd(domComponentOrNode, eventData);
                        export function dragEnter(domComponentOrNode, eventData);
                        export function dragExit(domComponentOrNode, eventData);
                        export function dragLeave(domComponentOrNode, eventData);
                        export function dragOver(domComponentOrNode, eventData);
                        export function dragStart(domComponentOrNode, eventData);
                        export function drop(domComponentOrNode, eventData);
                        export function focus(domComponentOrNode, eventData);
                        export function input(domComponentOrNode, eventData);
                        export function keyDown(domComponentOrNode, eventData);
                        export function keyPress(domComponentOrNode, eventData);
                        export function keyUp(domComponentOrNode, eventData);
                        export function load(domComponentOrNode, eventData);
                        export function error(domComponentOrNode, eventData);
                        export function mouseDown(domComponentOrNode, eventData);
                        export function mouseMove(domComponentOrNode, eventData);
                        export function mouseOut(domComponentOrNode, eventData);
                        export function mouseOver(domComponentOrNode, eventData);
                        export function mouseUp(domComponentOrNode, eventData);
                        export function paste(domComponentOrNode, eventData);
                        export function reset(domComponentOrNode, eventData);
                        export function scroll(domComponentOrNode, eventData);
                        export function submit(domComponentOrNode, eventData);
                        export function touchCancel(domComponentOrNode, eventData);
                        export function touchEnd(domComponentOrNode, eventData);
                        export function touchMove(domComponentOrNode, eventData);
                        export function touchStart(domComponentOrNode, eventData);
                        export function wheel(domComponentOrNode, eventData);
                        export function mouseEnter(domComponentOrNode, eventData);
                        export function mouseLeave(domComponentOrNode, eventData);
                        export function change(domComponentOrNode, eventData);
                        export function select(domComponentOrNode, eventData);
                        export function beforeInput(domComponentOrNode, eventData);
                        export function compositionEnd(domComponentOrNode, eventData);
                        export function compositionStart(domComponentOrNode, eventData);
                        export function compositionUpdate(domComponentOrNode, eventData);

                    }

                    export module SimulateNative {

                        export function blur(domComponentOrNode, nativeEventData);
                        export function change(domComponentOrNode, nativeEventData);
                        export function click(domComponentOrNode, nativeEventData);
                        export function compositionEnd(domComponentOrNode, nativeEventData);
                        export function compositionStart(domComponentOrNode, nativeEventData);
                        export function compositionUpdate(domComponentOrNode, nativeEventData);
                        export function contextMenu(domComponentOrNode, nativeEventData);
                        export function copy(domComponentOrNode, nativeEventData);
                        export function cut(domComponentOrNode, nativeEventData);
                        export function doubleClick(domComponentOrNode, nativeEventData);
                        export function drag(domComponentOrNode, nativeEventData);
                        export function dragEnd(domComponentOrNode, nativeEventData);
                        export function dragEnter(domComponentOrNode, nativeEventData);
                        export function dragExit(domComponentOrNode, nativeEventData);
                        export function dragLeave(domComponentOrNode, nativeEventData);
                        export function dragOver(domComponentOrNode, nativeEventData);
                        export function dragStart(domComponentOrNode, nativeEventData);
                        export function drop(domComponentOrNode, nativeEventData);
                        export function error(domComponentOrNode, nativeEventData);
                        export function focus(domComponentOrNode, nativeEventData);
                        export function input(domComponentOrNode, nativeEventData);
                        export function keyDown(domComponentOrNode, nativeEventData);
                        export function keyPress(domComponentOrNode, nativeEventData);
                        export function keyUp(domComponentOrNode, nativeEventData);
                        export function load(domComponentOrNode, nativeEventData);
                        export function mouseDown(domComponentOrNode, nativeEventData);
                        export function mouseMove(domComponentOrNode, nativeEventData);
                        export function mouseOut(domComponentOrNode, nativeEventData);
                        export function mouseOver(domComponentOrNode, nativeEventData);
                        export function mouseUp(domComponentOrNode, nativeEventData);
                        export function paste(domComponentOrNode, nativeEventData);
                        export function reset(domComponentOrNode, nativeEventData);
                        export function scroll(domComponentOrNode, nativeEventData);
                        export function selectionChange(domComponentOrNode, nativeEventData);
                        export function submit(domComponentOrNode, nativeEventData);
                        export function textInput(domComponentOrNode, nativeEventData);
                        export function touchCancel(domComponentOrNode, nativeEventData);
                        export function touchEnd(domComponentOrNode, nativeEventData);
                        export function touchMove(domComponentOrNode, nativeEventData);
                        export function touchStart(domComponentOrNode, nativeEventData);
                        export function wheel(domComponentOrNode, nativeEventData);

                    }


                }


            }


        }

        export module Router {

            export class DefaultRoute {

                constructor(...args);
                props;
                context;
                setState(partialState, callback);
                forceUpdate(callback);

            }

            export module DefaultRoute {

                export module propTypes {

                    export function path(props, propName, componentName);
                    export function children(props, propName, componentName);
                    export function handler();

                }

                export module defaultProps {

                    export class handler {

                        constructor(...args);
                        props;
                        context;
                        setState(partialState, callback);
                        forceUpdate(callback);

                    }

                    export module handler {

                        export module contextTypes {

                            export function routeDepth();
                            export function router();

                        }

                        export module childContextTypes {

                            export function routeDepth();

                        }


                    }


                }


            }

            export class Link {

                static defaultProps: { activeClassName: string; className: string; };
                constructor(...args);
                props;
                context;
                setState(partialState, callback);
                forceUpdate(callback);

            }

            export module Link {

                export module contextTypes {

                    export function router();

                }

                export module propTypes {

                    export function activeClassName();
                    export function to();
                    export function params();
                    export function query();
                    export function activeStyle();
                    export function onClick();

                }


            }

            export class NotFoundRoute {

                constructor(...args);
                props;
                context;
                setState(partialState, callback);
                forceUpdate(callback);

            }

            export module NotFoundRoute {

                export module propTypes {

                    export function path(props, propName, componentName);
                    export function children(props, propName, componentName);
                    export function handler();

                }

                export module defaultProps {

                    export class handler {

                        constructor(...args);
                        props;
                        context;
                        setState(partialState, callback);
                        forceUpdate(callback);

                    }

                    export module handler {

                        export module contextTypes {

                            export function routeDepth();
                            export function router();

                        }

                        export module childContextTypes {

                            export function routeDepth();

                        }


                    }


                }


            }

            export class Redirect {

                static defaultProps: any;
                constructor(...args);
                props;
                context;
                setState(partialState, callback);
                forceUpdate(callback);

            }

            export module Redirect {

                export module propTypes {

                    export function path();
                    export function from();
                    export function to();
                    export function handler(props, propName, componentName);

                }


            }

            export class Route {

                constructor(...args);
                props;
                context;
                setState(partialState, callback);
                forceUpdate(callback);

            }

            export module Route {

                export module propTypes {

                    export function path();
                    export function handler();
                    export function ignoreScrollBehavior();

                }

                export module defaultProps {

                    export class handler {

                        constructor(...args);
                        props;
                        context;
                        setState(partialState, callback);
                        forceUpdate(callback);

                    }

                    export module handler {

                        export module contextTypes {

                            export function routeDepth();
                            export function router();

                        }

                        export module childContextTypes {

                            export function routeDepth();

                        }


                    }


                }


            }

            export class ActiveHandler {

                constructor(...args);
                props;
                context;
                setState(partialState, callback);
                forceUpdate(callback);

            }

            export module ActiveHandler {

                export module contextTypes {

                    export function routeDepth();
                    export function router();

                }

                export module childContextTypes {

                    export function routeDepth();

                }


            }

            export class RouteHandler {

                constructor(...args);
                props;
                context;
                setState(partialState, callback);
                forceUpdate(callback);

            }

            export module RouteHandler {

                export module contextTypes {

                    export function routeDepth();
                    export function router();

                }

                export module childContextTypes {

                    export function routeDepth();

                }


            }

            export class StaticLocation {

                constructor(path);
                path;
                push();
                replace();
                pop();

            }

            export class TestLocation {

                constructor(history);
                history: any[];
                listeners: any[];

            }

            export class createRoute {

                constructor(options, callback);
                path: string;
                paramNames: any[];
                ignoreScrollBehavior: boolean;
                isDefault: boolean;
                isNotFound: boolean;
                onEnter;
                onLeave;
                handler;

            }

            export class createDefaultRoute {

                constructor(options);
                path: string;
                paramNames: any[];
                ignoreScrollBehavior: boolean;
                isDefault: boolean;
                isNotFound: boolean;
                onEnter;
                onLeave;
                handler;

            }

            export class createNotFoundRoute {

                constructor(options);
                path: string;
                paramNames: string[];
                ignoreScrollBehavior: boolean;
                isDefault: boolean;
                isNotFound: boolean;
                onEnter;
                onLeave;
                handler;

            }

            export function createRedirect(options);
            export class createRoutesFromReactChildren {

                constructor(children);
                clone(deep);
                addArray(array);
                fill(value, startIndex, count);
                copyOf(index, count);
                copyTo(dest, srcIndex, srcCount, dstIndex);
                binarySearch(item, comparator, startIndex, length);
                get(index);
                set(index, value);
                insert(index, item);
                removeAt(index);
                toArray();
                add(item);
                remove(item);
                size();
                contains(item);
                clear();
                iterator();

            }

            export class create {

                constructor(options, ...args);
                recordScrollPosition(path);
                getScrollPosition(path);
                displayName: string;
                isRunning: boolean;
                cancelPendingTransition();
                clearAllRoutes();
                addRoutes(routes);
                replaceRoutes(routes);
                match(path);
                makePath(to, params, query);
                makeHref(to, params, query);
                transitionTo(to, params, query);
                replaceWith(to, params, query);
                goBack();
                handleAbort(abortReason);
                handleError(error);
                handleLocationChange(change);
                dispatch(path, action);
                run(callback);
                refresh();
                stop();
                getLocation();
                getScrollBehavior();
                getRouteAtDepth(routeDepth);
                setRouteComponentAtDepth(routeDepth, component);
                getCurrentPath();
                getCurrentPathname();
                getCurrentParams();
                getCurrentQuery();
                getCurrentRoutes();
                isActive(to, params, query);
                propTypes: { children: Function; };
                childContextTypes: { routeDepth: Function; router: Function; };
                namedRoutes: any;
                routes: any[];

            }

            export function run(routes, location, callback);
            export module HashLocation {

                export function addChangeListener(listener);
                export function removeChangeListener(listener);
                export function push(path);
                export function replace(path);
                export function pop();
                export function getCurrentPath();

            }

            export module HistoryLocation {

                export function addChangeListener(listener);
                export function removeChangeListener(listener);
                export function push(path);
                export function replace(path);
                export function pop();
                export function getCurrentPath();

            }

            export module RefreshLocation {

                export function push(path);
                export function replace(path);
                export function pop();
                export function getCurrentPath();

            }

            export module ImitateBrowserBehavior {

                export function updateScrollPosition(position, actionType);

            }

            export module ScrollToTopBehavior {

                export function updateScrollPosition();

            }

            export module History {

                export function back();

            }

            export module Navigation {

                export function makePath(to, params, query);
                export function makeHref(to, params, query);
                export function transitionTo(to, params, query);
                export function replaceWith(to, params, query);
                export function goBack();
                export module contextTypes {

                    export function router();

                }


            }

            export module State {

                export function getPath();
                export function getPathname();
                export function getParams();
                export function getQuery();
                export function getRoutes();
                export function isActive(to, params, query);
                export module contextTypes {

                    export function router();

                }


            }


        }


    }

    export module url {

        export function parse(url, parseQueryString, slashesDenoteHost);
        export function resolve(source, relative);
        export function resolveObject(source, relative);
        export function format(obj);
        export class Url {

            protocol: any;
            slashes: any;
            auth: any;
            host: any;
            port: any;
            hostname: any;
            hash: any;
            search: any;
            query: any;
            pathname: any;
            path: any;
            href: any;
            parse(url, parseQueryString, slashesDenoteHost);
            format();
            resolve(relative);
            resolveObject(relative);
            parseHost();

        }


    }


}

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var App;
(function (App) {
    var Utils;
    (function (Utils) {
        var NodeJS;
        (function (NodeJS) {
            var Events;
            (function (Events) {
                function isNumber(arg) {
                    return typeof arg === 'number';
                }
                function isObject(arg) {
                    return typeof arg === 'object' && arg !== null;
                }
                function isUndefined(arg) {
                    return arg === void 0;
                }
                function isFunction(arg) {
                    return typeof arg === 'function';
                }
                var EventEmitter = (function () {
                    function EventEmitter() {
                        this._maxListeners = undefined;
                        this._events = undefined;
                        this.on = this.addListener;
                        this._events = this._events || {};
                        this._maxListeners = this._maxListeners || undefined;
                    }
                    // Obviously not all Emitters should be limited to 10. This function allows
                    // that to be increased. Set to zero for unlimited.
                    EventEmitter.prototype.setMaxListeners = function (n) {
                        if (!isNumber(n) || n < 0 || isNaN(n))
                            throw TypeError('n must be a positive number');
                        this._maxListeners = n;
                        return this;
                    };
                    EventEmitter.prototype.emit = function ($type) {
                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args[_i - 1] = arguments[_i];
                        }
                        var er, len, i, listeners;
                        if (!this._events)
                            this._events = {};
                        // If there is no 'error' event listener then throw.
                        if ($type === 'error') {
                            if (!this._events.error || (isObject(this._events.error) && !this._events.error.length)) {
                                er = args[0];
                                if (er instanceof Error)
                                    throw er; // Unhandled 'error' event
                                throw TypeError('Uncaught, unspecified "error" event.');
                            }
                        }
                        var handler = this._events[$type];
                        if (isUndefined(handler))
                            return false;
                        if (isFunction(handler)) {
                            switch (args.length) {
                                case 0:
                                    handler.call(this);
                                    break;
                                case 1:
                                    handler.call(this, args[0]);
                                    break;
                                case 2:
                                    handler.call(this, args[0], args[1]);
                                    break;
                                default:
                                    handler.apply(this, args);
                            }
                        }
                        else if (isObject(handler)) {
                            listeners = handler.slice();
                            len = listeners.length;
                            for (i = 0; i < len; i++)
                                listeners[i].apply(this, args);
                        }
                        return true;
                    };
                    EventEmitter.prototype.addListener = function ($type, listener) {
                        var m;
                        if (!isFunction(listener))
                            throw TypeError('listener must be a function');
                        if (!this._events)
                            this._events = {};
                        // To avoid recursion in the case that $type === "newListener"! Before
                        // adding it to the listeners, first emit "newListener".
                        if (this._events.newListener) {
                            this.emit('newListener', $type, isFunction(listener.listener) ? listener.listener : listener);
                        }
                        if (!this._events[$type])
                            // Optimize the case of one listener. Don't need the extra array object.
                            this._events[$type] = listener;
                        else if (isObject(this._events[$type]))
                            // If we've already got an array, just append.
                            this._events[$type].push(listener);
                        else
                            // Adding the second element, need to change to array.
                            this._events[$type] = [this._events[$type], listener];
                        // Check for listener leak
                        if (isObject(this._events[$type]) && !this._events[$type].warned) {
                            if (!isUndefined(this._maxListeners))
                                m = this._maxListeners;
                            else {
                                m = EventEmitter.defaultMaxListeners;
                            }
                            if (m && m > 0 && this._events[$type].length > m) {
                                this._events[$type].warned = true;
                                console.error('(node) warning: possible EventEmitter memory ' + 'leak detected. %d listeners added. ' + 'Use emitter.setMaxListeners() to increase limit.', this._events[$type].length);
                                if (typeof console.trace === 'function') {
                                    // not supported in IE 10
                                    console.trace();
                                }
                            }
                        }
                        return this;
                    };
                    EventEmitter.prototype.once = function ($type, listener) {
                        if (!isFunction(listener))
                            throw TypeError('listener must be a function');
                        var fired = false;
                        var self = this;
                        function g() {
                            self.removeListener($type, g);
                            if (!fired) {
                                fired = true;
                                listener.apply(self, arguments);
                            }
                        }
                        g.listener = listener;
                        this.on($type, g);
                        return this;
                    };
                    // emits a 'removeListener' event iff the listener was removed
                    EventEmitter.prototype.removeListener = function ($type, listener) {
                        var position, i;
                        if (!isFunction(listener))
                            throw TypeError('listener must be a function');
                        if (!this._events || !this._events[$type])
                            return this;
                        var list = this._events[$type];
                        var length = list.length;
                        position = -1;
                        if (list === listener || (isFunction(list.listener) && list.listener === listener)) {
                            delete this._events[$type];
                            if (this._events.removeListener)
                                this.emit('removeListener', $type, listener);
                        }
                        else if (isObject(list)) {
                            for (i = length; i-- > 0;) {
                                if (list[i] === listener || (list[i].listener && list[i].listener === listener)) {
                                    position = i;
                                    break;
                                }
                            }
                            if (position < 0)
                                return this;
                            if (list.length === 1) {
                                list.length = 0;
                                delete this._events[$type];
                            }
                            else
                                list.splice(position, 1);
                            if (this._events.removeListener)
                                this.emit('removeListener', $type, listener);
                        }
                        return this;
                    };
                    EventEmitter.prototype.removeAllListeners = function ($type) {
                        var key;
                        var events = this._events;
                        if (!events)
                            return this;
                        // not listening for removeListener, no need to emit
                        if (!events.removeListener) {
                            if (arguments.length === 0)
                                this._events = {};
                            else if (events[$type])
                                delete events[$type];
                            return this;
                        }
                        // emit removeListener for all listeners on all events
                        if (arguments.length === 0) {
                            for (key in events) {
                                if (events.hasOwnProperty(key)) {
                                    if (key === 'removeListener')
                                        continue;
                                    this.removeAllListeners(key);
                                }
                            }
                            this.removeAllListeners('removeListener');
                            this._events = {};
                            return this;
                        }
                        var listeners = events[$type];
                        if (isFunction(listeners))
                            this.removeListener($type, listeners);
                        else {
                            while (listeners.length)
                                this.removeListener($type, listeners[listeners.length - 1]);
                        }
                        delete events[$type];
                        return this;
                    };
                    EventEmitter.prototype.listeners = function ($type) {
                        var ret;
                        if (!this._events || !this._events[$type])
                            ret = [];
                        else if (isFunction(this._events[$type]))
                            ret = [this._events[$type]];
                        else
                            ret = this._events[$type].slice();
                        return ret;
                    };
                    EventEmitter.listenerCount = function (emitter, $type) {
                        var ret;
                        if (!emitter._events || !emitter._events[$type])
                            ret = 0;
                        else if (isFunction(emitter._events[$type]))
                            ret = 1;
                        else
                            ret = emitter._events[$type].length;
                        return ret;
                    };
                    // By default EventEmitters will print a warning if more than 10 listeners are
                    // added to it. This is a useful default which helps finding memory leaks.
                    EventEmitter.defaultMaxListeners = 10;
                    return EventEmitter;
                })();
                Events.EventEmitter = EventEmitter;
                // Backwards-compat with node 0.10.x
                EventEmitter.EventEmitter = EventEmitter;
            })(Events = NodeJS.Events || (NodeJS.Events = {}));
        })(NodeJS = Utils.NodeJS || (Utils.NodeJS = {}));
    })(Utils = App.Utils || (App.Utils = {}));
})(App || (App = {}));
//# sourceMappingURL=events.js.map
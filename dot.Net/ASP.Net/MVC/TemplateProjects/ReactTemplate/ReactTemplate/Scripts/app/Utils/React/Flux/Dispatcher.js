/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * @typechecks
 */
///<reference path="invariant.ts"/>
"use strict";
var App;
(function (App) {
    var Utils;
    (function (Utils) {
        var React;
        (function (React) {
            var Flux;
            (function (Flux) {
                var Dispatcher = (function () {
                    function Dispatcher() {
                        this._lastID = 1;
                        this._prefix = 'ID_';
                        this.$Dispatcher_callbacks = {};
                        this.$Dispatcher_isPending = {};
                        this.$Dispatcher_isHandled = {};
                        this.$Dispatcher_isDispatching = false;
                        this.$Dispatcher_pendingPayload = null;
                    }
                    /**
                    * Clear bookkeeping used for dispatching.
                    *
                    * @internal
                    */
                    Dispatcher.prototype.$Dispatcher_stopDispatching = function () {
                        this.$Dispatcher_pendingPayload = null;
                        this.$Dispatcher_isDispatching = false;
                    };
                    /**
                    * Set up bookkeeping needed when dispatching.
                    *
                    * @param {object} payload
                    * @internal
                    */
                    Dispatcher.prototype.$Dispatcher_startDispatching = function (payload) {
                        var dispatcherCallbacks = this.$Dispatcher_callbacks;
                        for (var id in dispatcherCallbacks) {
                            if (dispatcherCallbacks.hasOwnProperty(id)) {
                                this.$Dispatcher_isPending[id] = false;
                                this.$Dispatcher_isHandled[id] = false;
                            }
                        }
                        this.$Dispatcher_pendingPayload = payload;
                        this.$Dispatcher_isDispatching = true;
                    };
                    /**
                    * Call the callback stored with the given id. Also do some internal
                    * bookkeeping.
                    *
                    * @param {string} id
                    * @internal
                    */
                    Dispatcher.prototype.$Dispatcher_invokeCallback = function (id) {
                        this.$Dispatcher_isPending[id] = true;
                        this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
                        this.$Dispatcher_isHandled[id] = true;
                    };
                    /**
                    * Is this Dispatcher currently dispatching.
                    *
                    * @return {boolean}
                    */
                    Dispatcher.prototype.isDispatching = function () {
                        return this.$Dispatcher_isDispatching;
                    };
                    /**
                    * Dispatches a payload to all registered callbacks.
                    *
                    * @param {object} payload
                    */
                    Dispatcher.prototype.dispatch = function (payload) {
                        Flux.invariant(!this.$Dispatcher_isDispatching, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
                        this.$Dispatcher_startDispatching(payload);
                        try {
                            var dispatcherCallbacks = this.$Dispatcher_callbacks;
                            for (var id in dispatcherCallbacks) {
                                if (dispatcherCallbacks.hasOwnProperty(id)) {
                                    if (this.$Dispatcher_isPending[id])
                                        continue;
                                    this.$Dispatcher_invokeCallback(id);
                                }
                            }
                        }
                        finally {
                            this.$Dispatcher_stopDispatching();
                        }
                    };
                    /**
                    * Waits for the callbacks specified to be invoked before continuing execution
                    * of the current callback. This method should only be used by a callback in
                    * response to a dispatched payload.
                    *
                    * @param {array<string>} ids
                    */
                    Dispatcher.prototype.waitFor = function (ids) {
                        Flux.invariant(this.$Dispatcher_isDispatching, 'Dispatcher.waitFor(...): Must be invoked while dispatching.');
                        for (var ii = 0; ii < ids.length; ii++) {
                            var id = ids[ii];
                            if (this.$Dispatcher_isPending[id]) {
                                Flux.invariant(this.$Dispatcher_isHandled[id], 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id);
                                continue;
                            }
                            Flux.invariant(this.$Dispatcher_callbacks[id], 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id);
                            this.$Dispatcher_invokeCallback(id);
                        }
                    };
                    /**
                    * Removes a callback based on its token.
                    *
                    * @param {string} id
                    */
                    Dispatcher.prototype.unregister = function (id) {
                        Flux.invariant(this.$Dispatcher_callbacks[id], 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id);
                        delete this.$Dispatcher_callbacks[id];
                    };
                    /**
                    * Registers a callback to be invoked with every dispatched payload. Returns
                    * a token that can be used with `waitFor()`.
                    *
                    * @param {function} callback
                    * @return {string}
                    */
                    Dispatcher.prototype.register = function (callback) {
                        var id = this._prefix + this._lastID++;
                        this.$Dispatcher_callbacks[id] = callback;
                        return id;
                    };
                    return Dispatcher;
                })();
                Flux.Dispatcher = Dispatcher;
            })(Flux = React.Flux || (React.Flux = {}));
        })(React = Utils.React || (Utils.React = {}));
    })(Utils = App.Utils || (App.Utils = {}));
})(App || (App = {}));
//# sourceMappingURL=Dispatcher.js.map
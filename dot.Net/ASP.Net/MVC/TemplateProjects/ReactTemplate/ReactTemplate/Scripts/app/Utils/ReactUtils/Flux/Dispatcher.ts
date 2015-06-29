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

module App.Utils.ReactUtils.Flux { /**
     * Dispatcher is used to broadcast payloads to registered callbacks. This is
     * different from generic pub-sub systems in two ways:
     *
     *   1) Callbacks are not subscribed to particular events. Every payload is
     *      dispatched to every registered callback.
     *   2) Callbacks can be deferred in whole or part until other callbacks have
     *      been executed.
     *
     * For example, consider this hypothetical flight destination form, which
     * selects a default city when a country is selected:
     *
     *   var flightDispatcher = new Dispatcher();
     *
     *   // Keeps track of which country is selected
     *   var CountryStore = {country: null};
     *
     *   // Keeps track of which city is selected
     *   var CityStore = {city: null};
     *
     *   // Keeps track of the base flight price of the selected city
     *   var FlightPriceStore = {price: null}
     *
     * When a user changes the selected city, we dispatch the payload:
     *
     *   flightDispatcher.dispatch({
     *     actionType: 'city-update',
     *     selectedCity: 'paris'
     *   });
     *
     * This payload is digested by `CityStore`:
     *
     *   flightDispatcher.register(function(payload) {
     *     if (payload.actionType === 'city-update') {
     *       CityStore.city = payload.selectedCity;
     *     }
     *   });
     *
     * When the user selects a country, we dispatch the payload:
     *
     *   flightDispatcher.dispatch({
     *     actionType: 'country-update',
     *     selectedCountry: 'australia'
     *   });
     *
     * This payload is digested by both stores:
     *
     *    CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
     *     if (payload.actionType === 'country-update') {
     *       CountryStore.country = payload.selectedCountry;
     *     }
     *   });
     *
     * When the callback to update `CountryStore` is registered, we save a reference
     * to the returned token. Using this token with `waitFor()`, we can guarantee
     * that `CountryStore` is updated before the callback that updates `CityStore`
     * needs to query its data.
     *
     *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
     *     if (payload.actionType === 'country-update') {
     *       // `CountryStore.country` may not be updated.
     *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
     *       // `CountryStore.country` is now guaranteed to be updated.
     *
     *       // Select the default city for the new country
     *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
     *     }
     *   });
     *
     * The usage of `waitFor()` can be chained, for example:
     *
     *   FlightPriceStore.dispatchToken =
     *     flightDispatcher.register(function(payload) {
     *       switch (payload.actionType) {
     *         case 'country-update':
     *           flightDispatcher.waitFor([CityStore.dispatchToken]);
     *           FlightPriceStore.price =
     *             getFlightPriceStore(CountryStore.country, CityStore.city);
     *           break;
     *
     *         case 'city-update':
     *           FlightPriceStore.price =
     *             FlightPriceStore(CountryStore.country, CityStore.city);
     *           break;
     *     }
     *   });
     *
     * The `country-update` payload will be guaranteed to invoke the stores'
     * registered callbacks in order: `CountryStore`, `CityStore`, then
     * `FlightPriceStore`.
     */
   export class Dispatcher {

       private _lastID = 1;
       private _prefix = 'ID_';
       $Dispatcher_pendingPayload;
       $Dispatcher_isDispatching;
       $Dispatcher_isHandled;
       $Dispatcher_isPending;
       $Dispatcher_callbacks;

       constructor() {
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
        $Dispatcher_stopDispatching() {
            this.$Dispatcher_pendingPayload = null;
            this.$Dispatcher_isDispatching = false;
        }

        /**
        * Set up bookkeeping needed when dispatching.
        *
        * @param {object} payload
        * @internal
        */ 
        $Dispatcher_startDispatching(payload) {
            var dispatcherCallbacks = this.$Dispatcher_callbacks;
            for (var id in dispatcherCallbacks) {
                if (dispatcherCallbacks.hasOwnProperty(id)) {
                    this.$Dispatcher_isPending[id] = false;
                    this.$Dispatcher_isHandled[id] = false;
                }
            }
            this.$Dispatcher_pendingPayload = payload;
            this.$Dispatcher_isDispatching = true;
        }

        /**
        * Call the callback stored with the given id. Also do some internal
        * bookkeeping.
        *
        * @param {string} id
        * @internal
        */ 
        $Dispatcher_invokeCallback(id) {
            this.$Dispatcher_isPending[id] = true;
            this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload);
            this.$Dispatcher_isHandled[id] = true;
        }

        /**
        * Is this Dispatcher currently dispatching.
        *
        * @return {boolean}
        */ 
        isDispatching() {
            return this.$Dispatcher_isDispatching;
        }

        /**
        * Dispatches a payload to all registered callbacks.
        *
        * @param {object} payload
        */ 
        dispatch(payload) {
            invariant(
                !this.$Dispatcher_isDispatching,
                'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
            );
            this.$Dispatcher_startDispatching(payload);
            try {
                var dispatcherCallbacks = this.$Dispatcher_callbacks;
                for (var id in dispatcherCallbacks) {
                    if (dispatcherCallbacks.hasOwnProperty(id)) {
                        if (this.$Dispatcher_isPending[id]) continue;
                        this.$Dispatcher_invokeCallback(id);
                    }
                }
            } finally {
                this.$Dispatcher_stopDispatching();
            }
        }

        /**
        * Waits for the callbacks specified to be invoked before continuing execution
        * of the current callback. This method should only be used by a callback in
        * response to a dispatched payload.
        *
        * @param {array<string>} ids
        */ 
        waitFor(ids) {
            invariant(
                this.$Dispatcher_isDispatching,
                'Dispatcher.waitFor(...): Must be invoked while dispatching.'
            );
            for (var ii = 0; ii < ids.length; ii++) {
                var id = ids[ii];
                if (this.$Dispatcher_isPending[id]) {
                    invariant(
                        this.$Dispatcher_isHandled[id],
                        'Dispatcher.waitFor(...): Circular dependency detected while ' +
                        'waiting for `%s`.',
                        id
                    );
                    continue;
                }
                invariant(
                    this.$Dispatcher_callbacks[id],
                    'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
                    id
                );
                this.$Dispatcher_invokeCallback(id);
            }
        }

        /**
        * Removes a callback based on its token.
        *
        * @param {string} id
        */ 
        unregister(id) {
            invariant(
                this.$Dispatcher_callbacks[id],
                'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
                id
            );
            delete this.$Dispatcher_callbacks[id];
        }

        /**
        * Registers a callback to be invoked with every dispatched payload. Returns
        * a token that can be used with `waitFor()`.
        *
        * @param {function} callback
        * @return {string}
        */ 
        register(callback) {
            var id = this._prefix + this._lastID++;
            this.$Dispatcher_callbacks[id] = callback;
            return id;
        }
    } 
}
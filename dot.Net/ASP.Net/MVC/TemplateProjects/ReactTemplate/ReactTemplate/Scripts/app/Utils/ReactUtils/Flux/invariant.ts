/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

module App.Utils.ReactUtils.Flux {

    export function invariant(condition, format, ...args) {
        if (false) {
            if (format === undefined) {
                throw new Error('invariant requires an error message argument');
            }
        }

        if (!condition) {
            var error;
            if (format == undefined) {
                error = new Error(
                    'Minified exception occurred; use the non-minified dev environment ' +
                    'for the full error message and additional helpful warnings.'
                    );
            } else {
                var argIndex = 0;
                error = new Error(
                    'Invariant Violation: ' +
                    format.replace(/%s/g, () => args[argIndex++])
                    );
            }

            error.framesToPop = 1; // we don't care about invariant's own frame
            throw error;
        }
    };
    
}
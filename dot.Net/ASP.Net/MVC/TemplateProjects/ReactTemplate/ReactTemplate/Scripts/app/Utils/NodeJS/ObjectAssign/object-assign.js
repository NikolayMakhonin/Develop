'use strict';
var App;
(function (App) {
    var Utils;
    (function (Utils) {
        var NodeJS;
        (function (NodeJS) {
            var ObjectAssign;
            (function (ObjectAssign) {
                var propIsEnumerable = Object.prototype.propertyIsEnumerable;
                function ToObject(val) {
                    if (val == null) {
                        throw new TypeError('Object.assign cannot be called with null or undefined');
                    }
                    return Object(val);
                }
                function ownEnumerableKeys(obj) {
                    var keys = Object.getOwnPropertyNames(obj);
                    if (Object.getOwnPropertySymbols) {
                        keys = keys.concat(Object.getOwnPropertySymbols(obj));
                    }
                    return keys.filter(function (key) { return propIsEnumerable.call(obj, key); });
                }
                Object.assign = function (target) {
                    var from;
                    var keys;
                    var to = ToObject(target);
                    for (var s = 1; s < arguments.length; s++) {
                        from = arguments[s];
                        keys = ownEnumerableKeys(Object(from));
                        for (var i = 0; i < keys.length; i++) {
                            to[keys[i]] = from[keys[i]];
                        }
                    }
                    return to;
                };
            })(ObjectAssign = NodeJS.ObjectAssign || (NodeJS.ObjectAssign = {}));
        })(NodeJS = Utils.NodeJS || (Utils.NodeJS = {}));
    })(Utils = App.Utils || (App.Utils = {}));
})(App || (App = {}));
//# sourceMappingURL=object-assign.js.map
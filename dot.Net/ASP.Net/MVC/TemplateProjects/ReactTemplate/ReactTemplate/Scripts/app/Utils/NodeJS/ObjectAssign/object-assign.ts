'use strict';

interface Object {
    assign(target, ...sources);
    getOwnPropertySymbols(obj);
}

module App.Utils.NodeJS.ObjectAssign {

    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function ToObject(val) {
        if (val == null) throw new TypeError('Object.assign cannot be called with null or undefined');

        return Object(val);
    }

    function ownEnumerableKeys(obj) {
        var keys = Object.getOwnPropertyNames(obj);

        if (Object.getOwnPropertySymbols) keys = keys.concat(Object.getOwnPropertySymbols(obj));

        return keys.filter(key => propIsEnumerable.call(obj, key));
    }

    // ReSharper disable once Lambda
    Object.assign = function(target) {
        var from;
        var keys;
        var to = ToObject(target);

        for (var s = 1; s < arguments.length; s++) {
            from = arguments[s];
            keys = ownEnumerableKeys(Object(from));

            for (var i = 0; i < keys.length; i++) to[keys[i]] = from[keys[i]];
        }

        return to;
    }
}
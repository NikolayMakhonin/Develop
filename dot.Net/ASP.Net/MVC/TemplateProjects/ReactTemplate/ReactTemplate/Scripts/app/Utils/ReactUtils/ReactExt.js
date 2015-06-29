///<reference path="../../../typings/react/react.d.ts"/>
var App;
(function (App) {
    var Utils;
    (function (Utils) {
        var ReactUtils;
        (function (ReactUtils) {
            var ReactExt;
            (function (ReactExt) {
                function specToObject(spec) {
                    var obj = {};
                    for (var key in spec) {
                        if (!(key in obj)) {
                            obj[key] = spec[key];
                        }
                    }
                    return obj;
                }
                function createClass(spec) {
                    return React.createClass(specToObject(spec));
                }
                ReactExt.createClass = createClass;
            })(ReactExt = ReactUtils.ReactExt || (ReactUtils.ReactExt = {}));
        })(ReactUtils = Utils.ReactUtils || (Utils.ReactUtils = {}));
    })(Utils = App.Utils || (App.Utils = {}));
})(App || (App = {}));
//# sourceMappingURL=ReactExt.js.map
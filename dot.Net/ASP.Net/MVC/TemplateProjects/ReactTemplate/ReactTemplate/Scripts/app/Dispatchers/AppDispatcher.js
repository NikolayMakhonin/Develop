///<reference path="../../typings/TypeScriptUtils.d.ts"/>
var App;
(function (App) {
    var Dispatchers;
    (function (Dispatchers) {
        var QuantizedEventHandler = mika.utils.Async.Events.QuantizedEventHandler;
        var AppDispatcher = (function () {
            function AppDispatcher() {
                this._events = new QuantizedEventHandler();
            }
            AppDispatcher.prototype.events = function () {
                return this._events;
            };
            return AppDispatcher;
        })();
        Dispatchers.AppDispatcher = AppDispatcher;
    })(Dispatchers = App.Dispatchers || (App.Dispatchers = {}));
})(App || (App = {}));
//# sourceMappingURL=AppDispatcher.js.map
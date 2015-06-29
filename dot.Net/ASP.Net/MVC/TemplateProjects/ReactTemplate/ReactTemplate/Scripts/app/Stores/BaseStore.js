///<reference path="../../typings/TypeScriptUtils.d.ts"/>
var App;
(function (App) {
    var Stores;
    (function (Stores) {
        var QuantizedEventHandler = mika.utils.Async.Events.QuantizedEventHandler;
        var BaseStore = (function () {
            function BaseStore() {
                this._changed = new QuantizedEventHandler();
            }
            BaseStore.prototype.changed = function () {
                return this._changed;
            };
            return BaseStore;
        })();
        Stores.BaseStore = BaseStore;
    })(Stores = App.Stores || (App.Stores = {}));
})(App || (App = {}));
//# sourceMappingURL=BaseStore.js.map
///<reference path="../../typings/TypeScriptUtils.d.ts"/>
var App;
(function (App) {
    var Stores;
    (function (Stores) {
        var QuantizedEventHandler = mika.utils.Async.Events.QuantizedEventHandler;
        var DeferredAction = mika.utils.Threads.DeferredAction;
        var BaseStore = (function () {
            function BaseStore() {
                this._changed = new QuantizedEventHandler();
                this._deferredOnChanged = new DeferredAction([this._onChanged], 100);
            }
            BaseStore.prototype.changed = function () {
                return this._changed;
            };
            BaseStore.prototype._onChanged = function () {
                return this._changed.invoke(this, null);
            };
            BaseStore.prototype.onChanged = function () {
                this._deferredOnChanged.Execute();
            };
            return BaseStore;
        })();
        Stores.BaseStore = BaseStore;
    })(Stores = App.Stores || (App.Stores = {}));
})(App || (App = {}));
//# sourceMappingURL=BaseStore.js.map
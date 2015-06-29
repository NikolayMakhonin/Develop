///<reference path="BaseStore.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var App;
(function (App) {
    var Stores;
    (function (Stores) {
        var BaseListStore = (function (_super) {
            __extends(BaseListStore, _super);
            function BaseListStore() {
                _super.apply(this, arguments);
            }
            BaseListStore.prototype.getItems = function () {
                return this._items;
            };
            return BaseListStore;
        })(Stores.BaseStore);
        Stores.BaseListStore = BaseListStore;
    })(Stores = App.Stores || (App.Stores = {}));
})(App || (App = {}));
//# sourceMappingURL=BaseListStore.js.map
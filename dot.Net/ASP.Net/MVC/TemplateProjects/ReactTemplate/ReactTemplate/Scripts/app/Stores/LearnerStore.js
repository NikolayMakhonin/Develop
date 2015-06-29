///<reference path="BaseListStore.ts"/>
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
        var LearnerStore = (function (_super) {
            __extends(LearnerStore, _super);
            function LearnerStore() {
                _super.apply(this, arguments);
            }
            return LearnerStore;
        })(Stores.BaseStore);
        Stores.LearnerStore = LearnerStore;
    })(Stores = App.Stores || (App.Stores = {}));
})(App || (App = {}));
//# sourceMappingURL=LearnerStore.js.map
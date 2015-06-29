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
        var LearnerListStore = (function (_super) {
            __extends(LearnerListStore, _super);
            function LearnerListStore() {
                _super.apply(this, arguments);
            }
            return LearnerListStore;
        })(Stores.BaseListStore);
        Stores.LearnerListStore = LearnerListStore;
    })(Stores = App.Stores || (App.Stores = {}));
})(App || (App = {}));
//# sourceMappingURL=LearnerListStore.js.map
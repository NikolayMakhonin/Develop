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
        var TodoStore = (function (_super) {
            __extends(TodoStore, _super);
            function TodoStore() {
                _super.apply(this, arguments);
            }
            return TodoStore;
        })(Stores.BaseStore);
        Stores.TodoStore = TodoStore;
    })(Stores = App.Stores || (App.Stores = {}));
})(App || (App = {}));
//# sourceMappingURL=ToDoStore.js.map
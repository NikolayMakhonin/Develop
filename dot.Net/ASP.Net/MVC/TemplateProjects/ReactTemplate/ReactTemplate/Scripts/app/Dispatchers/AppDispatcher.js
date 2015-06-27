///<reference path="../../typings/flux/flux.d.ts"/>
var App;
(function (App) {
    var Dispatchers;
    (function (Dispatchers) {
        var Flux = App.Utils.React.Flux;
        Dispatchers.AppDispatcher = Flux.Dispatcher;
    })(Dispatchers = App.Dispatchers || (App.Dispatchers = {}));
})(App || (App = {}));
//# sourceMappingURL=AppDispatcher.js.map
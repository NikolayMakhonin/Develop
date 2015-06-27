var App;
(function (App) {
    var Api;
    (function (Api) {
        var Utils;
        (function (Utils) {
            var AjaxUtils;
            (function (AjaxUtils) {
                function errorDefaultHandler(xhr, status, error) {
                    console.error(xhr.responseText);
                }
                AjaxUtils.errorDefaultHandler = errorDefaultHandler;
                function successNotHandled(data, status, xhr) {
                    console.error(xhr.responseText);
                }
                AjaxUtils.successNotHandled = successNotHandled;
            })(AjaxUtils = Utils.AjaxUtils || (Utils.AjaxUtils = {}));
        })(Utils = Api.Utils || (Api.Utils = {}));
    })(Api = App.Api || (App.Api = {}));
})(App || (App = {}));
//# sourceMappingURL=ajaxUtils.js.map
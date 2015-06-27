///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="utils/ajaxUtils.ts"/>
var App;
(function (App) {
    var Api;
    (function (Api) {
        var MyApi;
        (function (MyApi) {
            var AjaxUtils = App.Api.Utils.AjaxUtils;
            function getText() {
                return $.ajax({
                    type: "GET",
                    contentType: 'application/json; charset=utf-8',
                    url: "/api/MyApi/getText",
                    data: null,
                    dataType: 'json',
                    crossDomain: true,
                    error: AjaxUtils.errorDefaultHandler
                }).done(AjaxUtils.successNotHandled);
            }
            MyApi.getText = getText;
        })(MyApi = Api.MyApi || (Api.MyApi = {}));
    })(Api = App.Api || (App.Api = {}));
})(App || (App = {}));
//# sourceMappingURL=MyApi.js.map
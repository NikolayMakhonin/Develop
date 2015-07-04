///<reference path="../../typings/TypeScriptUtils.d.ts"/>
//// <reference path="../../../../../../../../../../../_SVN/remote/NetPro/JavaScript/TypeScriptUtils/TypeScriptUtils/mika/datamodel/contracts/IDataBaseAsync.ts" />
//// <reference path="../../../../../../../../../../../_SVN/remote/NetPro/JavaScript/TypeScriptUtils/TypeScriptUtils/mika/datamodel/contracts/IDataBase.ts" />
var App;
(function (App) {
    var Api;
    (function (Api) {
        var StringBuilder = mika.utils.Strings.StringBuilder;
        var AjaxUtils = App.Api.Utils.AjaxUtils; //private static mergeArrays<T>(srcArr: T[], dstArr: T[], notAddIfExists: boolean = true): T[] {
        //    if (dstArr == undefined) return srcArr == undefined ? undefined : srcArr.slice();
        //    if (srcArr == undefined) return dstArr;
        //    var len = srcArr.length;
        //    for (var i = 0; i < len; i++) {
        //        var item = srcArr[i];
        //        if (notAddIfExists && (dstArr.indexOf(item) >= 0)) continue;
        //        dstArr.push(item);
        //    }
        //    return dstArr;
        //}
        //private static mergeStringArrays(srcArr: string[], dstArr: string[], notAddIfExists: boolean = true, ignoreCase: boolean = true): string[] {
        //    if (dstArr == undefined) return srcArr == undefined ? undefined : srcArr.slice();
        //    if (srcArr == undefined) return dstArr;
        //    var len = srcArr.length;
        //    for (var i = 0; i < len; i++) {
        //        var item = srcArr[i].trim();
        //        if (ignoreCase) item = item.toLowerCase();
        //        if (notAddIfExists && (dstArr.indexOf(item) >= 0)) continue;
        //        dstArr.push(item);
        //    }
        //    return dstArr;
        //}
        //constructor(srcParams?: ODataParams[]) {
        //    if (srcParams != undefined) {
        //        this.merge(srcParams);
        //    }    
        //}
        //merge(params: ODataParams[]) {
        //    if (params == undefined) return;
        //    var len = params.length;
        //    for (var i = 0; i < len; i++) {
        //        var oDataParams = params[i];
        //        this.select = ODataParams.mergeStringArrays(this.expand, oDataParams.expand);
        //        this.expand = ODataParams.mergeStringArrays(this.expand, oDataParams.expand);
        //    }
        //}
        //private fillExpand(select: string[], expand: string[]) {
        //    if (select == undefined) return;
        //    var len = select.length;
        //    for (var i = 0; i < len; i++) {
        //        var field = select[i];
        //        if (field.indexOf('/')) {
        //            if ()
        //        }
        //    }
        //}
        var ODataParams = (function () {
            function ODataParams() {
            }
            ODataParams.prototype.toString = function () {
                var sb = new StringBuilder();
                var oDataParams = this;
                for (var key in oDataParams) {
                    if (oDataParams.hasOwnProperty(key)) {
                        var value = oDataParams[key];
                        sb.append(key).append('=');
                        if (value.constructor === Array)
                            sb.append(value.join(','));
                        else
                            sb.append(value.toString());
                    }
                }
                return sb.toString();
            };
            return ODataParams;
        })();
        var BaseApi = (function () {
            function BaseApi() {
            }
            BaseApi.prototype.getText = function () {
                return $.ajax({
                    type: "GET",
                    contentType: 'application/json; charset=utf-8',
                    url: "/api/MyApi/getText",
                    data: null,
                    dataType: 'json',
                    crossDomain: true,
                    error: AjaxUtils.errorDefaultHandler
                }).done(AjaxUtils.successNotHandled);
            };
            return BaseApi;
        })();
        var BaseODataApi = (function () {
            function BaseODataApi(apiUrl) {
                this._apiUrl = apiUrl;
            }
            BaseODataApi.prototype.Add = function (item) {
                throw new Error("Not implemented");
            };
            BaseODataApi.prototype.Remove = function (item) {
                throw new Error("Not implemented");
            };
            BaseODataApi.prototype.Replace = function (item) {
                throw new Error("Not implemented");
            };
            BaseODataApi.prototype.Update = function (item) {
                throw new Error("Not implemented");
            };
            BaseODataApi.prototype.Select = function (query) {
                var requestUrl = [this._apiUrl, "?", query.toString()].join('');
            };
            BaseODataApi.prototype.dispose = function () {
            };
            return BaseODataApi;
        })();
    })(Api = App.Api || (App.Api = {}));
})(App || (App = {}));
//# sourceMappingURL=Learner.js.map
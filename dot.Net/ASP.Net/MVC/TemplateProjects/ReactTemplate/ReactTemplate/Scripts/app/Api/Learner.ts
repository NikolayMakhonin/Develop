///<reference path="../../typings/TypeScriptUtils.d.ts"/>
//// <reference path="../../../../../../../../../../../_SVN/remote/NetPro/JavaScript/TypeScriptUtils/TypeScriptUtils/mika/datamodel/contracts/IDataBaseAsync.ts" />
//// <reference path="../../../../../../../../../../../_SVN/remote/NetPro/JavaScript/TypeScriptUtils/TypeScriptUtils/mika/datamodel/contracts/IDataBase.ts" />
module App.Api {
    //import IDataBaseAsync = mika.datamodel.contracts.IDataBaseAsync;
    import IDataBase = mika.datamodel.contracts.IDataBase;
    import StringBuilder = mika.utils.Strings.StringBuilder;
    import AjaxUtils = App.Api.Utils.AjaxUtils; //private static mergeArrays<T>(srcArr: T[], dstArr: T[], notAddIfExists: boolean = true): T[] {
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


    class ODataParams {
        /** $select=field1,field2 
         * $select=*
         */
        $select: string[];
        /**$select=Name,Products&$expand=Products/Suppliers*/
        $expand: string[];
        /** {@link http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#FilterSystemQueryOption OData Documentation}
         * Logical: 
         * and, or, not
         * eq   ==
         * ne   !=
         * gt   >
         * ge   >=
         * lt   <
         * le   <=
         * 
         * Arithmetic: add, sub, mul, div, mod
         * $filter=Price div 2 gt 4
         * 
         * Grouping: (...)
         * $filter=(Price sub 5) gt 10
         * 
         * String Functions:
         * bool substringof(find, text)
         * bool endswith(text, end)
         * bool startswith(text, start)
         * int length(text)
         * int indexof(text, find)
         * string replace(text, find, replace)
         * string substring(text, pos, length?)
         * string tolower(text)
         * string toupper(text)
         * string trim(text)
         * string concat(text, text)
         * 
         * Date Functions:
         * int year(DateTime)
         * int month(DateTime)
         * int day(DateTime)
         * int hour(DateTime)
         * int minute(DateTime)
         * int second(DateTime)
         * 
         * Math Functions (double|decimal):
         * double round(double)
         * double floor(double)
         * double ceiling(double)
         * 
         * Type Functions:
         * bool IsOf(type)
         * bool IsOf(expression, type)
         * $filter=isof('NorthwindModel.Order')
         * $filter=isof(ShipCountry, 'Edm.String')
         * 
         * Examples:
         * $filter=Address/City eq 'Redmond'
         * $filter=Price le 200 and Price gt 3.5
         * $filter=not endswith(Description,'milk')
         */
        $filter: string;
        /** $orderby=Name desc 
         * $orderby=Name asc
         * $orderby=Name
         */
        $orderby: string[];
        $top: number;
        $skip: number;
        /** $format=json
         * $format=atom */
        $format: string;
        /** Include count of entities to response
         * $inlinecount=allpages
         response: odata.count=11 */
        $inlinecount: string;

        toString() {
            var sb = new StringBuilder();
            var oDataParams = this;
            for (var key in oDataParams) {
                if (oDataParams.hasOwnProperty(key)) {
                    var value = oDataParams[key];
                    sb.append(key).append('=');
                    if (value.constructor === Array) sb.append(value.join(','));
                    else sb.append(value.toString());
                }
            }
            return sb.toString();
        }
    }

    interface IAjaxRequest {
        settings: JQueryAjaxSettings;
        done?: JQueryPromiseCallback<any>;    
        fail?: JQueryPromiseCallback<any>;    
    }

    class BaseApi {
        getText() {
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
    }

    class BaseODataApi<TItem> implements IDataBase<TItem, any, any> {
        private _apiUrl: string;

        constructor(apiUrl: string) {
            this._apiUrl = apiUrl;
        }

        Add(item): boolean { throw new Error("Not implemented"); }

        Remove(item): boolean { throw new Error("Not implemented"); }

        Replace(item): boolean { throw new Error("Not implemented"); }

        Update(item): boolean { throw new Error("Not implemented"); }

        Select(query: ODataParams) {
            var requestUrl = [this._apiUrl, "?", query.toString()].join('');
        }

        dispose() {}
    }
} 
///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="utils/ajaxUtils.ts"/>

module App.Api.MyApi {
    import AjaxUtils = App.Api.Utils.AjaxUtils;

    export function getText() {
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
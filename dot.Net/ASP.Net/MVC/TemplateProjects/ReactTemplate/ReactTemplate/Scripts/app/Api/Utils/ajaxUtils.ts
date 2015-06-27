
module App.Api.Utils.AjaxUtils {
    
    export function errorDefaultHandler(xhr, status, error) {
        console.error(xhr.responseText);
    }

    export function successNotHandled(data, status, xhr) {
        console.error(xhr.responseText);
    }

}
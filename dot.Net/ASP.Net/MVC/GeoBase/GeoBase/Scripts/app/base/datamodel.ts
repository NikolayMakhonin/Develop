module GeoBase.base {
    export class BaseDataModel {

        // Other private operations
        getSecurityHeaders(): { [key: string]: any; } {
            var accessToken = sessionStorage["accessToken"] || localStorage["accessToken"];

            if (accessToken) {
                return { "Authorization": "Bearer " + accessToken };
            }

            return {};
        }
    }
}
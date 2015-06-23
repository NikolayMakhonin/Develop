///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../base/datamodel.ts"/>

module GeoBase.geo {
    import BaseAppDataModel = GeoBase.base.BaseDataModel;

    var geoUrl = "/api/Geo";

    export class GeoDataModel extends BaseAppDataModel {

        // Route operations
        getGeoUrl(id: number): string {
            return geoUrl + "/" + id;
        }

        // Data access operations
        getGeos(area): JQueryXHR {
            return $.ajax(geoUrl, {
                type: "GET",
                data: area,
                headers: this.getSecurityHeaders()
            });
        }

        getGeo(id: number): JQueryXHR {
            return $.ajax(this.getGeoUrl(id), {
                type: "GET",
                headers: this.getSecurityHeaders()
            });
        }

        putGeo(data): JQueryXHR {
            return $.ajax(this.getGeoUrl(data), {
                type: "PUT",
                data: data,
                headers: this.getSecurityHeaders()
            });
        }

        deleteGeo(id): JQueryXHR {
            return $.ajax(this.getGeoUrl(id), {
                type: "DELETE",
                headers: this.getSecurityHeaders()
            });
        }
    }
}

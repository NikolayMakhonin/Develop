///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../base/datamodel.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GeoBase;
(function (GeoBase) {
    var geo;
    (function (geo) {
        var BaseAppDataModel = GeoBase.base.BaseDataModel;
        var geoUrl = "/api/Geo";
        var GeoDataModel = (function (_super) {
            __extends(GeoDataModel, _super);
            function GeoDataModel() {
                _super.apply(this, arguments);
            }
            // Route operations
            GeoDataModel.prototype.getGeoUrl = function (id) {
                return geoUrl + "/" + id;
            };
            // Data access operations
            GeoDataModel.prototype.getGeos = function (area) {
                return $.ajax(geoUrl, {
                    type: "GET",
                    data: area,
                    headers: this.getSecurityHeaders()
                });
            };
            GeoDataModel.prototype.getGeo = function (id) {
                return $.ajax(this.getGeoUrl(id), {
                    type: "GET",
                    headers: this.getSecurityHeaders()
                });
            };
            GeoDataModel.prototype.putGeo = function (data) {
                return $.ajax(this.getGeoUrl(data), {
                    type: "PUT",
                    data: data,
                    headers: this.getSecurityHeaders()
                });
            };
            GeoDataModel.prototype.deleteGeo = function (id) {
                return $.ajax(this.getGeoUrl(id), {
                    type: "DELETE",
                    headers: this.getSecurityHeaders()
                });
            };
            return GeoDataModel;
        })(BaseAppDataModel);
        geo.GeoDataModel = GeoDataModel;
    })(geo = GeoBase.geo || (GeoBase.geo = {}));
})(GeoBase || (GeoBase = {}));
//# sourceMappingURL=_datamodel.js.map
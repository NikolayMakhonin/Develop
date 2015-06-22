function GeoDataModel(app) {
    var self = this,
        // Маршруты
        geoUrl = "/api/Geo";

    // Route operations
    function getGeoUrl(id) {
        return geoUrl + "/" + id;
    }

    // Data access operations
    self.getGeos = function (area) {
        return $.ajax(geoUrl, {
            type: "GET",
            data: area,
            headers: app.getSecurityHeaders()
        });
    };

    self.getGeo = function (id) {
        return $.ajax(getGeoUrl(id), {
            type: "GET",
            headers: app.getSecurityHeaders()
        });
    };

    self.putGeo = function (data) {
        return $.ajax(getGeoUrl(data), {
            type: "PUT",
            data: data,
            headers: app.getSecurityHeaders()
        });
    };

    self.deleteGeo = function (id) {
        return $.ajax(getGeoUrl(id), {
            type: "DELETE",
            headers: app.getSecurityHeaders()
        });
    };
}

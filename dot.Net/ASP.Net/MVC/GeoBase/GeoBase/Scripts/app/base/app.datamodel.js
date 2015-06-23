var GeoBase;
(function (GeoBase) {
    var base;
    (function (base) {
        var BaseDataModel = (function () {
            function BaseDataModel() {
            }
            // Other private operations
            BaseDataModel.prototype.getSecurityHeaders = function () {
                var accessToken = sessionStorage["accessToken"] || localStorage["accessToken"];
                if (accessToken) {
                    return { "Authorization": "Bearer " + accessToken };
                }
                return {};
            };
            return BaseDataModel;
        })();
        base.BaseDataModel = BaseDataModel;
    })(base = GeoBase.base || (GeoBase.base = {}));
})(GeoBase || (GeoBase = {}));
//# sourceMappingURL=app.datamodel.js.map
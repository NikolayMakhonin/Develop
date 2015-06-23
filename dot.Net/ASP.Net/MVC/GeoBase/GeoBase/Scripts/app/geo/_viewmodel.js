///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/knockout/knockout.d.ts"/>
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
        var BaseViewModel = GeoBase.base.BaseViewModel;
        var GeoViewModel = (function (_super) {
            __extends(GeoViewModel, _super);
            function GeoViewModel(dataModel) {
                _super.call(this, dataModel);
            }
            // UI state
            // UI operations
            // Other operations
            GeoViewModel.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            return GeoViewModel;
        })(BaseViewModel);
        geo.GeoViewModel = GeoViewModel;
        geo.instance = new GeoViewModel(new geo.GeoDataModel());
    })(geo = GeoBase.geo || (GeoBase.geo = {}));
})(GeoBase || (GeoBase = {}));
//# sourceMappingURL=_viewmodel.js.map
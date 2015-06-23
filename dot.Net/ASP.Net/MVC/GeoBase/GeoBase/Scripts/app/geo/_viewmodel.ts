///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/knockout/knockout.d.ts"/>
///<reference path="../base/datamodel.ts"/>

module GeoBase.geo {
    import BaseViewModel = GeoBase.base.BaseViewModel;

    export class GeoViewModel extends BaseViewModel<GeoDataModel> {
        constructor(dataModel: GeoDataModel) {
            super(dataModel);
        }

        // UI state

        // UI operations

        // Other operations
        initialize() {
            super.initialize();
        }
    }

    export var instance = new GeoViewModel(new GeoDataModel());
}


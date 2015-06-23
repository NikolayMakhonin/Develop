///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/knockout/knockout.d.ts"/>
///<reference path="datamodel.ts"/>

module GeoBase.base {
    import BaseDataModel = GeoBase.base.BaseDataModel;

    export class BaseViewModel<TDataModel extends BaseDataModel> {
        protected _dataModel: TDataModel;

        constructor(dataModel: TDataModel) {
            this._dataModel = dataModel;
        }

        // Private operations
        protected cleanUpLocation() {
            window.location.hash = "";

            if (typeof (history.pushState) !== "undefined") {
                history.pushState("", document.title, location.pathname);
            }
        }

        protected getFragment(): any {
            if (window.location.hash.indexOf("#") === 0) {
                return this.parseQueryString(window.location.hash.substr(1));
            } else {
                return {};
            }
        }

        protected parseQueryString(queryString): any {
            var data = {},
                pair,
                separatorIndex,
                escapedKey,
                escapedValue,
                key,
                value;

            if (queryString === null) {
                return data;
            }

            var pairs = queryString.split("&");

            for (var i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                separatorIndex = pair.indexOf("=");

                if (separatorIndex === -1) {
                    escapedKey = pair;
                    escapedValue = null;
                } else {
                    escapedKey = pair.substr(0, separatorIndex);
                    escapedValue = pair.substr(separatorIndex + 1);
                }

                key = decodeURIComponent(escapedKey);
                value = decodeURIComponent(escapedValue);

                data[key] = value;
            }

            return data;
        }

        protected verifyStateMatch(fragment) {
            var state;

            if (typeof (fragment.access_token) !== "undefined") {
                state = sessionStorage["state"];
                sessionStorage.removeItem("state");

                if (state === null || fragment.state !== state) {
                    fragment.error = "invalid_state";
                }
            }
        }

        // Data
        Views = {
            Loading: {} // Other views are added dynamically by ViewModel.addViewModel(...).
        };

        // UI state
        errors = ko.observableArray();
        view = ko.observable(this.Views.Loading);

        // UI operations
        archiveSessionStorageToLocalStorage() {
            var backup = {};

            for (var i = 0; i < sessionStorage.length; i++) {
                backup[sessionStorage.key(i)] = sessionStorage[sessionStorage.key(i)];
            }

            localStorage["sessionStorageBackup"] = JSON.stringify(backup);
            sessionStorage.clear();
        }

        restoreSessionStorageFromLocalStorage() {
            var backupText = localStorage["sessionStorageBackup"],
                backup;

            if (backupText) {
                backup = JSON.parse(backupText);

                for (var key in backup) {
                    sessionStorage[key] = backup[key];
                }

                localStorage.removeItem("sessionStorageBackup");
            }
        }

        // Other operations
        addViewModel(options) {
            var viewItem = {},
                navigator;

            // Add view to AppViewModel.Views enum (for example, ViewModel.Views.Home).
            this.Views[options.name] = viewItem;

            // Add binding member to AppViewModel (for example, ViewModel.home);
            this[options.bindingMemberName] = ko.computed(() => {
                if (this.view() !== viewItem) {
                    return null;
                }

                return new options.factory(this, this._dataModel);
            });

            if (typeof (options.navigatorFactory) !== "undefined") {
                navigator = options.navigatorFactory(this, this._dataModel);
            } else {
                navigator = () => {
                    this.errors.removeAll();
                    this.view(viewItem);
                };
            }

            // Add navigation member to ViewModel (for example, ViewModel.NavigateToHome());
            this["navigateTo" + options.name] = navigator;
        }

        initialize() { }
    }
}


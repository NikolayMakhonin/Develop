///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/knockout/knockout.d.ts"/>
///<reference path="datamodel.ts"/>
var GeoBase;
(function (GeoBase) {
    var base;
    (function (base) {
        var BaseViewModel = (function () {
            function BaseViewModel(dataModel) {
                // Data
                this.Views = {
                    Loading: {} // Other views are added dynamically by ViewModel.addViewModel(...).
                };
                // UI state
                this.errors = ko.observableArray();
                this.view = ko.observable(this.Views.Loading);
                this._dataModel = dataModel;
            }
            // Private operations
            BaseViewModel.prototype.cleanUpLocation = function () {
                window.location.hash = "";
                if (typeof (history.pushState) !== "undefined") {
                    history.pushState("", document.title, location.pathname);
                }
            };
            BaseViewModel.prototype.getFragment = function () {
                if (window.location.hash.indexOf("#") === 0) {
                    return this.parseQueryString(window.location.hash.substr(1));
                }
                else {
                    return {};
                }
            };
            BaseViewModel.prototype.parseQueryString = function (queryString) {
                var data = {}, pair, separatorIndex, escapedKey, escapedValue, key, value;
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
                    }
                    else {
                        escapedKey = pair.substr(0, separatorIndex);
                        escapedValue = pair.substr(separatorIndex + 1);
                    }
                    key = decodeURIComponent(escapedKey);
                    value = decodeURIComponent(escapedValue);
                    data[key] = value;
                }
                return data;
            };
            BaseViewModel.prototype.verifyStateMatch = function (fragment) {
                var state;
                if (typeof (fragment.access_token) !== "undefined") {
                    state = sessionStorage["state"];
                    sessionStorage.removeItem("state");
                    if (state === null || fragment.state !== state) {
                        fragment.error = "invalid_state";
                    }
                }
            };
            // UI operations
            BaseViewModel.prototype.archiveSessionStorageToLocalStorage = function () {
                var backup = {};
                for (var i = 0; i < sessionStorage.length; i++) {
                    backup[sessionStorage.key(i)] = sessionStorage[sessionStorage.key(i)];
                }
                localStorage["sessionStorageBackup"] = JSON.stringify(backup);
                sessionStorage.clear();
            };
            BaseViewModel.prototype.restoreSessionStorageFromLocalStorage = function () {
                var backupText = localStorage["sessionStorageBackup"], backup;
                if (backupText) {
                    backup = JSON.parse(backupText);
                    for (var key in backup) {
                        sessionStorage[key] = backup[key];
                    }
                    localStorage.removeItem("sessionStorageBackup");
                }
            };
            // Other operations
            BaseViewModel.prototype.addViewModel = function (options) {
                var _this = this;
                var viewItem = {}, navigator;
                // Add view to AppViewModel.Views enum (for example, ViewModel.Views.Home).
                this.Views[options.name] = viewItem;
                // Add binding member to AppViewModel (for example, ViewModel.home);
                this[options.bindingMemberName] = ko.computed(function () {
                    if (_this.view() !== viewItem) {
                        return null;
                    }
                    return new options.factory(_this, _this._dataModel);
                });
                if (typeof (options.navigatorFactory) !== "undefined") {
                    navigator = options.navigatorFactory(this, this._dataModel);
                }
                else {
                    navigator = function () {
                        _this.errors.removeAll();
                        _this.view(viewItem);
                    };
                }
                // Add navigation member to ViewModel (for example, ViewModel.NavigateToHome());
                this["navigateTo" + options.name] = navigator;
            };
            BaseViewModel.prototype.initialize = function () {
            };
            return BaseViewModel;
        })();
        base.BaseViewModel = BaseViewModel;
    })(base = GeoBase.base || (GeoBase.base = {}));
})(GeoBase || (GeoBase = {}));
//# sourceMappingURL=viewmodel.js.map
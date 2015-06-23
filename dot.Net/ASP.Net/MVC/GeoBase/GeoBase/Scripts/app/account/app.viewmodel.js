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
    var account;
    (function (account) {
        var BaseViewModel = GeoBase.base.BaseViewModel;
        var AppViewModel = (function (_super) {
            __extends(AppViewModel, _super);
            function AppViewModel(dataModel) {
                var _this = this;
                _super.call(this, dataModel);
                // UI state
                this.user = ko.observable(null);
                this.loading = ko.computed(function () {
                    return _this.view() === _this.Views.Loading;
                });
                this.loggedIn = ko.computed(function () {
                    return _this.user() !== null;
                });
            }
            // UI operations
            AppViewModel.prototype.navigateToLoggedIn = function (userName, accessToken, persistent) {
                this.errors.removeAll();
                if (accessToken) {
                    this._dataModel.setAccessToken(accessToken, persistent);
                }
                this.user(new UserInfoViewModel(this, userName, this._dataModel));
                this.navigateToHome();
            };
            AppViewModel.prototype.navigateToLoggedOff = function () {
                this.errors.removeAll();
                this._dataModel.clearAccessToken();
                this.navigateToLogin();
            };
            // Other navigateToX functions are added dynamically by app.addViewModel(...).
            // Other operations
            AppViewModel.prototype.initialize = function () {
                var _this = this;
                _super.prototype.initialize.call(this);
                var fragment = this.getFragment(), externalAccessToken, externalError, loginUrl;
                this.restoreSessionStorageFromLocalStorage();
                this.verifyStateMatch(fragment);
                if (sessionStorage["associatingExternalLogin"]) {
                    sessionStorage.removeItem("associatingExternalLogin");
                    if (typeof (fragment.error) !== "undefined") {
                        externalAccessToken = null;
                        externalError = fragment.error;
                        this.cleanUpLocation();
                    }
                    else if (typeof (fragment.access_token) !== "undefined") {
                        externalAccessToken = fragment.access_token;
                        externalError = null;
                        this.cleanUpLocation();
                    }
                    else {
                        externalAccessToken = null;
                        externalError = null;
                        this.cleanUpLocation();
                    }
                    this._dataModel.getUserInfo().done(function (data) {
                        if (data.userName) {
                            _this.navigateToLoggedIn(data.userName);
                            _this.navigateToManage(externalAccessToken, externalError);
                        }
                        else {
                            _this.navigateToLogin();
                        }
                    }).fail(function () {
                        _this.navigateToLogin();
                    });
                }
                else if (typeof (fragment.error) !== "undefined") {
                    this.cleanUpLocation();
                    this.navigateToLogin();
                    this.errors.push("Не удалось выполнить внешний вход.");
                }
                else if (typeof (fragment.access_token) !== "undefined") {
                    this.cleanUpLocation();
                    this._dataModel.getUserInfo(fragment.access_token).done(function (data) {
                        if (typeof (data.userName) !== "undefined" && typeof (data.hasRegistered) !== "undefined" && typeof (data.loginProvider) !== "undefined") {
                            if (data.hasRegistered) {
                                _this.navigateToLoggedIn(data.userName, fragment.access_token, false);
                            }
                            else if (typeof (sessionStorage["loginUrl"]) !== "undefined") {
                                loginUrl = sessionStorage["loginUrl"];
                                sessionStorage.removeItem("loginUrl");
                                _this.navigateToRegisterExternal(data.userName, data.loginProvider, fragment.access_token, loginUrl, fragment.state);
                            }
                            else {
                                _this.navigateToLogin();
                            }
                        }
                        else {
                            _this.navigateToLogin();
                        }
                    }).fail(function () {
                        _this.navigateToLogin();
                    });
                }
                else {
                    this._dataModel.getUserInfo().done(function (data) {
                        if (data.userName) {
                            _this.navigateToLoggedIn(data.userName);
                        }
                        else {
                            _this.navigateToLogin();
                        }
                    }).fail(function () {
                        _this.navigateToLogin();
                    });
                }
            };
            return AppViewModel;
        })(BaseViewModel);
        account.AppViewModel = AppViewModel;
        account.app = new AppViewModel(new account.AppDataModel());
    })(account = GeoBase.account || (GeoBase.account = {}));
})(GeoBase || (GeoBase = {}));
//# sourceMappingURL=app.viewmodel.js.map
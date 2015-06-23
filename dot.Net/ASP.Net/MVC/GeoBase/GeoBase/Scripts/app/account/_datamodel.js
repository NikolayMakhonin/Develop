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
    var account;
    (function (account) {
        var BaseAppDataModel = GeoBase.base.BaseDataModel;
        var addExternalLoginUrl = "/api/Account/AddExternalLogin";
        var changePasswordUrl = "/api/Account/changePassword";
        var loginUrl = "/Token";
        var logoutUrl = "/api/Account/Logout";
        var registerUrl = "/api/Account/Register";
        var registerExternalUrl = "/api/Account/RegisterExternal";
        var removeLoginUrl = "/api/Account/RemoveLogin";
        var setPasswordUrl = "/api/Account/setPassword";
        var siteUrl = "/";
        var userInfoUrl = "/api/Account/UserInfo";
        var AppDataModel = (function (_super) {
            __extends(AppDataModel, _super);
            function AppDataModel() {
                _super.apply(this, arguments);
                // Data
                this.returnUrl = siteUrl;
            }
            // Route operations
            AppDataModel.prototype.externalLoginsUrl = function (returnUrl, generateState) {
                return "/api/Account/ExternalLogins?returnUrl=" + (encodeURIComponent(returnUrl)) + "&generateState=" + (generateState ? "true" : "false");
            };
            AppDataModel.prototype.manageInfoUrl = function (returnUrl, generateState) {
                return "/api/Account/ManageInfo?returnUrl=" + (encodeURIComponent(returnUrl)) + "&generateState=" + (generateState ? "true" : "false");
            };
            // Operations
            AppDataModel.prototype.clearAccessToken = function () {
                localStorage.removeItem("accessToken");
                sessionStorage.removeItem("accessToken");
            };
            AppDataModel.prototype.setAccessToken = function (accessToken, persistent) {
                if (persistent) {
                    localStorage["accessToken"] = accessToken;
                }
                else {
                    sessionStorage["accessToken"] = accessToken;
                }
            };
            AppDataModel.prototype.toErrorsArray = function (data) {
                var errors = new Array(), items;
                if (!data || !data.message) {
                    return null;
                }
                if (data.modelState) {
                    for (var key in data.modelState) {
                        items = data.modelState[key];
                        if (items.length) {
                            for (var i = 0; i < items.length; i++) {
                                errors.push(items[i]);
                            }
                        }
                    }
                }
                if (errors.length === 0) {
                    errors.push(data.message);
                }
                return errors;
            };
            // Data access operations
            AppDataModel.prototype.addExternalLogin = function (data) {
                return $.ajax(addExternalLoginUrl, {
                    type: "POST",
                    data: data,
                    headers: this.getSecurityHeaders()
                });
            };
            AppDataModel.prototype.changePassword = function (data) {
                return $.ajax(changePasswordUrl, {
                    type: "POST",
                    data: data,
                    headers: this.getSecurityHeaders()
                });
            };
            AppDataModel.prototype.getExternalLogins = function (returnUrl, generateState) {
                return $.ajax(this.externalLoginsUrl(returnUrl, generateState), {
                    cache: false,
                    headers: this.getSecurityHeaders()
                });
            };
            AppDataModel.prototype.getManageInfo = function (returnUrl, generateState) {
                return $.ajax(this.manageInfoUrl(returnUrl, generateState), {
                    cache: false,
                    headers: this.getSecurityHeaders()
                });
            };
            AppDataModel.prototype.getUserInfo = function (accessToken) {
                var headers;
                if (typeof (accessToken) !== "undefined") {
                    headers = {
                        "Authorization": "Bearer " + accessToken
                    };
                }
                else {
                    headers = this.getSecurityHeaders();
                }
                return $.ajax(userInfoUrl, {
                    cache: false,
                    headers: headers
                });
            };
            AppDataModel.prototype.login = function (data) {
                return $.ajax(loginUrl, {
                    type: "POST",
                    data: data
                });
            };
            AppDataModel.prototype.logout = function () {
                return $.ajax(logoutUrl, {
                    type: "POST",
                    headers: this.getSecurityHeaders()
                });
            };
            AppDataModel.prototype.register = function (data) {
                return $.ajax(registerUrl, {
                    type: "POST",
                    data: data
                });
            };
            AppDataModel.prototype.registerExternal = function (accessToken, data) {
                return $.ajax(registerExternalUrl, {
                    type: "POST",
                    data: data,
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    }
                });
            };
            AppDataModel.prototype.removeLogin = function (data) {
                return $.ajax(removeLoginUrl, {
                    type: "POST",
                    data: data,
                    headers: this.getSecurityHeaders()
                });
            };
            AppDataModel.prototype.setPassword = function (data) {
                return $.ajax(setPasswordUrl, {
                    type: "POST",
                    data: data,
                    headers: this.getSecurityHeaders()
                });
            };
            return AppDataModel;
        })(BaseAppDataModel);
        account.AppDataModel = AppDataModel;
    })(account = GeoBase.account || (GeoBase.account = {}));
})(GeoBase || (GeoBase = {}));
//# sourceMappingURL=_datamodel.js.map
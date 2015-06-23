///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../base/datamodel.ts"/>

module GeoBase.account {
    import BaseAppDataModel = GeoBase.base.BaseDataModel;
    var addExternalLoginUrl: string = "/api/Account/AddExternalLogin";
    var changePasswordUrl: string = "/api/Account/changePassword";
    var loginUrl: string = "/Token";
    var logoutUrl: string = "/api/Account/Logout";
    var registerUrl: string = "/api/Account/Register";
    var registerExternalUrl: string = "/api/Account/RegisterExternal";
    var removeLoginUrl: string = "/api/Account/RemoveLogin";
    var setPasswordUrl: string = "/api/Account/setPassword";
    var siteUrl: string = "/";
    var userInfoUrl: string = "/api/Account/UserInfo";

    export class AppDataModel extends BaseAppDataModel {
        // Data
        public returnUrl = siteUrl;
        
        // Route operations
        private externalLoginsUrl(returnUrl: string, generateState): string {
            return "/api/Account/ExternalLogins?returnUrl=" + (encodeURIComponent(returnUrl)) +
                "&generateState=" + (generateState ? "true" : "false");
        }

        private manageInfoUrl(returnUrl: string, generateState): string {
            return "/api/Account/ManageInfo?returnUrl=" + (encodeURIComponent(returnUrl)) +
                "&generateState=" + (generateState ? "true" : "false");
        }

        // Operations
        clearAccessToken() {
            localStorage.removeItem("accessToken");
            sessionStorage.removeItem("accessToken");
        }

        setAccessToken(accessToken, persistent) {
            if (persistent) {
                localStorage["accessToken"] = accessToken;
            } else {
                sessionStorage["accessToken"] = accessToken;
            }
        }

        toErrorsArray(data) {
            var errors = new Array(),
                items;

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
        }


        // Data access operations
        addExternalLogin(data): JQueryXHR {
            return $.ajax(addExternalLoginUrl, {
                type: "POST",
                data: data,
                headers: this.getSecurityHeaders()
            });
        }

        changePassword(data): JQueryXHR {
            return $.ajax(changePasswordUrl, {
                type: "POST",
                data: data,
                headers: this.getSecurityHeaders()
            });
        }

        getExternalLogins(returnUrl, generateState): JQueryXHR {
            return $.ajax(this.externalLoginsUrl(returnUrl, generateState), {
                cache: false,
                headers: this.getSecurityHeaders()
            });
        }

        getManageInfo(returnUrl, generateState): JQueryXHR {
            return $.ajax(this.manageInfoUrl(returnUrl, generateState), {
                cache: false,
                headers: this.getSecurityHeaders()
            });
        }

        getUserInfo(accessToken?: string): JQueryXHR {
            var headers;

            if (typeof (accessToken) !== "undefined") {
                headers = {
                    "Authorization": "Bearer " + accessToken
                };
            } else {
                headers = this.getSecurityHeaders();
            }

            return $.ajax(userInfoUrl, {
                cache: false,
                headers: headers
            });
        }

        login(data): JQueryXHR {
            return $.ajax(loginUrl, {
                type: "POST",
                data: data
            });
        }

        logout(): JQueryXHR {
            return $.ajax(logoutUrl, {
                type: "POST",
                headers: this.getSecurityHeaders()
            });
        }

        register(data): JQueryXHR {
            return $.ajax(registerUrl, {
                type: "POST",
                data: data
            });
        }

        registerExternal(accessToken, data): JQueryXHR {
            return $.ajax(registerExternalUrl, {
                type: "POST",
                data: data,
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            });
        }

        removeLogin(data): JQueryXHR {
            return $.ajax(removeLoginUrl, {
                type: "POST",
                data: data,
                headers: this.getSecurityHeaders()
            });
        }

        setPassword(data): JQueryXHR {
            return $.ajax(setPasswordUrl, {
                type: "POST",
                data: data,
                headers: this.getSecurityHeaders()
            });
        }
    }
}

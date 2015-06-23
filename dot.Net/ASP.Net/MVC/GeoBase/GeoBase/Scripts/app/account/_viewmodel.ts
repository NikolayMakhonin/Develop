///<reference path="../../typings/jquery/jquery.d.ts"/>
///<reference path="../../typings/knockout/knockout.d.ts"/>
///<reference path="../base/datamodel.ts"/>

module GeoBase.account {
    import BaseViewModel = GeoBase.base.BaseViewModel;

    interface UserInfoViewModel { }

    declare var UserInfoViewModel:
    {
        new (account, name, dataModel): UserInfoViewModel;
    }

    export class AppViewModel extends BaseViewModel<AppDataModel> {
        constructor(dataModel: AppDataModel) {
            super(dataModel);
        }

        navigateToHome: () => void;
        navigateToLogin: () => void;
        navigateToManage: (externalAccessToken, externalError) => void;
        navigateToRegisterExternal: (userName, loginProvider, access_token, loginUrl, state) => void;

        // UI state
        user = ko.observable(null);

        loading = ko.computed(() => {
            return this.view() === this.Views.Loading;
        });

        loggedIn = ko.computed(() => {
            return this.user() !== null;
        });

        // UI operations

        navigateToLoggedIn(userName, accessToken?, persistent?) {
            this.errors.removeAll();

            if (accessToken) {
                this._dataModel.setAccessToken(accessToken, persistent);
            }

            this.user(new UserInfoViewModel(this, userName, this._dataModel));
            this.navigateToHome();
        }

        navigateToLoggedOff() {
            this.errors.removeAll();
            this._dataModel.clearAccessToken();
            this.navigateToLogin();
        }

        // Other operations
        initialize() {
            super.initialize();
            var fragment = this.getFragment(),
                externalAccessToken,
                externalError,
                loginUrl;

            this.restoreSessionStorageFromLocalStorage();
            this.verifyStateMatch(fragment);

            if (sessionStorage["associatingExternalLogin"]) {
                sessionStorage.removeItem("associatingExternalLogin");

                if (typeof (fragment.error) !== "undefined") {
                    externalAccessToken = null;
                    externalError = fragment.error;
                    this.cleanUpLocation();
                } else if (typeof (fragment.access_token) !== "undefined") {
                    externalAccessToken = fragment.access_token;
                    externalError = null;
                    this.cleanUpLocation();
                } else {
                    externalAccessToken = null;
                    externalError = null;
                    this.cleanUpLocation();
                }

                this._dataModel.getUserInfo()
                    .done((data) => {
                        if (data.userName) {
                            this.navigateToLoggedIn(data.userName);
                            this.navigateToManage(externalAccessToken, externalError);
                        } else {
                            this.navigateToLogin();
                        }
                    })
                    .fail(() => {
                        this.navigateToLogin();
                    });
            } else if (typeof (fragment.error) !== "undefined") {
                this.cleanUpLocation();
                this.navigateToLogin();
                this.errors.push("Не удалось выполнить внешний вход.");
            } else if (typeof (fragment.access_token) !== "undefined") {
                this.cleanUpLocation();
                this._dataModel.getUserInfo(fragment.access_token)
                    .done((data) => {
                        if (typeof (data.userName) !== "undefined" && typeof (data.hasRegistered) !== "undefined"
                            && typeof (data.loginProvider) !== "undefined") {
                            if (data.hasRegistered) {
                                this.navigateToLoggedIn(data.userName, fragment.access_token, false);
                            } else if (typeof (sessionStorage["loginUrl"]) !== "undefined") {
                                loginUrl = sessionStorage["loginUrl"];
                                sessionStorage.removeItem("loginUrl");
                                this.navigateToRegisterExternal(data.userName, data.loginProvider, fragment.access_token,
                                    loginUrl, fragment.state);
                            } else {
                                this.navigateToLogin();
                            }
                        } else {
                            this.navigateToLogin();
                        }
                    })
                    .fail(() => {
                        this.navigateToLogin();
                    });
            } else {
                this._dataModel.getUserInfo()
                    .done((data) => {
                        if (data.userName) {
                            this.navigateToLoggedIn(data.userName);
                        } else {
                            this.navigateToLogin();
                        }
                    })
                    .fail(() => {
                        this.navigateToLogin();
                    });
            }
        }
    }

    export var instance = new AppViewModel(new AppDataModel());
}


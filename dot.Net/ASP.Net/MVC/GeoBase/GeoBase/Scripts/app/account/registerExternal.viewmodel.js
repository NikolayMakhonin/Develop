function RegisterExternalViewModel(account, dataModel) {
    // Private state
    var self = this;

    // Data
    self.loginProvider = ko.observable();
    self.userName = ko.observable(null).extend({ required: true });

    // Other UI state
    self.registering = ko.observable(false);
    self.externalAccessToken = null;
    self.state = null;
    self.loginUrl = null;
    self.errors = ko.observableArray();
    self.validationErrors = ko.validation.group([self.userName]);

    // data-bind click
    self.register = function () {
        self.errors.removeAll();

        if (self.validationErrors().length > 0) {
            self.validationErrors.showAllMessages();
            return;
        }

        self.registering(true);
        dataModel.registerExternal(self.externalAccessToken, {
            userName: self.userName()
        }).done(function (data) {
            sessionStorage["state"] = self.state;
            // IE doesn't reliably persist sessionStorage when navigating to another URL. Move sessionStorage
            // temporarily to localStorage to work around this problem.
            account.archiveSessionStorageToLocalStorage();
            window.location = self.loginUrl;
        }).failJSON(function (data) {
            var errors;

            self.registering(false);
            errors = dataModel.toErrorsArray(data);

            if (errors) {
                self.errors(errors);
            } else {
                self.errors.push("Произошла неизвестная ошибка.");
            }
        });
    };
}

GeoBase.account.instance.addViewModel({
    name: "RegisterExternal",
    bindingMemberName: "registerExternal",
    factory: RegisterExternalViewModel,
    navigatorFactory: function (account) {
        return function (userName, loginProvider, externalAccessToken, loginUrl, state) {
            account.errors.removeAll();
            account.view(account.Views.RegisterExternal);
            account.registerExternal().userName(userName);
            account.registerExternal().loginProvider(loginProvider);
            account.registerExternal().externalAccessToken = externalAccessToken;
            account.registerExternal().loginUrl = loginUrl;
            account.registerExternal().state = state;
        };
    }
});

function UserInfoViewModel(account, name, dataModel) {
    var self = this;

    // Данные
    self.name = ko.observable(name);

    // Операции
    self.logOff = function () {
        dataModel.logout().done(function () {
            account.navigateToLoggedOff();
        }).fail(function () {
            account.errors.push("Не удалось выполнить выход.");
        });
    };

    self.manage = function () {
        account.navigateToManage();
    };
}

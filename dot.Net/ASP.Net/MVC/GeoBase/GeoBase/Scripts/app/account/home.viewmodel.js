function HomeViewModel(account, dataModel) {
    var self = this;

    // HomeViewModel currently does not require data binding, so there are no visible members.
}

GeoBase.account.instance.addViewModel({
    name: "Home",
    bindingMemberName: "home",
    factory: HomeViewModel
});

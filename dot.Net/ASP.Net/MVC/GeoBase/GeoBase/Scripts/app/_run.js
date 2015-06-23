$(function () {
    GeoBase.account.instance.initialize();
    GeoBase.geo.instance.initialize();

    // Activate Knockout
    ko.validation.init({ grouping: { observable: false } });

    ko.applyBindings({
        account: GeoBase.account.instance,
        geo: GeoBase.geo.instance
    });
});

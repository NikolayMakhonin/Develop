///<reference path="../../../typings/TypeScriptUtils.d.ts"/>
var PersonActions;
(function (PersonActions) {
    var Phones;
    (function (Phones) {
        var QuantizedEventHandler = mika.utils.Async.Events.QuantizedEventHandler;
        Phones.Add = new QuantizedEventHandler();
        Phones.Remove = new QuantizedEventHandler();
        Phones.Update = new QuantizedEventHandler();
    })(Phones = PersonActions.Phones || (PersonActions.Phones = {}));
})(PersonActions || (PersonActions = {}));
//# sourceMappingURL=PersonActions.js.map
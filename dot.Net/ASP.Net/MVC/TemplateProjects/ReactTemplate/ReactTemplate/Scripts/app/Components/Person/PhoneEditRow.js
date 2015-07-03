///<reference path="../../../typings/react/react.d.ts"/>
///<reference path="../../Utils/ReactUtils/ReactExt.ts"/>
var App;
(function (App) {
    var Components;
    (function (Components) {
        var Person;
        (function (Person) {
            var ReactExt = App.Utils.ReactUtils.ReactExt;
            var PhoneEditRowSpec = (function () {
                function PhoneEditRowSpec() {
                    this.displayName = "Phone Edit";
                }
                PhoneEditRowSpec.prototype.componentDidMount = function () {
                };
                PhoneEditRowSpec.prototype.render = function () {
                    return (function () {
                        /*
                        <tr>
                            <td><input onChange={@_onChange} value="8-888-888-8888"/></td>
                            <td>
                                <button onClick={@_onRemove} class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                            </td>
                        </tr>
                        */ });
                };
                return PhoneEditRowSpec;
            })();
            Person.PhoneEditRow = ReactExt.createClass(new PhoneEditRowSpec());
        })(Person = Components.Person || (Components.Person = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
//# sourceMappingURL=PhoneEditRow.js.map
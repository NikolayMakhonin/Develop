///<reference path="../../../typings/react/react.d.ts"/>
///<reference path="../../Utils/ReactUtils/ReactExt.ts"/>
///<reference path="PhoneEditRow.ts"/>
var App;
(function (App) {
    var Components;
    (function (Components) {
        var Person;
        (function (Person) {
            var ReactExt = App.Utils.ReactUtils.ReactExt;
            var PhoneListSpec = (function () {
                function PhoneListSpec() {
                    this.displayName = "Phone Edit";
                }
                PhoneListSpec.prototype.componentDidMount = function () {
                };
                PhoneListSpec.prototype.render = function () {
                    return (function () {
                        /*
                        <span>
                            <h3>
                            Телефоны
                            &nbsp;
                            <button onChange={@_onAdd} class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                            </h3>
                            <table class="table vcenter borderless">
                                <thead>
                                    <tr><th>Телефон</th><th>Операции</th></tr>
                                </thead>
                                <tbody>
                                    {objects.map(function(phone, index){
                                        return <PhoneEditRow phone={phone} index={index} />;
                                    })}
                                </tbody>
                            </table>
                        </span>
                        */ });
                };
                return PhoneListSpec;
            })();
            Person.PhoneList = ReactExt.createClass(new PhoneListSpec());
        })(Person = Components.Person || (Components.Person = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));
//# sourceMappingURL=PhoneList.js.map
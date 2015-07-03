///<reference path="../../../typings/react/react.d.ts"/>
///<reference path="../../Utils/ReactUtils/ReactExt.ts"/>
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
                    return <div>
                            <h3>
                            Телефоны
                            &nbsp;
                            <button className="btn btn-default btn-sm"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                            </h3>
                            <table className="table vcenter borderless">
                                <thead>
                                    <tr><th>Телефон</th><th>Операции</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>8-888-888-8888</td><td><button className="btn btn-default btn-sm"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>
                                </tbody>
                            </table>
                        </div>;
                };
                return PhoneListSpec;
            })();
            Person.PhoneList = ReactExt.createClass(new PhoneListSpec());
        })(Person = Components.Person || (Components.Person = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));

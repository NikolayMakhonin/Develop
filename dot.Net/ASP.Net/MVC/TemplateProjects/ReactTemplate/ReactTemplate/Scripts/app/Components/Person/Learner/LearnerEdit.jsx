///<reference path="../../../../typings/react/react.d.ts"/>
///<reference path="../../../Utils/ReactUtils/ReactExt.ts"/>
///<reference path="../PhoneList.ts"/>
var App;
(function (App) {
    var Components;
    (function (Components) {
        var Person;
        (function (Person) {
            var Learner;
            (function (Learner) {
                var ReactExt = App.Utils.ReactUtils.ReactExt;
                var PhoneList = Person.PhoneList;
                //SubsectorsActionCreators = require('../actions/subsectors_actions');
                //ItemErrorsBlock = require('./item_errors_block');
                var LearnerEditSpec = (function () {
                    function LearnerEditSpec() {
                        this.displayName = "Learner Edit";
                        this.propTypes = {};
                    }
                    LearnerEditSpec.prototype.onTextChange = function (e) {
                        //var params;
                        //params = {
                        //    name: e.target.value
                        //};
                        //return SubsectorsActionCreators.update_text(this.props.subsector, params);
                    };
                    LearnerEditSpec.prototype.componentDidMount = function () {
                    };
                    LearnerEditSpec.prototype.render = function () {
                        return <div>
                                <h2>
                                    Ученик: Иванов Иван Иванович
                                    &nbsp;
                                    <button className="btn btn-default btn-sm"><span className="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                                    &nbsp;
                                    <button className="btn btn-default btn-sm"><span className="glyphicon glyphicon-repeat" aria-hidden="true"></span></button>
                                </h2>
                                <br/>
                                ID: 1073
                                <br/>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="col-md-6">
                                                <h3>Общая информация</h3>
                                                <table className="table vcenter borderless">
                                                    <tbody>
                                                        <tr><td>*&nbsp;Фамилия:</td><td><input value="Иванов"/></td></tr>
                                                        <tr><td>*&nbsp;Имя:</td><td><input value="Иван"/></td></tr>
                                                        <tr><td>Отчество:</td><td><input value="Иванович"/></td></tr>
                                                        <tr><td>*&nbsp;Пол:</td><td><input value=""/></td></tr>
                                                        <tr><td>*&nbsp;Дата рождения:</td><td><input value="15.06.2002"/></td></tr>
                                                        <tr><td>*&nbsp;Год обучения:</td><td><input value="5"/></td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="col-md-6">
                                                <h3>Дополнительно</h3>
                                                <table className="table vcenter borderless">
                                                    <tbody>
                                                        <tr><td>Город:</td><td><input value="Пос. Старопышминск"/></td></tr>
                                                        <tr><td>Район:</td><td><input value=""/></td></tr>
                                                        <tr><td>Адрес:</td><td><input value=""/></td></tr>
                                                        <tr><td>Школа:</td><td><input value="Гимназия № 2"/></td></tr>
                                                        <tr><td>Класс:</td><td><input value="5 класс"/></td></tr>
                                                        <tr><td>E-mail:</td><td><input value="5"/></td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <h3>
                                                Братья, сестры
                                                &nbsp;
                                                <button className="btn btn-default btn-sm"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                                            </h3>
                                            <table className="table vcenter borderless">
                                                <thead>
                                                    <tr><th>ФИО</th><th>Операции</th></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>Петров петр петрович</td><td><button className="btn btn-default btn-sm"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h3>
                                            Родители
                                            &nbsp;
                                            <button className="btn btn-default btn-sm"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                                            </h3>
                                            <table className="table vcenter borderless">
                                                <thead>
                                                    <tr><th>ФИО</th><th>Телефон</th><th>Операции</th></tr>
                                                </thead>
                                                <tbody>
                                                    <tr><td>Петров петр петрович</td><td>8-888-888-8888</td><td><button className="btn btn-default btn-sm"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <PhoneList className="col-md-4"/>
                                    </div>
                                </div>
                            </div>;
                    };
                    return LearnerEditSpec;
                })();
                Learner.LearnerEdit = ReactExt.createClass(new LearnerEditSpec());
            })(Learner = Person.Learner || (Person.Learner = {}));
        })(Person = Components.Person || (Components.Person = {}));
    })(Components = App.Components || (App.Components = {}));
})(App || (App = {}));

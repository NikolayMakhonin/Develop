﻿///<reference path="../../../typings/react/react.d.ts"/>
///<reference path="../../Utils/ReactUtils/ReactExt.ts"/>

module App.Components.Learner {
    import ReactComponentSpec = React.ReactComponentSpec;
    import PropTypeValidatorOptions = React.PropTypeValidatorOptions;
    import ReactUtils = App.Utils.ReactUtils;
    import ReactExt = App.Utils.ReactUtils.ReactExt; 
    
    //SubsectorsActionCreators = require('../actions/subsectors_actions');
    //ItemErrorsBlock = require('./item_errors_block');

    class LearnerEditSpec implements ReactComponentSpec<any, any> {
        displayName: string = "Learner Edit";

        propTypes: PropTypeValidatorOptions = {
            //subsector: React.PropTypes.object.isRequired
        }
        
        onTextChange(e) {
            //var params;
            //params = {
            //    name: e.target.value
            //};
            //return SubsectorsActionCreators.update_text(this.props.subsector, params);
        }

        componentDidMount() {
            var x = 0;
        }

        render(): React.ReactElement<any, any> {

            return <any>(() => {
                /*
                <div>
                    <h2>
                        Ученик: Иванов Иван Иванович
                        &nbsp;
                        <button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button>
                        &nbsp;
                        <button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></button>
                    </h2>
                    <br/>
                    ID: 1073
                    <br/>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="col-md-6">
                                    <h3>Общая информация</h3>
                                    <table class="table vcenter borderless">
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
                                <div class="col-md-6">
                                    <h3>Дополнительно</h3>
                                    <table class="table vcenter borderless">
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
                            <div class="col-md-4">
                                <h3>
                                    Братья, сестры
                                    &nbsp;
                                    <button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                                </h3>
                                <table class="table vcenter borderless">
                                    <thead>
                                        <tr><th>ФИО</th><th>Операции</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Петров петр петрович</td><td><button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-8">
                                <h3>
                                Родители
                                &nbsp;
                                <button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                                </h3>
                                <table class="table vcenter borderless">
                                    <thead>
                                        <tr><th>ФИО</th><th>Телефон</th><th>Операции</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Петров петр петрович</td><td>8-888-888-8888</td><td><button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-4">
                                <h3>
                                Телефоны
                                &nbsp;
                                <button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                                </h3>
                                <table class="table vcenter borderless">
                                    <thead>
                                        <tr><th>Телефон</th><th>Операции</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>8-888-888-8888</td><td><button class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            */});
        }
    }

    export var LearnerEdit = ReactExt.createClass(new LearnerEditSpec());
}
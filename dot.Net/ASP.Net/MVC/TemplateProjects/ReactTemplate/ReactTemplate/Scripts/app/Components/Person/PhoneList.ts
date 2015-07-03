///<reference path="../../../typings/react/react.d.ts"/>
///<reference path="../../Utils/ReactUtils/ReactExt.ts"/>
///<reference path="PhoneEditRow.ts"/>

module App.Components.Person {
    import ReactComponentSpec = React.ReactComponentSpec;
    import ReactExt = App.Utils.ReactUtils.ReactExt; 

    class PhoneListSpec implements ReactComponentSpec<any, any> {
        displayName: string = "Phone Edit";

        componentDidMount() {
        }

        render(): React.ReactElement<any, any> {
            return <any>(() => {
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
                */});
        }
    }

    export var PhoneList = ReactExt.createClass(new PhoneListSpec());
}
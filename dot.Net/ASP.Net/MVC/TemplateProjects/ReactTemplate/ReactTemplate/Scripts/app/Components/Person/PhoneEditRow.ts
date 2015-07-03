///<reference path="../../../typings/react/react.d.ts"/>
///<reference path="../../Utils/ReactUtils/ReactExt.ts"/>

module App.Components.Person {
    import ReactComponentSpec = React.ReactComponentSpec;
    import ReactExt = App.Utils.ReactUtils.ReactExt; 

    class PhoneEditRowSpec implements ReactComponentSpec<any, any> {
        displayName: string = "Phone Edit";

        componentDidMount() {
        }

        render(): React.ReactElement<any, any> {
            return <any>(() => {
                /*
                <tr>
                    <td><input onChange={@_onChange} value="8-888-888-8888"/></td>
                    <td>
                        <button onClick={@_onRemove} class="btn btn-default btn-sm"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                    </td>
                </tr>
                */});
        }
    }

    export var PhoneEditRow = ReactExt.createClass(new PhoneEditRowSpec());
}
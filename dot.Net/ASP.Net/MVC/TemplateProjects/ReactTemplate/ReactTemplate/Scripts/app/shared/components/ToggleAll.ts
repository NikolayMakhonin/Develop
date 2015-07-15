///<reference path="../../../typings/react.d.ts"/>
///<reference path="../../utils/ReactComponent.ts"/>

module app.shared.components {
    import ReactComponent = app.utils.ReactComponent;
    var React = nodejs.react.React;

    export class ToggleAll extends ReactComponent<any, any> {
        handleToggleAll() {            
            var completed = this.refs["completed"].getDOMNode().checked;
            this.props.onToggleStatus(completed);
        }

        render() {
            var checked = this.props.tasks
                .reduce((result, task) => result && task.comleted, false);

            return (() => {
                /*
                <div>
                    <input className="toggle-all"
                           type="checkbox"
                           defaultChecked={checked}
                           ref="completed"
                           onChange={this.handleToggleAll.bind(this)} />
                    <label htmlFor="toggle-all">Mark all as complete</label>
                </div>
                */
            });
        }
    }
}

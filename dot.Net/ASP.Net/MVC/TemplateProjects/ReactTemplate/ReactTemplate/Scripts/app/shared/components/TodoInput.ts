///<reference path="../../../typings/react.d.ts"/>
///<reference path="../../utils/ReactComponent.ts"/>

module app.shared.components {
    import ReactComponent = app.utils.ReactComponent;
    var React = nodejs.react.React;
    var ESCAPE_KEY = 27;
    var ENTER_KEY = 13;

    export class TodoInput extends ReactComponent<any, any> {
        handleKeyDown(event) {
            if (event.which !== ENTER_KEY) {
                return;
            }

            event.preventDefault();

            var value = this.refs["task"].getDOMNode().value.trim();

            if (value) {
                this.props.handleNewTask(value);
                this.refs["task"].getDOMNode().value = '';
            }
        }

        render() {
            return (() => {
                /*
                <input className="new-todo"
                       placeholder="What needs to be done?"
                       onKeyDown={this.handleKeyDown.bind(this)}
                       ref="task" />
                */
            });
        }
    }
}

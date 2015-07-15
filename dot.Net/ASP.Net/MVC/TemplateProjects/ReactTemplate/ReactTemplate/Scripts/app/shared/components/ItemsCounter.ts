///<reference path="../../../typings/react.d.ts"/>
///<reference path="../../utils/ReactComponent.ts"/>

module app.shared.components {
    import ReactComponent = app.utils.ReactComponent;
    var React = nodejs.react.React;

    export class ItemsCounter extends ReactComponent<any, any> {
        render() {
            var count = this.props.tasks
                .map(task => task.completed ? 0 : 1)
                .reduce((result, count) => result + count);

            return (() => {
                /*
                <span className="todo-count">
                    <strong>{count}</strong>
                    {count > 1 ? ' items' : ' item'} left
                </span>
                */
            });
        }
    }
}

///<reference path="../../../typings/react.d.ts"/>
///<reference path="../../utils/ReactComponent.ts"/>
///<reference path="TodoItem.ts"/>

module app.shared.components {
    import ReactComponent = app.utils.ReactComponent;
    var TodoItem = components.TodoItem;
    var React = nodejs.react.React;

    export class TodoList extends ReactComponent<any, any> {
        onToggleStatus(id, completed) {
            this.props.onToggleStatus(id, completed);
        }

        onDeleteTask(id) {
            this.props.onDeleteTask(id);
        }

        render() {
            var self = this;
            return (() => {
                /*
                <ul className="todo-list">
                    {this.props.tasks.map(function(task) {
                        return <TodoItem key={task.id} task={task}
                                  onToggleStatus={self.onToggleStatus.bind(this, task.id)}
                                  onDeleteTask={self.onDeleteTask.bind(this, task.id)} />
                    })}
                </ul>
                */
            });
        }
    }

}
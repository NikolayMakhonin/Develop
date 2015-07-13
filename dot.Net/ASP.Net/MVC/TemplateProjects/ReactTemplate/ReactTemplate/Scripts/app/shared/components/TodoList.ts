///<reference path="../../../typings/react.d.ts"/>
///<reference path="TodoItem.ts"/>

module app.shared.components {
    import ReactComponent = app.utils.ReactComponent;
    var TodoItem = components.TodoItem;

    export class TodoList extends ReactComponent<any, any> {
        onToggleStatus(id, completed) {
            this.props.onToggleStatus(id, completed);
        }

        onDeleteTask(id) {
            this.props.onDeleteTask(id);
        }

        render() {
            return (() => {
                /*
                <ul className="todo-list">
                    {this.props.tasks.map(task =>
                        <TodoItem key={task.id} task={task}
                                  onToggleStatus={this.onToggleStatus.bind(this, task.id)}
                                  onDeleteTask={this.onDeleteTask.bind(this, task.id)} />
                    )}
                </ul>
                */
            });
        }
    }

}
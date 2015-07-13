///<reference path="../../../typings/react.d.ts"/>

module app.shared.stores {
    import Store = nodejs.react.flux.flummox.Store;

    export class TodoListStore extends Store {
        constructor(flux) {
            super();

            var actions = flux.getActionIds('todo');
            this.register(actions.getTasks, this.handleNewTasks);
            this.register(actions.getActiveTasks, this.handleNewTasks);
            this.register(actions.getCompletedTasks, this.handleNewTasks);
            this.register(actions.createTask, this.handleNewTask);
            this.register(actions.toggleTask, this.handleUpdateTask);
            this.register(actions.toggleAll, this.handleNewTasks);
            this.register(actions.deleteTask, this.handleDeleteTask);
            this.register(actions.deleteCompletedTasks, this.handleDeleteTasks);
        }

        handleNewTask(task) {
            if (task && task.id) {
                this.setState({
                    tasks: this.state.tasks.concat([task])
                });
            }
        }

        handleNewTasks(tasks) {
            this.setState({
                tasks: tasks ? tasks : []
            });
        }

        handleUpdateTask(task) {
            var id = task.id;
            this.setState({
                tasks: this.state.tasks.map(t => {
                    return (t.id == id) ? task : t;
                })
            });
        }

        handleDeleteTask(task) {
            var id = task.id;
            this.setState({
                tasks: this.state.tasks.map(t => {
                    if (t.id != id) {
                        return t;
                    }
                }).filter(Boolean)
            });
        }

        handleDeleteTasks(args: { deleted }) {
            this.setState({
                tasks: this.state.tasks.filter(task =>
                    args.deleted.indexOf(task.id) < 0
                )
            });
        }
    }

}

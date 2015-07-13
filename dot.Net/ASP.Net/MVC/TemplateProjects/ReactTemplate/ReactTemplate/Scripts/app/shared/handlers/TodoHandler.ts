///<reference path="../../../typings/react.d.ts"/>
///<reference path="../components/TodoList.ts"/>
///<reference path="../components/TodoInput.ts"/>
///<reference path="../components/ItemsCounter.ts"/>
///<reference path="../components/ToggleAll.ts"/>
///<reference path="../Flux.ts"/>

module app.shared.handlers {
    import ReactComponent = app.utils.ReactComponent;
    var ToggleAll = app.shared.components.ToggleAll;
    var ItemsCounter = app.shared.components.ItemsCounter;
    var TodoList = app.shared.components.TodoList;
    var TodoInput = app.shared.components.TodoInput;
    var Flux = app.shared.Flux;

    export class TodoHandler extends ReactComponent<any, any> {
        static routerWillRun(args: {flux; state}) {
            var action = args.state.routes[args.state.routes.length - 1].name;
            var todoActions = args.flux.getActions('todo');
            switch (action) {
                case 'active':
                    todoActions.getActiveTasks();
                    break;
                case 'completed':
                    todoActions.getCompletedTasks();
                    break;
                case 'all':
                default:
                    todoActions.getTasks();
                    break;
            }
        }

        handleNewTask(text) {
            var actions = this.props.flux.getActions('todo');
            actions.createTask({text});
        }

        handleToggleStatus(id, status) {
            var actions = this.props.flux.getActions('todo');
            actions.toggleTask(id, status);
        }

        handleToggleAll(status) {
            var actions = this.props.flux.getActions('todo');
            actions.toggleAll(status);
        }

        handleDeleteTask(id) {
            var actions = this.props.flux.getActions('todo');
            actions.deleteTask(id);
        }

        handleDeleteCompletedTasks(id) {
            var actions = this.props.flux.getActions('todo');
            actions.deleteCompletedTasks();
        }

        render() {
            return (() => {
                /*
                <div>
                    <header className="header">
                        <h1>todos</h1>
                        <TodoInput handleNewTask={this.handleNewTask.bind(this)} />
                    </header>
                    <section className="main">
                        <Flux connectToStores={['todo']}>
                            <ToggleAll onToggleStatus={this.handleToggleAll.bind(this)} />
                        </Flux>
                        <Flux connectToStores={['todo']}>
                            <TodoList onToggleStatus={this.handleToggleStatus.bind(this)}
                                      onDeleteTask={this.handleDeleteTask.bind(this)} />
                        </Flux>
                    </section>
                    <footer className="footer">
                        <Flux connectToStores={['todo']}>
                            <ItemsCounter count={0} />
                        </Flux>
                        <ul className="filters">
                            <li>
                                <a href="/">All</a>
                            </li>
                            <li>
                                <a href="/active">Active</a>
                            </li>
                            <li>
                                <a href="/completed">Completed</a>
                            </li>
                        </ul>
                        <button className="clear-completed" onClick={this.handleDeleteCompletedTasks.bind(this)}>
                            Clear completed
                        </button>
                    </footer>
                </div>
                */
            });
        }
    }
}


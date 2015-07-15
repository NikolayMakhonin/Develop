///<reference path="../../../typings/react.d.ts"/>

module app.shared.actions {
    import Actions = nodejs.react.flux.flummox.Actions;

    export class TodoListActions extends Actions {
        getTasks() {
            return [
                {
                    id: 1,
                    text: 'Rule the World',
                    completed: false
                },
                {
                    id: 2,
                    text: 'Be an Awesome',
                    completed: true
                }
            ];
        }

        getActiveTasks() {
            return [
                {
                    id: 1,
                    text: 'Rule the World',
                    completed: false
                }
            ];
        }

        getCompletedTasks() {
            return [
                {
                    id: 2,
                    text: 'Be an Awesome',
                    completed: true
                }
            ];
        }

        deleteCompletedTasks() {

        }

        createTask(task) {

        }

        deleteTask(id) {

        }

        toggleTask(id, completed) {

        }

        toggleAll(completed) {

        }
    }
}

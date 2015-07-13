///<reference path="../../typings/react.d.ts"/>
///<reference path="actions/TodoActions.ts"/>
///<reference path="stores/TodoStore.ts"/>

module app.shared {
    import TodoListStore = app.shared.stores.TodoListStore;
    import TodoListActions = app.shared.actions.TodoListActions;

    export class Flux extends nodejs.react.flux.flummox.Flux {
        constructor() {
            super();

            this.createActions('todo', TodoListActions);
            this.createStore('todo', TodoListStore, this);
        }
    }
}
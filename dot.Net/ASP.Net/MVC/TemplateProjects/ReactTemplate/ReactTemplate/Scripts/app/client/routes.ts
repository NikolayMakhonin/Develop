///<reference path="../../typings/react.d.ts"/>
///<reference path="../shared/handlers/AppHandler.ts"/>
///<reference path="../shared/handlers/TodoHandler.ts"/>

module app.client {
    var React = nodejs.react.React;
    var Route = nodejs.react.Router.Route;
    var DefaultRoute = nodejs.react.Router.DefaultRoute;
    var NotFoundRoute = nodejs.react.Router.NotFoundRoute;
    var TodoHandler = app.shared.handlers.TodoHandler;
    var AppHandler = app.shared.handlers.AppHandler;

    export var routes = (() => {
        /*
        <Route handler={AppHandler}>
            <DefaultRoute handler={TodoHandler} />
            <NotFoundRoute handler={TodoHandler} />
            <Route name="all" path="/" handler={TodoHandler} action="all" />
            <Route name="active" path="/active" handler={TodoHandler} action="active" />
            <Route name="completed" path="/completed" handler={TodoHandler} action="completed" />
        </Route>
        */
    });
}
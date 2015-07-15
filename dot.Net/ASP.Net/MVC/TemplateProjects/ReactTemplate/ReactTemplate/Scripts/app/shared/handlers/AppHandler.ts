///<reference path="../../../typings/react.d.ts"/>
///<reference path="../../utils/ReactComponent.ts"/>

module app.shared.handlers {
    import ReactComponent = app.utils.ReactComponent;
    var RouteHandler = nodejs.react.Router.RouteHandler;
    var React = nodejs.react.React;

    export class AppHandler extends ReactComponent<any, any> {
        render(): any {
            return (() => {
                /*
                <div>
                    <section className="todoapp">
                        <RouteHandler {...this.props} key={this.props.pathname} />
                    </section>
                    <footer className="info">
                        <p>Double-click to edit a todo</p>
                        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
                        <p>Created by <a href="http://todomvc.com">you</a></p>
                        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                    </footer>
                </div>
                */
            });
        }
    };

}
///<reference path="../shared/Flux.ts"/>
///<reference path="../utils/performRouteHandlerStaticMethod.ts"/>
///<reference path="routes.ts"/>
///<reference path="../../typings/react.d.ts"/>

module app.client {
    import Flux = app.shared.Flux;
    var React = nodejs.react.React;
    import performRouteHandlerStaticMethod = utils.performRouteHandlerStaticMethod;
    import url = nodejs.url;
    import Router = nodejs.react.Router;
    var FluxComponent = nodejs.react.flux.FluxComponent; 

    var flux = new Flux();

    var router = new Router.create({
        routes: routes,
        location: Router.HistoryLocation
    });

    router.run((Handler, state) => {
        var routeHandlerInfo = { state, flux };

        performRouteHandlerStaticMethod(state.routes, 'routerWillRun', routeHandlerInfo);

        React.render((() => {
            /*
            <FluxComponent flux={flux}>
                <Handler {...state} />
            </FluxComponent>
            */}),
            document.getElementById('react_app')
        );
    });

    document.onclick = event => {
        var target = <Element>(event.target);

        if (!target) return;

        if (target.tagName !== 'A') return;


        var href = target.getAttribute('href');

        if (!href) return;

        var resolvedHref = nodejs.url.resolve(window.location.href, href);
        var urlParts: { host; path } = url.parse(resolvedHref, undefined, undefined);

        if (urlParts.host === window.location.host) {
            event.preventDefault();
            router.transitionTo(urlParts.path, undefined, undefined);
        }
    };
}

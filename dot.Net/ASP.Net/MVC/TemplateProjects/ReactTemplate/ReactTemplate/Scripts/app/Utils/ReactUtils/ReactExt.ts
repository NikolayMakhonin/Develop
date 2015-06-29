///<reference path="../../../typings/react/react.d.ts"/>

module App.Utils.ReactUtils.ReactExt {
    import ReactComponentSpec = React.ReactComponentSpec;
    import ReactClass = React.ReactClass;

    function specToObject<P, S>(spec: ReactComponentSpec<P, S>): any {
        var obj = {};
        for (var key in spec) {
            if (!(key in obj)) {
                obj[key] = spec[key];
            }
        }
        return obj;
    }

    export function createClass<P, S>(spec: ReactComponentSpec<P, S>): ReactClass<P, S> {
        return React.createClass(specToObject(spec));
    }

} 
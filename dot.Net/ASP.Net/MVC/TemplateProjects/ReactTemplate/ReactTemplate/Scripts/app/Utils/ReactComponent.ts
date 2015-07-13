///<reference path="../../typings/react.d.ts"/>

module app.utils {

    import React = nodejs.react.React;
    (<any>utils).ReactComponent = React.createClass({
        react: (): any => { }
    });

    export declare class ReactComponent<TProps, TState> {
        //#region React.createClass(...)
        constructor(props: TProps, context?);
        getDOMNode();
        props;
        context;
        state: any;
        render();
        mixins: any;
        statics: any;
        propTypes: any;
        contextTypes: any;
        childContextTypes: any;
        getDefaultProps: any;
        getInitialState: any;
        getChildContext: any;
        updateComponent: any;
        setState(partialState, callback);
        forceUpdate(callback);
        replaceState(newState, callback);
        isMounted();
        setProps(partialProps, callback);
        replaceProps(newProps, callback);
        //#endregion

        //#region ReactComponent<TProps, TState>
        react: () => any;
        refs: { [ref: string]: ReactComponent<any, any>; }
        /**
         * If this component has been mounted into the DOM, this returns the corresponding native browser DOM element. 
         * This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements.
         */
        getDOMNode(): Element;

        /**
         * When you're integrating with an external JavaScript application you may want to signal a change to a React component rendered with renderComponent(). 
         * Simply call setProps() to change its properties and trigger a re-render.
         * 
         * @param nextProps the object that will be merged with the component's props
         * @param callback an optional callback function that is executed once setProps is completed.
         */
        setProps(nextProps: TProps, callback?: () => void): void;

        /**
         * Like setProps() but deletes any pre-existing props instead of merging the two objects.
         * 
         * @param nextProps the object that will replace the component's props
         * @param callback an optional callback function that is executed once replaceProps is completed.
         */
        replaceProps(nextProps: TProps, callback?: () => void): void;

        /**
         * Transfer properties from this component to a target component that have not already been set on the target component. 
         * After the props are updated, targetComponent is returned as a convenience. 
         * 
         * @param target the component that will receive the props
         */
        transferPropsTo<C extends ReactComponent<TProps, any>>(target: C): C;

        /**
         * Merges nextState with the current state. 
         * This is the primary method you use to trigger UI updates from event handlers and server request callbacks. 
         * In addition, you can supply an optional callback function that is executed once setState is completed.
         * 
         * @param nextState the object that will be merged with the component's state
         * @param callback an optional callback function that is executed once setState is completed.
         */
        setState(nextState: TState, callback?: () => void): void;

        /**
         * Like setState() but deletes any pre-existing state keys that are not in nextState.
         * 
         * @param nextState the object that will replace the component's state
         * @param callback an optional callback function that is executed once replaceState is completed.
         */
        replaceState(nextState: TState, callback?: () => void): void;

        /**
         * If your render() method reads from something other than this.props or this.state, 
         * you'll need to tell React when it needs to re-run render() by calling forceUpdate(). 
         * You'll also need to call forceUpdate() if you mutate this.state directly.
         * Calling forceUpdate() will cause render() to be called on the component and its children, 
         * but React will still only update the DOM if the markup changes.
         * Normally you should try to avoid all uses of forceUpdate() and only read from this.props and this.state in render(). 
         * This makes your application much simpler and more efficient.
         * 
         * @param callback an optional callback that is executed once forceUpdate is completed.
         */
        forceUpdate(callback?: () => void): void;
        //#endregion

        //#region ReactComponentSpec<TProps, TState>
        /**
         * Invoked immediately before rendering occurs. 
         * If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.
         */
        componentWillMount(): void;

        /**
         * Invoked immediately after rendering occurs. 
         * At this point in the lifecycle, the component has a DOM representation which you can access via the rootNode argument or by calling this.getDOMNode().
         * If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval, 
         * or send AJAX requests, perform those operations in this method.
         */
        componentDidMount(): void;

        /**
         * Invoked when a component is receiving new props. This method is not called for the initial render.
         * 
         * Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). 
         * The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
         * 
         * @param nextProps the props object that the component will receive
         */
        componentWillReceiveProps(nextProps: TProps): void;

        /**
         * Invoked before rendering when new props or state are being received. 
         * This method is not called for the initial render or when forceUpdate is used.
         * Use this as an opportunity to return false when you're certain that the transition to the new props and state will not require a component update.
         * By default, shouldComponentUpdate always returns true to prevent subtle bugs when state is mutated in place, 
         * but if you are careful to always treat state as immutable and to read only from props and state in render() 
         * then you can override shouldComponentUpdate with an implementation that compares the old props and state to their replacements.
         * 
         * If performance is a bottleneck, especially with dozens or hundreds of components, use shouldComponentUpdate to speed up your app.
         * 
         * @param nextProps the props object that the component will receive
         * @param nextState the state object that the component will receive
         */
        shouldComponentUpdate(nextProps: TProps, nextState: TState): boolean;

        /**
         * Invoked immediately before rendering when new props or state are being received. This method is not called for the initial render.
         * Use this as an opportunity to perform preparation before an update occurs.
         * 
         * @param nextProps the props object that the component has received
         * @param nextState the state object that the component has received
         */
        componentWillUpdate(nextProps: TProps, nextState: TState): void;

        /**
         * Invoked immediately after updating occurs. This method is not called for the initial render.
         * Use this as an opportunity to operate on the DOM when the component has been updated.
         * 
         * @param nextProps the props object that the component has received
         * @param nextState the state object that the component has received
         */
        componentDidUpdate(nextProps: TProps, nextState: TState): void;

        /**
         * Invoked immediately before a component is unmounted from the DOM.
         * Perform any necessary cleanup in this method, such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount.
         */
        componentWillUnmount(): void;
        //#endregion
    }

} 
///<reference path="../../typings/TypeScriptUtils.d.ts"/>

module App.Stores {
    import QuantizedEventHandler = mika.utils.Async.Events.QuantizedEventHandler;
    import IQuantizedEventHandler = mika.utils.Events.IQuantizedEventHandler;
    import DeferredAction = mika.utils.Threads.DeferredAction;
    import IQuantFunc = mika.utils.Async.Quants.IQuantFunc;

    export class BaseStore<T extends BaseStore<any>> {

        private _deferredOnChanged: DeferredAction;

        constructor() {
            this._deferredOnChanged = new DeferredAction([this._onChanged], 100);
        }
        
        private _changed = new QuantizedEventHandler<T>();

        changed(): IQuantizedEventHandler<T> {
            return this._changed;
        }

        private _onChanged(): IQuantFunc[] {
            return this._changed.invoke(this, null);
        }

        private onChanged() {
            this._deferredOnChanged.Execute();
        }

    }

} 
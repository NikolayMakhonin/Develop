///<reference path="../../typings/TypeScriptUtils.d.ts"/>

module App.Stores {
    import QuantizedEventHandler = mika.utils.Async.Events.QuantizedEventHandler;
    import IQuantizedEventHandler = mika.utils.Events.IQuantizedEventHandler;

    export class BaseStore<T extends BaseStore<any>> {
        
        private _changed = new QuantizedEventHandler<T>();
        changed(): IQuantizedEventHandler<T> {
            return this._changed;
        }

    }

} 
///<reference path="../../typings/TypeScriptUtils.d.ts"/>

module App.Dispatchers {
    import QuantizedEventHandler = mika.utils.Async.Events.QuantizedEventHandler;

    export class AppDispatcher {
        
        private _events: QuantizedEventHandler<any> = new QuantizedEventHandler();

        events(): QuantizedEventHandler<any> {
            return this._events;
        }

    }

}

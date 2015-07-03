///<reference path="../../../typings/TypeScriptUtils.d.ts"/>

module PersonActions {
    export module Phones {
        import QuantizedEventHandler = mika.utils.Async.Events.QuantizedEventHandler;
        export var Add = new QuantizedEventHandler<any>();
        export var Remove = new QuantizedEventHandler<{ personId: number; phoneIndex: number }>();
        export var Update = new QuantizedEventHandler<{ personId: number; phoneIndex: number; data: any }>();
    }
} 
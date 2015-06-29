///<reference path="BaseStore.ts"/>

module App.Stores {
    import ISet = mika.utils.List.ISet;

    export class BaseListStore<TItem> extends BaseStore<BaseListStore<TItem>> {
        
        private _items: ISet<TItem>;        
        
        getItems(): ISet<TItem> {
            return this._items;
        }        
    }

} 
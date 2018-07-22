class AIDataAsset implements IDisposable, IClearable
{
    private _dataAsset: Array<FrameSyncServerData>;

    // public get DataAsset()
    // {
    //     return this._dataAsset;
    // }

    public get Size():number
    {
        return this._dataAsset.length;
    }

    public constructor()
    {
        this._dataAsset = [];
    }

    public Dispose()
    {
        this._dataAsset.slice(0, this._dataAsset.length);
        this._dataAsset = null;
    }

    public Clear(): void
    {
        this._dataAsset.slice(0, this._dataAsset.length);
    }

    public Add(data:FrameSyncServerData):void
    {
        this._dataAsset.push(data);
    }

    public Get(index:number):FrameSyncServerData
    {
        if (index >= 0 && index < this._dataAsset.length)
        {
            return this._dataAsset[index];
        }
        return null;
    }

}

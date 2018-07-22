class AIDataAsset implements IDisposable, IClearable
{
    //private _dataAsset: FrameSyncServerDataAsset;
    private _dataAsset: Array<FrameSyncServerData>;

    public get DataAsset()
    {
        return this._dataAsset;
    }

    public constructor()
    {
        this._dataAsset = [];//new FrameSyncServerDataAsset();
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

}

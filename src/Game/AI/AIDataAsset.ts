class AIDataAsset implements IDisposable
{
    private _dataAsset: FrameSyncServerDataAsset;

    public get DataAsset()
    {
        return this._dataAsset;
    }

    public constructor()
    {
        this._dataAsset = new FrameSyncServerDataAsset();
    }

    public Dispose()
    {
        this._dataAsset.Clear();
        this._dataAsset = null;
    }

}

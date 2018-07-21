class AIDataAsset
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

    public Release()
    {
        this._dataAsset.Clear();
        this._dataAsset = null;
    }

}

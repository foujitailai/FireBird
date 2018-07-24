class AIDataAsset implements IDisposable, IClearable
{
    private _dataAsset: Array<FrameSyncServerData>;

    public get DataAsset()
    {
        return this._dataAsset;
    }

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
        this._dataAsset.splice(0, this._dataAsset.length);
        this._dataAsset = null;
    }

    public Clear(): void
    {
        for (let i:number=0; i < this._dataAsset.length; ++i)
        {
            this.Give(this._dataAsset[i]);
        }

        this._dataAsset.splice(0, this._dataAsset.length);
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

    /**
     * 取一个新数据出来进行操作
     * @returns {FrameSyncServerData}
     */
    public Take():FrameSyncServerData
    {
        return Pool.Get(FrameSyncServerData);
    }

    /**
     * 翻译一个数据
     * @param {FrameSyncServerData} data
     */
    public Give(data:FrameSyncServerData)
    {
        return Pool.Free(data);
    }

}

class FrameSyncServerDataAsset implements IDisposable, IClearable
{
    private _datas: Map<number, Array<FrameSyncServerData>>;
    private _frame: number;

    public constructor()
    {
        this._datas = new Map<number, Array<FrameSyncServerData>>();
        this._frame = 0;
    }

    public Dispose()
    {
        this._frame = 0;
        this._datas.clear();
        this._datas = null;
    }

    public Clear()
    {
        this._frame = 0;
        this._datas.clear();
    }

    /**
     * 增长同步帧索引
     */
    public IncreaseFrame()
    {
        ++this._frame;
    }

    /**
     * 同步帧索引
     * @returns {number}
     */
    public get Frame():number
    {
        return this._frame;
    }

    public AddFrame(frame: number)
    {
        let frameData = this._datas.get(frame);
        if (!frameData)
        {
            this._datas.set(frame, []);
        }
    }

    public DeleteFrame(frame: number)
    {
        let frameData = this._datas.get(frame);
        if (frameData)
        {
            for (let i:number = 0; i < frameData.length; ++i)
            {
                this.Give(frameData[i]);
            }
            frameData.splice(0, frameData.length);
            this._datas.delete(frame);
        }
    }

    public AddData(frame: number, data: FrameSyncServerData)
    {
        let frameData = this._datas.get(frame);
        if (frameData)
        {
            frameData.push(data);
        }
    }

    public GetFrameData(frame: number): Array<FrameSyncServerData>
    {
        return this._datas.get(frame);
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

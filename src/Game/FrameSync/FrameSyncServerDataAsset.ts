class FrameSyncServerDataAsset implements IDisposable, IClearable
{
    private _datas: Map<number, Array<FrameSyncServerData>>;

    public constructor()
    {
        this._datas = new Map<number, Array<FrameSyncServerData>>();
    }

    public Dispose()
    {
        this._datas.clear();
        this._datas = null;
    }

    public Clear()
    {
        this._datas.clear();
    }

    public AddFrame(frame: number)
    {

    }

    public DeleteFrame(frame: number)
    {

    }

    public AddData(frame: number, data: FrameSyncServerData)
    {

    }

    public GetFrameData(frame: number): Array<FrameSyncServerData>
    {
        return null;
    }

}

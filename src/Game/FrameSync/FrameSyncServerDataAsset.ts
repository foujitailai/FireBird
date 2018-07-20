class FrameSyncServerDataAsset
{
    private _datas: Map<number, Array<FrameSyncServerData>>;

    public Clear() {}

    public AddFrame(frame: number) {}

    public DeleteFrame(frame: number) {}

    public AddData(frame: number, data: FrameSyncServerData) {}

    public GetFrameData(frame: number): Array<FrameSyncServerData> {return null;}

    Release()
    {

    }
}
class FrameSyncClient implements IDisposable
{
    private _requestData: FrameSyncClientRequestData;

    public constructor()
    {
        this._requestData = new FrameSyncClientRequestData();
    }

    public get RequestData()
    {
        return this._requestData;
    }

    public Dispose()
    {

    }

    public ClearData()
    {
        this._requestData.Clear();
    }

    public OnUpdate(delta)
    {

    }

    public Start()
    {

    }

    public Stop()
    {

    }
}

class FrameSyncClient
{
    private _requestData: FrameSyncClientRequestData;

    public get RequestData() {return this._requestData;}

    public constructor()
    {
        this._requestData = new FrameSyncClientRequestData();
    }

    public Release()
    {

    }

    public ClearData()
    {
        this._requestData.Clear();
    }

    public OnUpdate(delta)
    {

    }

    Start()
    {

    }

    Stop()
    {

    }
}
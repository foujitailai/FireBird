
class FrameSyncModule
{
    private _client:FrameSyncClient;
    private _server:FrameSyncServer;
    private _running: boolean;
    public get Client(){return this._client;}
    public get Server(){return this._server;}

    public constructor()
    {
        this._client = new FrameSyncClient();
        this._server = new FrameSyncServer();
    }

    public Release()
    {
        this._client.Release();
        this._server.Release();
    }

    public ClearData()
    {
        this._client.ClearData();
        this._server.ClearData();
    }

    public Start(isSingle:boolean)
    {
        if (this._running)
        {
            return;
        }

        this._running = true;
        this._client.Start();
        this._server.Start(isSingle);
    }

    public Stop()
    {
        if (!this._running)
        {
            return;
        }

        this._client.Stop();
        this._server.Stop();
        this._running = false;
    }

    public OnUpdate(delta)
    {
        if (this._running)
        {
            this._client.OnUpdate(delta);
            this._server.OnUpdate(delta);
        }
    }
}

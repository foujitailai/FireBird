class FrameSyncModule
{
    private _client: FrameSyncClient;
    private _server: FrameSyncServer;
    private _running: boolean;

    public constructor()
    {
        this._client = new FrameSyncClient();
        this._server = new FrameSyncServer();
    }

    public get Client()
    {
        return this._client;
    }

    public get Server()
    {
        return this._server;
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

    public SetHandle(renderHandle: Function, frameHandle: Function): void
    {
        this._server.SetHandle(renderHandle, frameHandle);
    }

    public Start(isSingle: boolean)
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

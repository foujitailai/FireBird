class FrameSyncModule implements IModule
{
    private static _className: string;

    public get Name(): string
    {
        if (!FrameSyncModule._className)
        {
            FrameSyncModule._className = ClassTool.GetTypeName(FrameSyncModule);
        }
        return FrameSyncModule._className;
    }

    private _client: FrameSyncClient;
    private _server: FrameSyncServer;
    private _running: boolean;

    public get Client()
    {
        return this._client;
    }

    public get Server()
    {
        return this._server;
    }

    public constructor()
    {
        this._client = new FrameSyncClient();
        this._server = new FrameSyncServer();
    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
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

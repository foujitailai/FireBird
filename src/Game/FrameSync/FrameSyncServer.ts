class FrameSyncServer
{
    private _dataAsset: FrameSyncServerDataAsset;
    private _curServer: IFrameSyncServerImpl;
    private _proxy: FrameSyncServerProxy;
    private _simulater: FrameSyncServerSimulater;

    public get DataAsset() {return this._dataAsset;}

    public constructor()
    {
        this._dataAsset = new FrameSyncServerDataAsset();
        this._proxy = new FrameSyncServerProxy();
        this._simulater = new FrameSyncServerSimulater();
    }

    public Release()
    {
        this._dataAsset.Release();
        this._proxy = new FrameSyncServerProxy();
        this._simulater = new FrameSyncServerSimulater();
    }

    public ClearData()
    {
        this._dataAsset.Clear();
        this._curServer.Clear();
    }

    public OnUpdate(delta)
    {
        if (this._curServer)
        {
            this._curServer.OnUpdate(delta);
        }
    }

    Start(isSingle: boolean)
    {
        if (this._curServer)
        {
            return;
        }
        this._curServer = isSingle ? this._simulater : this._proxy;
        this._curServer.Start();
    }

    Stop()
    {
        if (!this._curServer)
        {
            return;
        }
        this._curServer.Stop();
        this._curServer = null;
    }
}
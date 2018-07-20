class FrameSyncServer
{
    private _dataAsset: FrameSyncServerDataAsset;
    private _curServer: IFrameSyncServerImpl;
    private _proxy: FrameSyncServerProxy;
    private _simulater: FrameSyncServerSimulater;

    public constructor()
    {
        this._dataAsset = new FrameSyncServerDataAsset();
        this._proxy = new FrameSyncServerProxy(this._dataAsset);
        this._simulater = new FrameSyncServerSimulater(this._dataAsset);
    }

    public get DataAsset()
    {
        return this._dataAsset;
    }

    public Release()
    {
        this._dataAsset.Release();
        this._proxy.Release();
        this._simulater.Release();
    }

    public ClearData()
    {
        this._dataAsset.Clear();
        this._curServer.Clear();
    }

    public SetHandle(renderHandle: Function, frameHandle: Function): void
    {
        this._proxy.SetHandle(renderHandle, frameHandle);
        this._simulater.SetHandle(renderHandle, frameHandle);
    }

    public OnUpdate(delta)
    {
        if (this._curServer)
        {
            this._curServer.OnUpdate(delta);
        }
    }

    public Start(isSingle: boolean)
    {
        if (this._curServer)
        {
            return;
        }
        this._curServer = isSingle ?
            this._simulater :
            this._proxy;
        this._curServer.Start();
    }

    public Stop()
    {
        if (!this._curServer)
        {
            return;
        }
        this._curServer.Stop();
        this._curServer = null;
    }
}

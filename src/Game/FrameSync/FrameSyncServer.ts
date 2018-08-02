class FrameSyncServer implements IDisposable
{
    private _dataAsset: FrameSyncServerDataAsset;
    private _curServer: IFrameSyncServerImpl;
    private _proxy: FrameSyncServerProxy;
    private _simulator: FrameSyncServerSimulator;

    public constructor()
    {
        this._dataAsset = new FrameSyncServerDataAsset();
        this._proxy = new FrameSyncServerProxy(this._dataAsset);
        this._simulator = new FrameSyncServerSimulator(this._dataAsset);
    }

    public get DataAsset()
    {
        return this._dataAsset;
    }

    public Dispose()
    {
        this._dataAsset.Dispose();
        this._dataAsset = null;
        this._proxy.Dispose();
        this._proxy = null;
        this._simulator.Dispose();
        this._simulator = null;
    }

    public ClearData()
    {
        this._dataAsset.Clear();
        this._curServer.Clear();
    }

    public SetHandle(renderHandle: Function, frameHandle: Function): void
    {
        this._proxy.SetHandle(renderHandle, frameHandle);
        this._simulator.SetHandle(renderHandle, frameHandle);
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
            this._simulator :
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

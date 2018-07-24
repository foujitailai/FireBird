class FrameSyncServerSimulater implements IFrameSyncServerImpl
{
    private _renderHandle: Function;
    private _frameHandle: Function;
    private _dataAsset: FrameSyncServerDataAsset;

    public constructor(dataAsset: FrameSyncServerDataAsset)
    {
        this._dataAsset = dataAsset;
    }

    public Dispose()
    {
        this._dataAsset = null;
    }

    public Clear(): void
    {
    }

    public Start(): void
    {
        let fsClient = ModuleCenter.Get(FrameSyncModule).Client;
        fsClient.addEventListener(FrameSyncEvent.CLIENT_SEND, this.OnClientSend, this);
    }

    public Stop(): void
    {
        let fsClient = ModuleCenter.Get(FrameSyncModule).Client;
        fsClient.removeEventListener(FrameSyncEvent.CLIENT_SEND, this.OnClientSend, this);
    }

    public SetHandle(renderHandle: Function, frameHandle: Function): void
    {
        this._renderHandle = renderHandle;
        this._frameHandle = frameHandle;
    }

    private _testFrame:number=0;
    public OnUpdate(delta: number): void
    {
        //TODO 还没有真正的去实现帧同步的代码，只是简单的让流程先跑起来
        this._frameHandle.apply(null, [++this._testFrame, this._dataAsset]);
        this._renderHandle.apply(null, [delta, 1, false]);
    }

    private OnClientSend(event:egret.Event)
    {
        let reqData:FrameSyncClientRequestData = event.data;
        // 接收到客户端要发送的数据，直接把这个数据转成本地的接收到的帧数据
        if (!reqData)
        {
            return;
        }

        this._dataAsset.IncreaseFrame();
        let frame = this._dataAsset.Frame;
        this._dataAsset.AddFrame(frame);

        if (reqData.Fire && reqData.Fire.Fire)
        {
            let fsData = this._dataAsset.Take();
            fsData.SetFire(reqData.Fire.Id);

            // 帧数据加入到帧集合里面，通过FrameSyncServerSimulater.OnUpdate来进行逻辑帧派发
            this._dataAsset.AddData(frame, fsData);
        }
    }
}

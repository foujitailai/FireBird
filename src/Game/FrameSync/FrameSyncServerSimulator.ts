class FrameSyncServerSimulator implements IFrameSyncServerImpl
{
    private _renderHandle: Function;
    private _frameHandle: Function;
    private _dataAsset: FrameSyncServerDataAsset;
    /**
     * 从游戏开始，当前执行到第几个逻辑帧
     */
    private _frame: number;
    /**
     * 从当前逻辑帧开始，过去了多少时间
     */
    private _time: number;
    /**
     * 从当前逻辑帧开始，过去了多少渲染时间
     */
    private _renderTime: number;
    /**
     * 从游戏开始，过去了多少渲染时间
     */
    private _curRenderTime: number;
    /**
     * 从游戏开始，最后一次渲染的时间
     */
    private _lastRenderTime: number;

    public constructor(dataAsset: FrameSyncServerDataAsset)
    {
        this._dataAsset = dataAsset;

        this._frame = 0;
        this._time = 0;
        this._renderTime = 0;
        this._curRenderTime = 0;
        this._lastRenderTime = 0;
    }

    public Dispose()
    {
        this._dataAsset = null;

        this.Clear();
    }

    public Clear(): void
    {
        this._frame = 0;
        this._time = 0;
        this._renderTime = 0;
        this._curRenderTime = 0;
        this._lastRenderTime = 0;
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

    public OnUpdate(delta: number): void
    {
        // 时间偏移
        this._time += delta;
        this._renderTime += delta;
        this._curRenderTime += delta;

        // 逻辑帧
        if (this._time >= EnumFrameSyncDefine.FRAME_TIME)
        {
            // 去掉逻辑帧消耗的时间
            this._time -= EnumFrameSyncDefine.FRAME_TIME;
            // 当前要执行的逻辑帧在帧集合缓冲里面是否存在？
            if (this._frame <= this._dataAsset.Frame)
            {
                // 帧计数加1
                let lastFrame = this._frame++;
                // 执行逻辑帧
                this._frameHandle(lastFrame, this._dataAsset);
                // 删除已经执行过了的逻辑帧数据
                this._dataAsset.DeleteFrame(lastFrame);
                // 本帧渲染时间清零，重新开始
                this._renderTime = 0;
            }
        }

        // 渲染帧
        // 当前渲染帧在逻辑帧内的时间长度
        let timeOffsetInOneFrame = (this._renderTime > EnumFrameSyncDefine.FRAME_TIME) ?
            EnumFrameSyncDefine.FRAME_TIME :
            this._renderTime;
        // 当前渲染帧在逻辑帧内的进度比值(0-1)
        let progress = timeOffsetInOneFrame / EnumFrameSyncDefine.FRAME_TIME;
        // 两个渲染帧之间的时间间隔
        let renderDelta = this._curRenderTime - this._lastRenderTime;
        // 执行渲染帧
        this._renderHandle(renderDelta, progress, false);
        // 记录渲染帧时间
        this._lastRenderTime = this._curRenderTime;
    }

    private OnClientSend(event: egret.Event)
    {
        // 接收到客户端要发送的数据，直接把这个数据转成本地的接收到的帧数据
        let reqData: FrameSyncClientRequestData = event.data;
        if (!reqData)
        {
            return;
        }

        // 帧集合缓冲内增加一帧
        this._dataAsset.IncreaseFrame();
        let frame = this._dataAsset.Frame;
        this._dataAsset.AddFrame(frame);

        // 有发射子弹事件吗？
        if (reqData.Fire && reqData.Fire.Fire)
        {
            let fsData = this._dataAsset.Take();
            fsData.SetFire(reqData.Fire.Id);

            // 帧数据加入到帧集合里面，通过FrameSyncServerSimulator.OnUpdate来进行逻辑帧派发
            this._dataAsset.AddData(frame, fsData);
        }
    }
}

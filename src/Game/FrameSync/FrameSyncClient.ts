class FrameSyncClient extends egret.EventDispatcher implements IDisposable
{
    private _requestData: FrameSyncClientRequestData;
    private _time: number;
    private _isSingle: boolean;

    public constructor()
    {
        super();

        this._requestData = new FrameSyncClientRequestData();
        this._time = 0;
    }

    public get RequestData() : FrameSyncClientRequestData
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
        this._time += delta;
        if (this._time >= EnumFrameSyncDefine.FRAME_TIME)
        {
            this._time %= EnumFrameSyncDefine.FRAME_TIME;

            // 发送单帧操作请求
            EventTool.Disp(this, FrameSyncEvent.CLIENT_SEND, this._requestData);

            // 清除本帧数据
            this._requestData.Clear();
        }
    }

    public Start(isSingle: boolean)
    {
        this._isSingle = isSingle;
        if (!this._isSingle)
        {
            this.addEventListener(FrameSyncEvent.CLIENT_SEND, this.OnClientSend, this);
        }
    }


    public Stop()
    {
        if (!this._isSingle)
        {
            this.removeEventListener(FrameSyncEvent.CLIENT_SEND, this.OnClientSend, this);
        }
        this._isSingle = false;
    }


    private OnClientSend(reqData:FrameSyncClientRequestData)
    {
        if (!reqData)
        {
            return;
        }

        reqData.Fire;
        //TODO 网络底层发送数据到服务器
    }
}

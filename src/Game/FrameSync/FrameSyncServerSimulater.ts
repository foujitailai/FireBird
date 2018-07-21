class FrameSyncServerSimulater implements IFrameSyncServerImpl
{
    private _renderHandle: Function;
    private _frameHandle: Function;
    private _dataAsset: FrameSyncServerDataAsset;

    public constructor(dataAsset: FrameSyncServerDataAsset)
    {
        this._dataAsset = dataAsset;
    }

    Dispose()
    {

    }

    Clear(): void
    {
    }

    SetHandle(renderHandle: Function, frameHandle: Function): void
    {
        this._renderHandle = renderHandle;
        this._frameHandle = frameHandle;
    }

    OnUpdate(delta: number): void
    {
        //TODO 还没有真正的去实现帧同步的代码，只是简单的让流程先跑起来
        this._frameHandle.apply(null, [1, this._dataAsset]);
        this._renderHandle.apply(null, [delta, 1, false]);
    }

    Start(): void
    {
    }

    Stop(): void
    {
    }
}

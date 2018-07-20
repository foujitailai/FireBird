class FrameSyncServerProxy implements IFrameSyncServerImpl
{
    private _renderHandle:Function;
    private _frameHandle:Function;
    private _dataAsset: FrameSyncServerDataAsset;

    public constructor(dataAsset:FrameSyncServerDataAsset)
    {
        this._dataAsset = dataAsset;
    }

    Clear(): void
    {
    }

    SetHandle(renderHandle: Function, frameHandle: Function): void
    {
    }

    OnUpdate(delta: number): void
    {
    }

    Start(): void
    {
    }

    Stop(): void
    {
    }

    Release()
    {

    }
}

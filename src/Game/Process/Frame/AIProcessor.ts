class AIProcessor implements IFrameProcessor
{
    private _ais: Map<number, AIStateMachine>;
    private _data: AIDataAsset;

    public constructor()
    {
        this._data = new AIDataAsset();
        this._ais = new Map<number, AIStateMachine>();
    }

    public Dispose()
    {
        this._data.Dispose();
        this._data = null;
        this._ais.clear();
        this._ais = null;
    }

    public OnFrameSync(frame: number, data: FrameSyncServerDataAsset): void
    {
    }

}

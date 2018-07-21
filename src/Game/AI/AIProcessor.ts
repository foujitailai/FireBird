class AIProcessor implements IBattleProcessor
{
    private _ais: Map<number, AIStateMachine>;
    private _data: AIDataAsset;

    public constructor()
    {
        this._data = new AIDataAsset();
        this._ais = new Map<number, AIStateMachine>();
    }

    public Release()
    {
        this._data.Release();
        this._data = null;
        this._ais.clear();
        this._ais = null;
    }

    public OnFrameSync(frame: number): void
    {
    }

}

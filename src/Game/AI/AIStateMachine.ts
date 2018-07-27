class AIStateMachine extends egret.EventDispatcher implements IDisposable
{
    private _id: number;
    private _param: AIParam;
    private _dataAsset: AIDataAsset;
    private _sm: StateMachine<AIStateBase>;

    public constructor(id: number, param: AIParam, dataAsset: AIDataAsset)
    {
        super();

        this._id = id;
        this._param = param;
        this._dataAsset = dataAsset;

        this._sm = new StateMachine<AIStateBase>();

        this.Add(AIStateNormal);
        this.Add(AIStateDead);
        this.Add(AIStatePatrol);


        this.addEventListener(BattleEvent.FIRE, this.OnAIProcessFire, this);


        this.Change(AIStateNormal);
    }

    public Dispose()
    {
        this._sm.Dispose();
        this._sm = null;
    }

    private Add<T extends AIStateBase>(t: { new(): T }): void
    {
        let state = this._sm.Add(t);
        state.Initialize(this);
    }

    public Change<T extends AIStateBase>(t: { new(): T }): void
    {
        this._sm.Change(t);
    }

    public OnFrameAIProcess()
    {
        let state = this._sm.State;
        if (state)
        {
            state.DoAIProcess();
        }
    }

    private OnAIProcessFire()
    {
        let data = this._dataAsset.Take();
        data.SetFire(this._id);
        this._dataAsset.Add(data);
    }

}




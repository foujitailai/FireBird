class AIProcessor implements IFrameProcessor
{
    /**
     * AI处理的帧间隔（每n帧处理一次）
     */
    private static _aiProcessIntervalFrame = 3;

    private _ais: Map<number, AIStateMachine>;
    private _data: AIDataAsset;
    private _battleData: BattleData;

    public constructor()
    {
        this._data = new AIDataAsset();
        this._ais = new Map<number, AIStateMachine>();
        this._battleData = ModuleCenter.Get(BattleModule).Data;
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
        // 添加删除相关操作
        let cancelAI = this._battleData.Context.AI.ActorsCancelAI;
        let setAI = this._battleData.Context.AI.ActorsSetAI;

        if (cancelAI && cancelAI.size > 0)
        {
            cancelAI.forEach((a) => this.CancelAI(a));
            cancelAI.clear();
        }

        if (setAI && setAI.size > 0)
        {
            setAI.forEach((a) => this.SetAI(a));
            setAI.clear();
        }

        // 更新 AI，生成操作帧数据
        if ((frame % AIProcessor._aiProcessIntervalFrame) == 0)
        {
            // 清空上一帧的 AI 操作
            this._data.Clear();
            this._ais.forEach(v =>
            {
                v.OnFrameAIProcess();
            })
        }
    }

    private SetAI(actorId: number)
    {
        let param = new AIParam(false);
        let sm = new AIStateMachine(actorId, param, this._data);
        this._ais.set(actorId, sm);
    }

    private CancelAI(actorId: number)
    {
        let sm = this._ais.get(actorId);
        if (sm)
        {
            sm.Dispose();
        }
        this._ais.delete(actorId);
    }
}

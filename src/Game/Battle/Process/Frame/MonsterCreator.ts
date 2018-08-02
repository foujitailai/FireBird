class MonsterCreator implements IDisposable
{
    private _createMonsterTimer: egret.Timer;
    private _battle: Battle;
    private _monsterMax: number = 0;
    private _data: BattleData;

    public constructor(battle: Battle)
    {
        this._battle = battle;
        this._data = ModuleCenter.Get(BattleModule).Data;

        //TODO 如何可以将这个定时器与 Battle 关联在一起，目标是：当pause 的时候，就会将定时器也定住！
        this._createMonsterTimer = new egret.Timer(2000);
        this._createMonsterTimer.addEventListener(egret.TimerEvent.TIMER, this.OnCreateMonster, this);
    }

    public Dispose()
    {
        this._createMonsterTimer.stop();
        this._createMonsterTimer = null;
    }

    public Start()
    {
        this._createMonsterTimer.start();
    }

    public Stop()
    {
        this._createMonsterTimer.stop();
    }

    private OnCreateMonster()
    {
        if (this._data.Context.MonsterCount < this._monsterMax)
        {
            let actorId = this._data.Context.GenerateActorId();
            let actorData = new ActorData(actorId, EnumActorType.Npc, 1);
            this._data.Context.AddActor(actorId, actorData);

            let actor = this._battle.GameSceneContent.CreateActor(actorData);
            actor.SetPosition(500, 100);
            actor.SyncInitialize();

            // 开启 AI
            this._data.Context.AI.SetAI(actor.Data.ActorId);
        }
    }
}

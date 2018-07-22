class MonsterCreator implements IDisposable
{
    private _createMonsterTimer: egret.Timer;
    private _battle: Battle;
    private _monsterMax:number=3;

    public constructor(battle: Battle)
    {
        this._battle = battle;

        //TODO 如何可以将这个定时器与 Battle 关联在一起，目标是：当puase 的时候，就会将定时器也定住！
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
        if (this._battle.GameSceneContent.ActorMgr.MonsterCount < this._monsterMax)
        {
            this._battle.GameSceneContent.CreateMonster();
        }
    }
}

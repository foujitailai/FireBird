class MonsterCreator
{
    private _createMonsterTimer: egret.Timer;
    private _battle: Battle;

    public constructor(battle: Battle)
    {
        this._battle = battle;

        this._createMonsterTimer = new egret.Timer(2000);
        this._createMonsterTimer.addEventListener(egret.TimerEvent.TIMER, this.OnCreateMonster, this);
    }

    public Release()
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
        if (this._battle.GameSceneContent.ActorMgr.MonsterCount < 10)
        {
            this._battle.GameSceneContent.CreateMonster();
        }
    }
}

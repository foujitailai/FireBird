class BattleOperation implements IDisposable
{
    private _data:BattleData;
    private _fsClient: FrameSyncClient;
    private _battle: Battle;

    public constructor(battle:Battle)
    {
        this._battle = battle;
        this._data = ModuleCenter.Get(BattleModule).Data;
        this._fsClient = ModuleCenter.Get(FrameSyncModule).Client;

        this._battle.addEventListener(GameEvent.FIRE, this.OnFire, this);
    }

    public Dispose(): void
    {
        this._battle.removeEventListener(GameEvent.FIRE, this.OnFire, this);

        this._data = null;
        this._fsClient = null;
    }

    private OnFire(): void
    {
        this._fsClient.RequestData.SetFire(this._data.Context.SelfId,true);
        // this._gameSceneContent.CreateBullet(this._gameSceneContent.ActorMgr.SelfActor);
        // this.OnJump();
    }

}
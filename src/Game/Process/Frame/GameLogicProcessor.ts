
class GameLogicProcessor implements IFrameProcessor
{
    private _monsterCreator: MonsterCreator;
    private _battle: Battle;
    private _data: BattleData;

    public constructor(battle:Battle)
    {
        this._data =  ModuleCenter.Get(BattleModule).Data;
        this._battle = battle;
        this._monsterCreator = new MonsterCreator(this._battle);
        this._monsterCreator.Start();


        this.CreateSelf();
    }

    public Dispose()
    {
        this._monsterCreator.Dispose();
        this._monsterCreator = null;
    }

    public OnFrameSync(frame: number, data: FrameSyncServerDataAsset): void
    {
    }

    private CreateSelf()
    {
        let actorData = this._data.Context.GetActor(this._data.Context.SelfId);
        let self = this._battle.GameSceneContent.CreateActor(actorData);
        self.SetPosition(100, 500);

    }
}

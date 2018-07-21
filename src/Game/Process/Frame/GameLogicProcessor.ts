
class GameLogicProcessor implements IFrameProcessor
{
    private _monsterCreator: MonsterCreator;
    private _battle: Battle;

    public constructor(battle:Battle)
    {
        this._battle = battle;
        this._monsterCreator = new MonsterCreator(this._battle);
        this._monsterCreator.Start();
    }

    public Dispose()
    {
        this._monsterCreator.Dispose();
        this._monsterCreator = null;
    }

    public OnFrameSync(frame: number, data: FrameSyncServerDataAsset): void
    {
    }
}

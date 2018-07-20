
class BattleLogic
{
    private _monsterCreator: MonsterCreator;
    private _battle: Battle;

    public constructor(battle:Battle)
    {
        this._battle = battle;
        this._monsterCreator = new MonsterCreator(this._battle);
        this._monsterCreator.Start();
    }

    public Release()
    {
        this._monsterCreator.Release();
        this._monsterCreator = null;
    }

    public OnUpdate(delta: number)
    {
    }
}

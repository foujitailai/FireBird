
class BattleBehavior implements IDisposable
{
    private _battleOperation: BattleOperation;

    public constructor(battle:Battle)
    {
        this._battleOperation = new BattleOperation(battle);
    }

    public Dispose(): void
    {
        this._battleOperation.Dispose();
        this._battleOperation = null;
    }

}
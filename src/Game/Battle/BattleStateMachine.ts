/**
 * 战斗状态机
 */
class BattleStateMachine extends egret.EventDispatcher implements IDisposable
{
    private _sm: StateMachine<BattleStateBase>;

    public constructor()
    {
        super();

        this._sm = new StateMachine<BattleStateBase>();

        this.Add(BattleStateIdle);
        this.Add(BattleStateStart);
        this.Add(BattleStateEnd);
        this.Add(BattleStatePlaying);


        this.Change(BattleStateIdle);
    }

    public Dispose(): void
    {
        this._sm.Dispose();
        this._sm = null;
    }

    private Add<T extends BattleStateBase>(t: { new(): T }): void
    {
        let state = this._sm.Add(t);
        state.Initialize(this);
    }

    public Change<T extends BattleStateBase>(t: { new(): T }): void
    {
        this._sm.Change(t);
    }
}

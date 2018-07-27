/**
 * 战斗状态基础类
 */
abstract class BattleStateBase implements TState<BattleStateBase>
{
    private _stateMachine: BattleStateMachine;

    protected get SMachine(): BattleStateMachine
    {
        return this._stateMachine;
    }

    public Initialize(stateMachine: BattleStateMachine): void
    {
        this._stateMachine = stateMachine;
    }

    public abstract Dispose(): void;

    public abstract OnEnter(oldState: BattleStateBase): void;

    public abstract OnLeave(newState: BattleStateBase): void;
}

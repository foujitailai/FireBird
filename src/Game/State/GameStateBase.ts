/**
 * 游戏状态基础类
 */
abstract class GameStateBase implements TState<GameStateBase>
{
    private _stateMachine: GameStateMachine;

    protected get SMachine(): GameStateMachine
    {
        return this._stateMachine;
    }

    public Initialize(stateMachine: GameStateMachine): void
    {
        this._stateMachine = stateMachine;
    }

    public abstract Dispose(): void;

    public abstract OnEnter(oldState: GameStateBase): void;

    public abstract OnLeave(newState: GameStateBase): void;
}

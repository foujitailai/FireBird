
// interface AIStateBase extends TState<AIStateBase>, IState
// {
//     DoAIProcess(): void;
// }

abstract class AIStateBase implements TState<AIStateBase>
{
    private _stateMachine: AIStateMachine;
    protected get SMachine():AIStateMachine
    {
        return this._stateMachine;
    }

    public Initialize(stateMachine:AIStateMachine):void
    {
        this._stateMachine = stateMachine;
    }

    public abstract DoAIProcess(): void;

    public abstract Dispose(): void;

    public abstract OnEnter(oldState: AIStateBase): void;

    public abstract OnLevel(newState: AIStateBase): void;
}

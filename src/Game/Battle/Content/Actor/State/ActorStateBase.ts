/**
 * 角色状态基础类
 */
abstract class ActorStateBase implements TState<ActorStateBase>
{
    private _actor: Actor;
    private _stateMachine: ActorStateMachine;

    protected get Actor(): Actor
    {
        return this._actor;
    }

    protected get SMachine(): ActorStateMachine
    {
        return this._stateMachine;
    }

    public Initialize(stateMachine: ActorStateMachine, actor: Actor): void
    {
        this._stateMachine = stateMachine;
        this._actor = actor;
    }

    public abstract Dispose(): void;

    public abstract OnEnter(oldState: ActorStateBase): void;

    public abstract OnLeave(newState: ActorStateBase): void;
}

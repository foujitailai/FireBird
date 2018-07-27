
class ActorStateMachine extends egret.EventDispatcher implements IDisposable
{
    private _sm: StateMachine<ActorStateBase>;
    private _actor: Actor;

    public constructor(actor:Actor)
    {
        super();

        this._actor = actor;
        this._sm = new StateMachine<ActorStateBase>();

        this.Add(ActorStateNormal);
        this.Add(ActorStateFire);
        this.Add(ActorStateInjured);
        this.Add(ActorStateEntrance);
        this.Add(ActorStateWait);
        this.Add(ActorStateDead);


        this.Change(ActorStateNormal);
    }

    public Dispose(): void
    {
        this._sm.Dispose();
        this._sm = null;
    }

    private Add<T extends ActorStateBase>(t: { new(): T }): void
    {
        let state = this._sm.Add(t);
        state.Initialize(this, this._actor);
    }

    public Change<T extends ActorStateBase>(t: { new(): T }): void
    {
        this._sm.Change(t);
    }
}


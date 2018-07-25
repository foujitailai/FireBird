
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

class ActorStateNormal extends ActorStateBase
{
    public Dispose(): void
    {
    }

    public OnEnter(oldState: ActorStateBase): void
    {
        // 播放正常的动画、声音、特效
        let a = this.Actor.Display;
        this.Actor.Display.SetAnimation("Normal");
        ModuleCenter.Get(SoundModule).PlaySound(EnumGameSound.Normal);
    }

    public OnLeave(newState: ActorStateBase): void
    {
    }
}

class ActorStateFire extends ActorStateBase
{
    private _changeStateTimer: egret.Timer;

    public constructor()
    {
        super();

        this._changeStateTimer = new egret.Timer(2000);
        this._changeStateTimer.addEventListener(egret.TimerEvent.TIMER, this.OnChangeState, this);
    }
    public Dispose(): void
    {
        this._changeStateTimer.stop();
        this._changeStateTimer.removeEventListener(egret.TimerEvent.TIMER, this.OnChangeState, this);
        this._changeStateTimer = null;
    }

    public OnEnter(oldState: ActorStateBase): void
    {
        this.Actor.SetFire();

        // 播放攻击的动画、声音、特效
        this.Actor.Display.SetAnimation("Fire");
        this.Actor.Display.AddEffect("Fire");
        ModuleCenter.Get(SoundModule).PlaySound(EnumGameSound.Fire);

        // 玩家的话，跳一下
        if (this.Actor.Data.ActorType == EnumActorType.Player)
        {
            ModuleCenter.Get(BattleModule).Battle.ControllerData.Jump();
        }

        this._changeStateTimer.start();
    }

    private OnChangeState():void
    {
        this.SMachine.Change(ActorStateNormal);
    }

    public OnLeave(newState: ActorStateBase): void
    {
        this._changeStateTimer.stop();
    }
}

class ActorStateInjured extends ActorStateBase
{
    public Dispose(): void
    {
    }

    public OnEnter(oldState: ActorStateBase): void
    {
        // 播放受伤的动画、声音、特效
        this.Actor.Display.SetAnimation("Injured");
        this.Actor.Display.AddEffect("Injured");
        ModuleCenter.Get(SoundModule).PlaySound(EnumGameSound.Injured);
    }

    public OnLeave(newState: ActorStateBase): void
    {
    }
}

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


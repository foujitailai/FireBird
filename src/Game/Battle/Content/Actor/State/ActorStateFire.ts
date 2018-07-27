/**
 * 攻击状态
 */
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

    private OnChangeState(): void
    {
        this.SMachine.Change(ActorStateNormal);
    }

    public OnLeave(newState: ActorStateBase): void
    {
        this._changeStateTimer.stop();
    }
}

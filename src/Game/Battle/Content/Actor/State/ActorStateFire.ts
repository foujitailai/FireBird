/**
 * 攻击状态
 */
class ActorStateFire extends ActorStateBase
{
    // private _changeStateTimer: egret.Timer;

    public constructor()
    {
        super();

        // this._changeStateTimer = new egret.Timer(1000);
        // this._changeStateTimer.addEventListener(egret.TimerEvent.TIMER, this.OnChangeState, this);
    }

    public Dispose(): void
    {
        // this._changeStateTimer.stop();
        // this._changeStateTimer.removeEventListener(egret.TimerEvent.TIMER, this.OnChangeState, this);
        // this._changeStateTimer = null;
    }

    public OnEnter(oldState: ActorStateBase): void
    {
        // 监听动画完成事件
        this.Actor.Display.addEventListener(egret.Event.COMPLETE, this.OnAniComplate, this);

        this.Actor.SetFire();

        // 播放攻击的动画、声音、特效
        this.Actor.Display.SetAnimation("Fire");
        this.Actor.Display.AddEffect("Fire");
        ModuleCenter.Get(SoundModule).PlaySound(EnumGameSound.Fire);

        // 玩家的话，跳一下
        if (this.Actor.Data.ActorType == EnumActorType.Player)
        {
            this.Actor.SetJump();
        }

        // this._changeStateTimer.start();
    }

    private OnChangeState(): void
    {
        this.SMachine.Change(ActorStateNormal);
    }

    public OnLeave(newState: ActorStateBase): void
    {
        this.Actor.Display.removeEventListener(egret.Event.COMPLETE, this.OnAniComplate, this);

        // this._changeStateTimer.stop();
    }

    private OnAniComplate()
    {
        // console.log(`${ClassTool.GetTypeName(this)}  OnAniComplate`);
        this.OnChangeState();
    }
}

/**
 * 进入战斗时的向跳过程
 */
class ActorStateEntrance extends ActorStateBase
{
    private _frameTimer: egret.Timer;
    public Dispose(): void
    {
    }

    public OnEnter(oldState: ActorStateBase): void
    {
        // 禁用输入
        ModuleCenter.Get(BattleModule).Battle.Controller.IsEnable = false;

        //new AnimationController()

        let gv = RES.getRes("globalValues_json");
        let vx = Number(gv.ActorStateEntrance.VelocityX);
        let vy = Number(gv.ActorStateEntrance.VelocityY);

        // 曲线动画
        // egret.Tween.get(this.Actor)
        //     .to({VelocityX:vx, VelocityY:vy},0)
        //     .to({},1000);

        // 播放受伤的动画、声音、特效
        this.Actor.Display.SetAnimation("Normal");
        this.Actor.Display.AddEffect("Normal");
        ModuleCenter.Get(SoundModule).PlaySound(EnumGameSound.Normal);

        // 向上跳
        this.Actor.SetJump();
        this.Actor.VelocityX = -280;


        this._frameTimer = new egret.Timer(EnumFrameSyncDefine.FRAME_TIME);
        this._frameTimer.addEventListener(egret.TimerEvent.TIMER, this.OnFrameTime, this);
        this._frameTimer.start();
    }

    public OnLeave(newState: ActorStateBase): void
    {
        this._frameTimer.stop();
        this._frameTimer.removeEventListener(egret.TimerEvent.TIMER, this.OnFrameTime, this);
        this._frameTimer = null;

        // 开启输入
        ModuleCenter.Get(BattleModule).Battle.Controller.IsEnable = true;
    }

    private OnFrameTime()
    {
        // 到达该到的位置了吗？
        if (this.Actor.Body.position[0] <= 100)
        {
            console.log(`BODY.X = ${this.Actor.Body.position[0]}`);
            // 结束更新
            this._frameTimer.stop();
            this._frameTimer.removeEventListener(egret.TimerEvent.TIMER, this.OnFrameTime, this);

            // 不再位移了
            this.Actor.VelocityX = 0;

            // 切到正常状态
            //this.SMachine.Change(ActorStateNormal);
            EventTool.Disp(this.Actor, BattleEvent.ACTOR_ENTRANCED);
        }
    }
}

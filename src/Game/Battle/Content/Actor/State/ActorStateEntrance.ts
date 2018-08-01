/**
 * 进入战斗时的向跳过程
 */
class ActorStateEntrance extends ActorStateBase
{
    public Dispose(): void
    {
    }

    public OnEnter(oldState: ActorStateBase): void
    {
        //new AnimationController()

        let gv = RES.getRes("globalValues_json");
        let vx = Number(gv.ActorStateEntrance.VelocityX);
        let vy = Number(gv.ActorStateEntrance.VelocityY);

        // 曲线动画
        egret.Tween.get(this.Actor)
            .to({VelocityX:vx, VelocityY:vy},0)
            .to({},1000);

        // 播放受伤的动画、声音、特效
        this.Actor.Display.SetAnimation("Normal");
        this.Actor.Display.AddEffect("Normal");
        ModuleCenter.Get(SoundModule).PlaySound(EnumGameSound.Normal);
    }

    public OnLeave(newState: ActorStateBase): void
    {
    }
}

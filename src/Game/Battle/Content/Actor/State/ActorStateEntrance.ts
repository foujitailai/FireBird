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
        // 曲线动画

        // 播放受伤的动画、声音、特效
        this.Actor.Display.SetAnimation("Normal");
        this.Actor.Display.AddEffect("Normal");
        ModuleCenter.Get(SoundModule).PlaySound(EnumGameSound.Normal);
    }

    public OnLeave(newState: ActorStateBase): void
    {
    }
}

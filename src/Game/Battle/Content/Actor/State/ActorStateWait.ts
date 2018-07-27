/**
 * 开始界面的等待状态
 */
class ActorStateWait extends ActorStateBase
{
    public Dispose(): void
    {
    }

    public OnEnter(oldState: ActorStateBase): void
    {
        // 播放受伤的动画、声音、特效
        this.Actor.Display.SetAnimation("Normal");
        this.Actor.Display.AddEffect("Normal");
        ModuleCenter.Get(SoundModule).PlaySound(EnumGameSound.Normal);
    }

    public OnLeave(newState: ActorStateBase): void
    {
    }
}

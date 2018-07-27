/**
 * 受伤状态
 */
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

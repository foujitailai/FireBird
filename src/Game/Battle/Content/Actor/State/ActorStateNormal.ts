/**
 * 正常飞行状态
 */
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

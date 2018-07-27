/**
 * 战斗开始状态
 */
class BattleStateStart extends BattleStateBase
{
    public Dispose(): void
    {
    }

    public OnEnter(oldState: BattleStateBase): void
    {
        let frameSync = ModuleCenter.Get(FrameSyncModule);
        frameSync.Start(true);
    }

    public OnLeave(newState: BattleStateBase): void
    {
    }
}

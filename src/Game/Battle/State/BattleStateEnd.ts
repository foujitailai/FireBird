/**
 * 战斗结束状态
 */
class BattleStateEnd extends BattleStateBase
{
    public Dispose(): void
    {
    }

    public OnEnter(oldState: BattleStateBase): void
    {
        let frameSync = ModuleCenter.Get(FrameSyncModule);
        frameSync.Stop();
        frameSync.ClearData();
    }

    public OnLeave(newState: BattleStateBase): void
    {
    }
}

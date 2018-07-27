/**
 * 战斗进行状态
 */
class BattleStatePlaying extends BattleStateBase
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

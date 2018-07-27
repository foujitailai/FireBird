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
        ModuleCenter.Get(BattleModule).Battle.GameSceneContent.SelfActor.ChangeState(ActorStateNormal);

        // 这里才开启输入功能？？？
    }

    public OnLeave(newState: BattleStateBase): void
    {
    }
}

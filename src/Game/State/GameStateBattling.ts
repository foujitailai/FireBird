/**
 * 游戏正在战斗中状态
 */
class GameStateBattling extends GameStateBase
{
    public Dispose(): void
    {
    }

    public OnEnter(oldState: GameStateBase): void
    {
        // 创建战斗
        let battle = ModuleCenter.Get(BattleModule);

        this.CreateTestData(battle.Data);

        battle.Start(this.SMachine.GameMain);
    }

    public OnLeave(newState: GameStateBase): void
    {
        let battle = ModuleCenter.Get(BattleModule);
        battle.Stop();
    }


    private CreateTestData(data:BattleData):void
    {
        // 自己的角色
        data.Context.SetSelfId(data.Context.GenerateActorId());
        data.Context.AddActor(data.Context.SelfId, new ActorData(data.Context.SelfId, EnumActorType.Player, 1));

        // 其它怪物的角色
        // data.Context.AddActor(2, new ActorData())
    }

}

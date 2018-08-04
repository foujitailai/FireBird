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


        // 清除sceneModule的master层（展示用的主角被清掉）
        let scene = ModuleCenter.Get(SceneModule);
        let layer = scene.GetLayer(EnumSceneLayer.Master);
        layer.removeChildren();

        // 使用测试数据
        this.CreateTestData(battle.Data);

        // 启动战斗模块
        battle.Start(scene.LayerRoot);
    }

    public OnLeave(newState: GameStateBase): void
    {
        let battle = ModuleCenter.Get(BattleModule);
        battle.Stop();
    }


    private CreateTestData(data:BattleData):void
    {
        let selfResId = ModuleCenter.Get(MasterModule).SelfResId;
        // 自己的角色
        data.Context.SetSelfId(data.Context.GenerateActorId());
        let actorData = new ActorData(data.Context.SelfId, EnumActorType.Player, selfResId);
        data.Context.AddActor(data.Context.SelfId, actorData);

        // 其它怪物的角色
        // data.Context.AddActor(2, new ActorData())
    }

}

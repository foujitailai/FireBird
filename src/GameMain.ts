class GameMain extends egret.DisplayObjectContainer
{
    private _loading: Loading;
    private _battle: BattleModule;

    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveToStage, this);

    }

    private onAddToStage(): void
    {
        this.Run().catch(e =>
        {
            console.log(e);
        });
    }

    private onRemoveToStage(): void
    {
        if (this._battle)
            this._battle.Dispose();
        this._battle = null;
    }

    private async Run()
    {
        // 初始化整个模块系统
        new ModuleCenter();

        // 加载
        this._loading = new Loading();
        await this._loading.Run(this.stage);
        this._loading = null;

        // 创建战斗
        this._battle = ModuleCenter.Get(BattleModule);
        this.CreateTestData(this._battle.Data);
        this._battle.Start(this);
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

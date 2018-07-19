class GameMain extends egret.DisplayObjectContainer
{
    private _loading: Loading;
    private _battle: Battle;

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
            this._battle.Release();
        this._battle = null;
    }

    private async Run()
    {
        // 加载
        this._loading = new Loading();
        await this._loading.Run(this.stage);
        this._loading = null;

        // 创建战斗
        this._battle = new Battle();
        this.addChild(this._battle);
    }
}

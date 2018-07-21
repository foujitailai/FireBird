class GameSceneDebug implements IDisposable
{
    private _debugDraw: p2DebugDraw;
    private _battle: Battle;

    public constructor(battle:Battle, world: p2.World)
    {
        this._battle = battle;

        // 创建调试试图
        this._debugDraw = new p2DebugDraw(world);
        var sprite: egret.Sprite = new egret.Sprite();
        this._battle.addChild(sprite);
        this._debugDraw.setSprite(sprite);
    }

    public Dispose()
    {
        if (this._debugDraw)
        {
            this._battle.removeChild(this._debugDraw.getSprite());
            this._debugDraw = null;
        }
        this._battle = null;
    }

    public Draw()
    {
        // 显示物理引擎里面的数据
        this._debugDraw.drawDebug();
    }
}

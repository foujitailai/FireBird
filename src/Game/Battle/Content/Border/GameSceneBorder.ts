class GameSceneBorder implements IDisposable
{
    private _battle: Battle;
    private _content: GameSceneContent;
    private _world: p2.World;

    private _groundTop: Ground;
    private _groundBottom: Ground;

    private _hellLeft: Hell;
    private _hellRight: Hell;

    public constructor(battle:Battle, gameSceneContent:GameSceneContent, world:p2.World)
    {
        this._battle = battle;
        this._content = gameSceneContent;
        this._world = world;

        this.CreateWallOnTopBottom();
        this.CreateWallOnLeftRight();
    }

    public Dispose()
    {
        this.DestroyWallOnLeftRight();
        this.DestroyWallOnTopBottom();

        this._battle = null;
        this._content = null;
        this._world = null;
    }

    private CreateWallOnTopBottom(): void
    {
        // 以窗口边界为0点，+向窗口外面继续扩展，-向窗口内挤压
        let offHeight = +50;

        //TODO 添加上下反弹墙
        this._groundTop = Helper.CreateGround(this._world, this._battle);
        this._groundTop.SetPosition(this._groundTop.Display.width / 2, -(this._groundTop.Display.height / 2) - offHeight);
        this._groundTop.SetCollisionTableType(EnumCollisionTableType.TOP_GROUND);
        this._groundTop.SyncInitialize();
        this._content.AddGameObject(this._groundTop, EnumSceneLayer.Native);

        this._groundBottom = Helper.CreateGround(this._world, this._battle);
        let h = this._battle.stage.$stageHeight;
        this._groundBottom.SetPosition(this._groundTop.Display.width / 2, h + (this._groundBottom.Display.height / 2) + offHeight);
        this._groundBottom.SetCollisionTableType(EnumCollisionTableType.BOTTOM_GROUND);
        this._groundBottom.SyncInitialize();
        this._content.AddGameObject(this._groundBottom, EnumSceneLayer.Native);
    }

    private CreateWallOnLeftRight(): void
    {
        // 以窗口边界为0点，+向窗口外面继续扩展，-向窗口内挤压
        let offWidth = +50;

        //TODO 添加左右销毁墙
        this._hellLeft = Helper.CreateHell(this._world, this._battle);
        this._hellLeft.SetPosition((-this._hellLeft.Display.width/2) - offWidth, this._hellLeft.Display.height / 2);
        this._hellLeft.SyncInitialize();
        this._content.AddGameObject(this._hellLeft, EnumSceneLayer.Native);

        this._hellRight = Helper.CreateHell(this._world, this._battle);
        let w = this._battle.stage.$stageWidth;
        this._hellRight.SetPosition(w + (this._hellLeft.Display.width/2) + offWidth, this._hellRight.Display.height / 2);
        this._hellRight.SyncInitialize();
        this._content.AddGameObject(this._hellRight, EnumSceneLayer.Native);
    }

    private DestroyWallOnTopBottom(): void
    {
        //TODO 添加上下反弹墙
    }

    private DestroyWallOnLeftRight(): void
    {
        //TODO 添加左右销毁墙
    }
}

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
    }

    private CreateWallOnTopBottom(): void
    {
        //TODO 添加上下反弹墙
        this._groundTop = Helper.CreateGround(this._world, this._battle);
        this._groundTop.SetPosition(this._groundTop.Display.width / 2, this._groundTop.Display.height / 2);
        this._groundTop.SetCollisionTableType(EnumCollisionTableType.TOP_GROUND);
        this._groundTop.SyncInitialize();
        this._content.AddGameObject(this._groundTop);

        this._groundBottom = Helper.CreateGround(this._world, this._battle);
        let h = this._battle.stage.$stageHeight;
        this._groundBottom.SetPosition(this._groundTop.Display.width / 2, h - this._groundBottom.Display.height / 2);
        this._groundBottom.SetCollisionTableType(EnumCollisionTableType.BOTTOM_GROUND);
        this._groundBottom.SyncInitialize();
        this._content.AddGameObject(this._groundBottom);
    }

    private CreateWallOnLeftRight(): void
    {
        //TODO 添加左右销毁墙
        this._hellLeft = Helper.CreateHell(this._world, this._battle);
        this._hellLeft.SetPosition((-this._hellLeft.Display.width/2) - 100, this._hellLeft.Display.height / 2);
        this._hellLeft.SyncInitialize();
        this._content.AddGameObject(this._hellLeft);

        this._hellRight = Helper.CreateHell(this._world, this._battle);
        let w = this._battle.stage.$stageWidth;
        this._hellRight.SetPosition(w + (this._hellLeft.Display.width/2) + 100, this._hellRight.Display.height / 2);
        this._hellRight.SyncInitialize();
        this._content.AddGameObject(this._hellRight);
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

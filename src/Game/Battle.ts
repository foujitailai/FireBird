
class Battle extends egret.DisplayObjectContainer
{
    private _battleStateMachine: BattleStateMachine;
    private _collisionAction: CollisionAction;
    private _controller: Controller;
    private _gameScene: GameScene;
    private _gameSceneDebug: GameSceneDebug;
    private _controllerData: ControllerData;
    private _gameSceneContent: GameSceneContent;
    private _collisionTable: CollisionTable;
    private _battleTimer: BattleTimer;
    private _showDebug: boolean;
    private _battleLogic: BattleLogic;

    public get ControllerData():ControllerData
    {
        return this._controllerData;
    }

    public get GameSceneContent():GameSceneContent
    {
        return this._gameSceneContent;
    }

    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private AddTestIcon(): void
    {
        let icon: egret.Bitmap = Helper.CreateBitmapByName("egret_icon_png");
        icon.x = this.stage.$stageWidth / 2;
        icon.y = this.stage.$stageHeight / 2;
        icon.anchorOffsetX = icon.width / 2;
        icon.anchorOffsetY = icon.height / 2;

        this.addChild(icon);
    }

    private onAddToStage(): void
    {
        this.AddTestIcon();

        this._showDebug = false;

        this._battleStateMachine = new BattleStateMachine();

        this._controllerData = new ControllerData();
        this._controller = new Controller(this);
        this.addEventListener(GameEvent.FIRE, this.OnFire, this);

        this._collisionTable = new CollisionTable();
        this._collisionAction = new CollisionAction(this, this._collisionTable, this._controllerData);

        this._gameScene = new GameScene(this, this._collisionTable);
        this._gameSceneDebug = new GameSceneDebug(this, this._gameScene.World);

        this._gameSceneContent = new GameSceneContent(this, this._gameScene);

        this._battleLogic = new BattleLogic(this);



        this.addEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);

        this._battleTimer = new BattleTimer();
    }

    public Release(): void
    {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);


        this.removeEventListener(GameEvent.FIRE, this.OnFire, this);
        this._controller = null;

        this._gameScene.Release();
        this._gameScene = null;


        this._collisionAction.Release();
        this._collisionAction = null;

        this._collisionTable.Release();
        this._collisionTable = null;
    }

    private OnFire(): void
    {
        this._gameSceneContent.CreateBullet(this._gameSceneContent.ActorMgr.SelfActor);
        this.OnJump();
    }

    private OnJump(): void
    {
        this._controllerData.Jump();
    }

    private OnUpdate(): void
    {
        this._battleTimer.TakeSample();

        this._battleLogic.OnUpdate(this._battleTimer.Delta);

        this._gameSceneContent.SyncData2Py();
        this._gameScene.OnUpdate(this._battleTimer.Delta);
        this._gameSceneContent.SyncPy2View();

        if (this._showDebug)
        {
            this._gameSceneDebug.Draw();
        }
    }
}

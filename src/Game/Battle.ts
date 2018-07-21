class Battle extends egret.DisplayObjectContainer implements IModule
{
    private static _className: string;

    public get Name(): string
    {
        if (!Battle._className)
        {
            Battle._className = ClassTool.GetTypeName(Battle);
        }
        return Battle._className;
    }


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
    private _battleLogic: GameLogicProcessor;
    private _battleProcess: BattleProcess;


    public get ControllerData(): ControllerData
    {
        return this._controllerData;
    }

    public get GameSceneContent(): GameSceneContent
    {
        return this._gameSceneContent;
    }

    public get GameScene(): GameScene
    {
        return this._gameScene;
    }

    public get GameSceneDebug(): GameSceneDebug
    {
        return this._gameSceneDebug;
    }

    public get IsShowDebug(): boolean
    {
        return this._showDebug;
    }

    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public Dispose(): void
    {
    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
    }

    public Start()
    {
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

        this._battleLogic = new GameLogicProcessor(this);
        this._battleTimer = new BattleTimer();

        this._battleProcess = new BattleProcess();

        this._battleStateMachine.BattleBegin();

        // 注册帧更新函数，每次引擎渲染时都会调用
        this.addEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);
    }

    public Stop()
    {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);

        this._battleStateMachine.BattleEnd();

        this.removeEventListener(GameEvent.FIRE, this.OnFire, this);
        this._controller = null;

        this._gameScene.Dispose();
        this._gameScene = null;


        this._collisionAction.Dispose();
        this._collisionAction = null;

        this._collisionTable.Dispose();
        this._collisionTable = null;

        this._battleProcess.Dispose();
        this._battleProcess = null;
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

        // 进入战斗模块开启状态
        this.Start();
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

        this._battleProcess.OnUpdate(this._battleTimer.Delta);
    }

}

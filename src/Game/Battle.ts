class Battle extends egret.DisplayObjectContainer implements IDisposable
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
    private _battleProcess: BattleProcess;
    private _aiFrameSyncDataAsset: AIDataAsset;
    private _battleData: BattleData;
    private _battleBehavior: BattleBehavior;


    public get AIFrameSyncDataAsset(): AIDataAsset
    {
        return this._aiFrameSyncDataAsset;
    }

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

    private onAddToStage(): void
    {
        this.AddTestIcon();

        // 进入战斗模块开启状态
        this.Start();
    }

    public Dispose(): void
    {
        this.Stop();
    }

    public Start()
    {
        this._showDebug = false;

        this._battleData = ModuleCenter.Get(BattleModule).Data;

        this._battleStateMachine = new BattleStateMachine();

        this._aiFrameSyncDataAsset = new AIDataAsset();

        this._controllerData = new ControllerData();
        this._controller = new Controller(this);

        this._collisionTable = new CollisionTable();
        this._collisionAction = new CollisionAction(this, this._collisionTable, this._controllerData);

        this._gameScene = new GameScene(this, this._collisionTable);
        this._gameSceneDebug = new GameSceneDebug(this, this._gameScene.World);

        this._gameSceneContent = new GameSceneContent(this, this._gameScene);

        this._battleTimer = new BattleTimer();

        this._battleProcess = new BattleProcess();

        this._battleBehavior = new BattleBehavior(this);

        this._battleStateMachine.BattleBegin();

        //TODO 这里事件只会在渲染时派发出来，如果窗口被切到后台看不到了，egret就不会派发这个事件，固定时钟的功能，可能还需要换定时器来
        //     参看 egret.startTick   http://edn.egret.com/cn/article/index/id/875
        // 注册帧更新函数，每次引擎渲染时都会调用
        this.addEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);
    }

    public Stop()
    {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);

        this._battleStateMachine.BattleEnd();

        this._controller = null;

        this._gameScene.Dispose();
        this._gameScene = null;


        this._collisionAction.Dispose();
        this._collisionAction = null;

        this._collisionTable.Dispose();
        this._collisionTable = null;

        this._battleProcess.Dispose();
        this._battleProcess = null;

        this._battleData = null;
    }

    private OnUpdate(): void
    {
        this._battleTimer.TakeSample();

        this._battleProcess.OnUpdate(this._battleTimer.Delta);
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

}

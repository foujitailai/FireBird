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
    private _battleLogic: BattleLogic;
    private _frameSync: FrameSyncModule;
    private _processorCenter: ProcessorCenter;


    public get ProcessorCenter(): ProcessorCenter
    {
        return this._processorCenter;
    }

    public get ControllerData(): ControllerData
    {
        return this._controllerData;
    }

    public get GameSceneContent(): GameSceneContent
    {
        return this._gameSceneContent;
    }

    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    public Release(): void
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

        this._processorCenter = new ProcessorCenter();

        this._controllerData = new ControllerData();
        this._controller = new Controller(this);
        this.addEventListener(GameEvent.FIRE, this.OnFire, this);

        this._collisionTable = new CollisionTable();
        this._collisionAction = new CollisionAction(this, this._collisionTable, this._controllerData);

        this._gameScene = new GameScene(this, this._collisionTable);
        this._gameSceneDebug = new GameSceneDebug(this, this._gameScene.World);

        this._gameSceneContent = new GameSceneContent(this, this._gameScene);

        this._battleLogic = new BattleLogic(this);
        this._battleTimer = new BattleTimer();

        this._frameSync = ModuleCenter.Get(FrameSyncModule);
        let src = this;
        this._frameSync.SetHandle(
            (a, b, c) => src.OnRenderFrame(a, b, c),
            (a, b) => src.OnSyncFrame(a, b));
        this._frameSync.Start(true);

        // 注册帧更新函数，每次引擎渲染时都会调用
        this.addEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);
    }

    public Stop()
    {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);

        this._frameSync.Stop();
        this._frameSync.ClearData();

        this.removeEventListener(GameEvent.FIRE, this.OnFire, this);
        this._controller = null;

        this._gameScene.Release();
        this._gameScene = null;


        this._collisionAction.Release();
        this._collisionAction = null;

        this._collisionTable.Release();
        this._collisionTable = null;

        this._processorCenter.Release();
        this._processorCenter = null;
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

        this._frameSync.OnUpdate(this._battleTimer.Delta);

    }

    /**
     * 渲染同步
     * @param {number} delta 距离上一个逻辑帧的时间
     * @param {number} progress 在两个逻辑帧之间的百分比进度
     * @param {boolean} isFastPlay 是否快速播放
     * @constructor
     */
    private OnRenderFrame(delta: number, progress: number, isFastPlay: boolean)
    {
        // 显示VIEW
        this._gameSceneContent.Render(delta, progress, isFastPlay);

        if (this._showDebug)
        {
            this._gameSceneDebug.Draw();
        }
    }

    /**
     * 帧同步
     * @param {number} index 帧同步索引
     * @param {FrameSyncServerDataAsset} data 帧同步服务器数据集合
     * @constructor
     */
    private OnSyncFrame(index: number, data: FrameSyncServerDataAsset)
    {
        this._processorCenter.OnFrameSync(index);

        //TODO 下面的代码，理论上应该都转成各种 Processor，加油吧

        this._battleLogic.OnUpdate(EnumFrameSyncDefine.FRAME_TIME);

        this._gameSceneContent.OnUpdate(EnumFrameSyncDefine.FRAME_TIME);
        this._gameSceneContent.SyncData2Py();
        this._gameScene.OnUpdate(EnumFrameSyncDefine.FRAME_TIME / EnumFrameSyncDefine.INT_FLOAT_RATE);
        this._gameSceneContent.SyncPy2Data();
    }

}

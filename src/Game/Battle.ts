class Battle extends egret.DisplayObjectContainer
{
    private _collisionAction: CollisionAction;
    private _controller: Controller;
    private _gameScene: GameScene;
    private _gameSceneDebug: GameSceneDebug;
    private _gameSceneBorder: GameSceneBorder;
    private _controllerData: ControllerData;
    private _gameSceneContent: GameSceneContent;
    private _collisionTable: CollisionTable;


    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private AddTestIcon(): void
    {
        let icon: egret.Bitmap = Helper.CreateBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
    }

    private onAddToStage(): void
    {
        this.AddTestIcon();

        this._controllerData = new ControllerData();
        this._controller = new Controller(this);
        this.addEventListener(GameEvent.FIRE, this.OnFire, this);

        this._collisionTable = new CollisionTable();
        this._collisionAction = new CollisionAction(this, this._collisionTable, this._controllerData);

        this._gameScene = new GameScene(this, this._collisionTable);
        this._gameSceneDebug = new GameSceneDebug(this, this._gameScene.World);
        this._gameSceneBorder = new GameSceneBorder(this, this._gameScene.World);

        this._gameSceneContent = new GameSceneContent(this, this._gameScene);

        this.addEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);

        this._lastTime = egret.getTimer();
    }

    public Release(): void
    {
        this._lastTime = 0;

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
        let bullet = Helper.CreateBullet(this._gameSceneContent.SelfActor, this._gameScene.World, this);
        this.AddGameObject(bullet);

        this.OnJump();
    }

    private OnJump(): void
    {
        this._controllerData.Jump();
    }

    private _lastTime: number = 0;
    private _delta: number = 0;

    private FrameTimeTakeSample()
    {
        // 计算当前帧的时间间隔
        let curTime = egret.getTimer();
        this._delta = (curTime - this._lastTime) / 1000;
        this._lastTime = curTime;
        if (this._delta > 1)
        {
            this._delta = 30 / 1000;
        }
    }


    private _gameObjects: { [key: number]: GameObject; } = {};

    private OnUpdate(): void
    {
        this.FrameTimeTakeSample();

        // 直接速度（每秒的速度，如果不去每帧设置，会被衰竭掉，可以通过damping=0来去掉衰竭）
        //this._self.Body.velocity = [(this._keyLeft - this._keyRight) * -200, (this._keyUp - this._keyDown) * -200];
        //this._self.Body.velocity = [0, 200];
        let velocityY = this._controllerData.CalcVelocityY();
        this._gameSceneContent.SelfActor.Body.velocity = [0, velocityY];

        this._gameScene.OnUpdate(this._delta);
        //this._gameSceneDebug.Draw();

        for (let k in this._gameObjects)
        {
            let v = this._gameObjects[k];
            v.SyncPy2View();
        }
    }


    public GetGameObjectByP2Id(p2Id: number): GameObject
    {
        for (let k in this._gameObjects)
        {
            let v = this._gameObjects[k];
            if (v.Body.id == p2Id)
            {
                return v;
            }
        }
        return null;
    }

    public AddGameObject(go: GameObject)
    {
        console.log("AddGameObject: " + ClassTool.GetTypeName(go) + "(" + go.Id + ")");
        this.addChild(go.Display);
        this._gameScene.World.addBody(go.Body);
        this._gameObjects[go.Id] = go;
    }

    public RemoveGameObject(go: GameObject)
    {
        if (this._gameObjects[go.Id])
        {
            console.log("RemoveGameObject: " + ClassTool.GetTypeName(go) + "(" + go.Id + ")");
            delete this._gameObjects[go.Id];
            this._gameScene.World.removeBody(go.Body);
            this.removeChild(go.Display);
            go.Release();
        }
    }
}

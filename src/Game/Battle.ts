class Battle extends egret.DisplayObjectContainer
{
    private _collisionAction: CollisionAction;
    private _controller:Controller;

    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(): void
    {
        this.CreateCollisionTable();

        // this.width = this.stage.width;
        // this.createGameScene();
        this.AddTestIcon();

        this.CreateScene();

        this._controller = new Controller(this);
        this.addEventListener(GameEvent.FIRE, this.OnFire, this);


        this.CreateControllableActor();
        this.CreateWallOnTopBottom();
        this.CreateWallOnLeftRight();

        this.CreateDebug();

        this.addEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);

        this._lastTime = egret.getTimer();
    }

    public Release(): void
    {
        this._lastTime = 0;

        this.removeEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);

        this.DestroyDebug();

        this.DestroyWallOnTopBottom();
        this.DestroyWallOnLeftRight();
        this.DestroyControllableActor();



        this.removeEventListener(GameEvent.FIRE, this.OnFire, this);
        this._controller = null;


        this.DestroyScene();

        this.DestroyCollisionTable();


    }

    private _world: p2.World;
    private _debugDraw: p2DebugDraw;

    private _onBeginContactHandle;
    private _onEndContactHandle;

    private CreateScene(): void
    {
        //TODO 创建物理引擎
        var wrd: p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 0];
        this._world = wrd;


        this._onBeginContactHandle = this.OnBeginContact.bind(this);
        this._onEndContactHandle = this.OnEndContact.bind(this);
        this._world.on("beginContact", this._onBeginContactHandle);
        this._world.on("endContact", this._onEndContactHandle);
    }

    private DestroyScene(): void
    {
        if (this._onBeginContactHandle) this._world.off("beginContact", this._onBeginContactHandle);
        if (this._onEndContactHandle) this._world.off("endContact", this._onEndContactHandle);
        this._onBeginContactHandle = null;
        this._onEndContactHandle = null;
    }

    private CreateDebug(): void
    {
        // 创建调试试图
        this._debugDraw = new p2DebugDraw(this._world);
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this._debugDraw.setSprite(sprite);
    }

    private DestroyDebug(): void
    {
        if (this._debugDraw)
        {
            this.removeChild(this._debugDraw.getSprite());
            this._debugDraw = null;
        }
    }


    private GetGameObjectByP2Id(p2Id: number): GameObject
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

    private _collisionTable: CollisionTable;

    private OnBeginContact(event: any): void
    {
        console.log("on target sensor BEG bodyA.id:" + event.bodyA.id + ",bodyB.id:" + event.bodyB.id);

        let aGO = this.GetGameObjectByP2Id(event.bodyA.id);
        let bGO = this.GetGameObjectByP2Id(event.bodyB.id);
        this._collisionTable.DoCollision(aGO, bGO);

        // if (!this._self || !this._self.Body)
        //     return;
        //
        // if (event.bodyA.id != this._self.Body.id &&
        //     event.bodyB.id != this._self.Body.id)
        //     return;
        //
        // let body = event.bodyA;
        // if (event.bodyA.id == this._self.Body.id)
        // {
        //     body = event.bodyB;
        // }
        // console.log("REMOVE BODY!!!!!!!!!!!")
        // this._world.removeBody(body);
    }

    private OnEndContact(event: any): void
    {
        console.log("on target sensor END bodyA.id:" + event.bodyA.id + ",bodyB.id:" + event.bodyB.id);
    }

    private _groundTop: Ground;
    private _groundBottom: Ground;

    private CreateWallOnTopBottom(): void
    {
        //TODO 添加上下反弹墙
        this._groundTop = Helper.CreateGround(this._world, this);
        this._groundTop.SetPosition(this._groundTop.Display.width / 2, this._groundTop.Display.height / 2);
        this._groundTop.SetCollisionTableType(EnumCollisionTableType.TOP_GROUND);
        this.AddGameObject(this._groundTop);

        this._groundBottom = Helper.CreateGround(this._world, this);
        let h = this.stage.$stageHeight;
        this._groundBottom.SetPosition(this._groundTop.Display.width / 2, h - this._groundBottom.Display.height / 2);
        this._groundBottom.SetCollisionTableType(EnumCollisionTableType.BOTTOM_GROUND);
        this.AddGameObject(this._groundBottom);
    }

    private _hellLeft: Hell;
    private _hellRight: Hell;

    private CreateWallOnLeftRight(): void
    {
        //TODO 添加左右销毁墙
        this._hellLeft = Helper.CreateHell(this._world, this);
        this._hellLeft.SetPosition(-100, this._hellLeft.Display.height / 2);
        this.AddGameObject(this._hellLeft);

        this._hellRight = Helper.CreateHell(this._world, this);
        let w = this.stage.$stageWidth;
        this._hellRight.SetPosition(w + 100, this._hellRight.Display.height / 2);
        this.AddGameObject(this._hellRight);
    }

    private DestroyWallOnTopBottom(): void
    {
        //TODO 添加上下反弹墙
    }

    private DestroyWallOnLeftRight(): void
    {
        //TODO 添加左右销毁墙
    }

    private _self: Actor;


    private CreateControllableActor(): void
    {
        //TODO 添加控制的主角
        this._self = Helper.CreateActor(EnumActorType.Player, 1, this._world, this);
        this._self.SetPosition(100, 100);
        this.AddGameObject(this._self);

    }

    private DestroyControllableActor(): void
    {
        console.log("DestroyControllableActor");
    }

    private OnFire(): void
    {
        let bullet = Helper.CreateBullet(this._self, this._world, this);
        this.AddGameObject(bullet);

        this.OnJump();
    }

    private OnJump(): void
    {
        this._forceUp = Battle.JUMP_VELOCITY;
        this._forceDown = 0;
    }


    private _gameObjects: { [key: number]: GameObject; } = {};

    private _lastTime: number = 0;
    private _delta: number = 0;

    private OnUpdate(): void
    {
        // 计算当前帧的时间间隔
        let curTime = egret.getTimer();
        this._delta = (curTime - this._lastTime) / 1000;
        this._lastTime = curTime;
        if (this._delta > 1)
        {
            this._delta = 30 / 1000;
        }


        // 直接速度（每秒的速度，如果不去每帧设置，会被衰竭掉，可以通过damping=0来去掉衰竭）
        //this._self.Body.velocity = [(this._keyLeft - this._keyRight) * -200, (this._keyUp - this._keyDown) * -200];
        //this._self.Body.velocity = [0, 200];
        this.UpdateSelf();


        // 更新物理引擎时间
        this._world.step(this._delta);

        // 显示物理引擎里面的数据
        // this._debugDraw.drawDebug();

        for (let k in this._gameObjects)
        {
            let v = this._gameObjects[k];
            v.SyncPy2View();
        }
    }


    /**
     * 跳起时给的力
     * @type {number}
     */
    private static readonly JUMP_VELOCITY: number = 2000;
    /**
     * 每帧在衰减的力
     * @type {number}
     */
    private static readonly JUMP_DAMPING: number = 100;
    /**
     * 重力做用的力
     * @type {number}
     */
    private static readonly GRAVITY_VELOCITY: number = 800;
    private _forceUp: number = 0;
    private _forceDown: number = 0;
    public get ForceUp()
    {
        return this._forceUp;
    }
    public set ForceUp(v:number)
    {
        this._forceUp = v;
    }

    public get ForceDown()
    {
        return this._forceDown;
    }
    public set ForceDown(v:number)
    {
        this._forceDown = v;
    }

    private UpdateSelf(): void
    {
        let velocityY = Battle.GRAVITY_VELOCITY;

        // 检测是否有在上升？
        if (this._forceUp > 0)
        {
            // 如果有，就加上升的值，同时还要将上升的值衰减下来
            velocityY -= this._forceUp;
            this._forceUp -= Battle.JUMP_DAMPING;
            if (this._forceUp < 0)
            {
                this._forceUp = 0;
            }
        }
        // 检测是否有在下降？
        if (this._forceDown > 0)
        {
            // 如果有，就加上升的值，同时还要将上升的值衰减下来
            velocityY += this._forceDown;
            this._forceDown -= Battle.JUMP_DAMPING;
            if (this._forceDown < 0)
            {
                this._forceDown = 0;
            }
        }

        this._self.Body.velocity = [0, velocityY];
    }


    private AddTestIcon(): void
    {
        let icon: egret.Bitmap = Helper.CreateBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
    }

    private CreateCollisionTable()
    {
        this._collisionTable = new CollisionTable();
        this._collisionAction = new CollisionAction(this, this._collisionTable);
    }

    private DestroyCollisionTable()
    {
        this._collisionAction.Release();
        this._collisionAction = null;

        this._collisionTable.Release();
        this._collisionTable = null;
    }

    public AddGameObject(go: GameObject)
    {
        console.log("AddGameObject: " + ClassTool.GetTypeName(go) + "(" + go.Id + ")");
        this.addChild(go.Display);
        this._world.addBody(go.Body);
        this._gameObjects[go.Id] = go;
    }

    public RemoveGameObject(go: GameObject)
    {
        if (this._gameObjects[go.Id])
        {
            console.log("RemoveGameObject: " + ClassTool.GetTypeName(go) + "(" + go.Id + ")");
            delete this._gameObjects[go.Id];
            this._world.removeBody(go.Body);
            this.removeChild(go.Display);
            go.Release();
        }
    }
}

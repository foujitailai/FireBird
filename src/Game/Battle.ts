class Battle extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(): void
    {
        // this.width = this.stage.width;
        // this.createGameScene();
        this.AddTestIcon();

        this.CreateScene();

        this.CreateControllableActor();
        this.CreateWallOnTopBottom();
        this.CreateWallOnLeftRight();

        this.CreateDebug();

        this.addEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);

        this._lastTime = egret.getTimer();
    }

    public Release():void
    {
        this._lastTime = 0;

        this.removeEventListener(egret.Event.ENTER_FRAME, this.OnUpdate, this);

        this.DestroyDebug();

        this.DestroyWallOnTopBottom();
        this.DestroyWallOnLeftRight();
        this.DestroyControllableActor();

        this.DestroyScene();
    }

    private _gameObjects: { [key: number]: GameObject; } = {};

    private _lastTime : number = 0;
    private OnUpdate():void
    {
        // 计算当前帧的时间间隔
        let curTime = egret.getTimer();
        let delta = (curTime - this._lastTime) / 1000;
        this._lastTime = curTime;



        // 直接速度（每秒的速度，如果不去每帧设置，会被衰竭掉，可以通过damping=0来去掉衰竭）
        //this._self.Body.velocity = [(this._keyLeft - this._keyRight) * -200, (this._keyUp - this._keyDown) * -200];
        this._self.Body.velocity = [0, 200];



        // 更新物理引擎时间
        this._world.step(delta);

        // 显示物理引擎里面的数据
        this._debugDraw.drawDebug();

        for (let k in this._gameObjects)
        {
            let v = this._gameObjects[k];
            v.Sync();
        }
    }

    private _world: p2.World;
    private _debugDraw: p2DebugDraw;

    private _onBeginContactHandle;
    private _onEndContactHandle;
    private CreateScene():void
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
    private DestroyScene():void
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

    private DestroyDebug():void
    {
        if (this._debugDraw)
        {
            this.removeChild(this._debugDraw.getSprite());
            this._debugDraw = null;
        }
    }

    private OnBeginContact(event:any):void
    {
        console.log("on target sensor BEG bodyA.id:"+event.bodyA.id+",bodyB.id:"+event.bodyB.id);

        if (!this._self || !this._self.Body)
            return;
        if (event.bodyA.id != this._self.Body.id &&
            event.bodyB.id != this._self.Body.id)
            return;

        let body = event.bodyA;
        if (event.bodyA.id == this._self.Body.id)
        {
            body = event.bodyB;
        }
        console.log("REMOVE BODY!!!!!!!!!!!")
        this._world.removeBody(body);
    }

    private OnEndContact(event:any):void
    {
        console.log("on target sensor END bodyA.id:"+event.bodyA.id+",bodyB.id:"+event.bodyB.id);
    }

    private CreateWallOnTopBottom():void
    {
        //TODO 添加上下反弹墙
    }

    private CreateWallOnLeftRight():void
    {
        //TODO 添加左右销毁墙
    }

    private DestroyWallOnTopBottom():void
    {
        //TODO 添加上下反弹墙
    }

    private DestroyWallOnLeftRight():void
    {
        //TODO 添加左右销毁墙
    }

    private _onKeyDownHandle;
    private _onKeyUpHandle;

    private _self : Actor;
    private CreateControllableActor():void
    {
        //TODO 添加控制的主角
        this._self = Helper.CreateActor(1, this._world, this);
        this._self.SetPosition(300, 100);
        this._gameObjects[this._self.Id] = this._self;

        //TODO 绑定键盘控制
        this._onKeyDownHandle = this.onKeyDown.bind(this);
        this._onKeyUpHandle = this.onKeyUp.bind(this);
        document.addEventListener("keydown", this._onKeyDownHandle);
        document.addEventListener("keyup", this._onKeyUpHandle);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private DestroyControllableActor():void
    {
        console.log("DestroyControllableActor");
        if (this._onKeyDownHandle) document.removeEventListener("keydown", this._onKeyDownHandle);
        if (this._onKeyUpHandle) document.removeEventListener("keyup", this._onKeyUpHandle);
        this._onKeyDownHandle = null;
        this._onKeyUpHandle = null;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(e:egret.TouchEvent):void
    {
        console.log("clicked");

        this.OnFire();
        this.OnJump();
    }

    private OnFire():void
    {
        //TODO 发射子弹
        console.log("OnFire");
    }

    private OnJump():void
    {
        //TODO 向上跳
        console.log("OnJump");
    }

    private _keyDown : number = 0;
    private _keyUp : number = 0;
    private _keyLeft : number = 0;
    private _keyRight : number = 0;
    private onKeyDown(evt): void
    {
        // console.log("evt.keyCode:" + evt.keyCode);
        // keycode 38 = Up ↑
        // keycode 40 = Down ↓
        // keycode 37 = Left ←
        // keycode 39 = Right →
        switch(evt.keyCode)
        {
            case 38: this._keyUp = 1; break;
            case 40: this._keyDown = 1; break;
            case 37: this._keyLeft = 1; break;
            case 39: this._keyRight = 1; break;
            case 39: this._keyRight = 1; break;
            case 32:
                this.OnFire(); break;
            case 86:
                this.OnJump(); break;
        }
    }
 
    private onKeyUp(evt): void
    {
        switch(evt.keyCode)
        {
            case 38: this._keyUp = 0; break;
            case 40: this._keyDown = 0; break;
            case 37: this._keyLeft = 0; break;
            case 39: this._keyRight = 0; break;
        }
    }





















    private AddTestIcon():void
    {
        let icon: egret.Bitmap = Helper.CreateBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
    }

}

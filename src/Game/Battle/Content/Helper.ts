class Helper
{
    public static CreateBitmapByName(name: string): egret.Bitmap
    {
        let result = new egret.Bitmap();
        result.texture = RES.getRes(name);
        return result;
    }

    public static SetCollision(actorType: EnumActorType, shape: p2.Shape, isActor: boolean)
    {
        if (isActor)
        {
            shape.collisionGroup =
                (actorType == EnumActorType.Player) ?
                    EnumCollisionType.MY_ACTOR :
                    EnumCollisionType.ENEMY_ACTOR;
        }
        else
        {
            shape.collisionGroup =
                (actorType == EnumActorType.Player) ?
                    EnumCollisionType.MY_BULLET :
                    EnumCollisionType.ENEMY_BULLET;
        }

        if (actorType == EnumActorType.Player)
        {
            shape.collisionMask =
                EnumCollisionType.GROUND |
                EnumCollisionType.HELL |
                EnumCollisionType.ENEMY_ACTOR |
                EnumCollisionType.ENEMY_BULLET;
        }
        else
        {
            shape.collisionMask =
                EnumCollisionType.GROUND |
                EnumCollisionType.HELL |
                EnumCollisionType.MY_ACTOR |
                EnumCollisionType.MY_BULLET;
        }
    }

    public static CreateActor(data:ActorData, world: p2.World, con: egret.DisplayObjectContainer): Actor
    {
        // config.Actors.get(resId);
        // let shape = new p2.Box({width: data.Config.Radius*2, height: data.Config.Radius*2});
        let shape = new p2.Circle({radius: data.Config.Radius});
        shape.sensor = true;

        Helper.SetCollision(data.ActorType, shape, true);

        let body: p2.Body = new p2.Body({mass: 1, position: [0, 0], type: p2.Body.DYNAMIC});
        body.damping = 0;
        body.addShape(shape);

        // let pic: egret.Bitmap = Helper.CreateBitmapByName(data.SpriteName);
        // pic.width = shape.width;
        // pic.height = shape.height;
        // pic.anchorOffsetX = pic.width / 2;
        // pic.anchorOffsetY = pic.height / 2;
        //
        // body.displays = [pic];



        return new Actor(data, body);
    }

    public static CreateBullet(actor: Actor, world: p2.World, con: egret.DisplayObjectContainer): Bullet
    {
        let data = new BulletData(actor, actor.Data.Config.BulletId);

        let shape = new p2.Circle({radius: data.Config.Radius});
        shape.sensor = true;

        Helper.SetCollision(actor.Data.ActorType, shape, false);

        let body: p2.Body = new p2.Body({mass: 1, position: [0, 0], type: p2.Body.DYNAMIC});
        body.damping = 0;
        body.addShape(shape);

        // 先放在屏幕外面，不显示出来
        //pic.x = -2000;

        // body.displays = [pic];


        //body.velocity = [1000, 0];

        return new Bullet(data, body);
    }

    public static CreateGround(world: p2.World, con: egret.DisplayObjectContainer): Ground
    {
        let data = new GroundData();
        data.SpriteName = "checkbox_select_disabled_png";

        let shape = new p2.Box({width: con.stage.$stageWidth, height: 1000});
        shape.sensor = true;

        shape.collisionGroup = EnumCollisionType.GROUND;
        shape.collisionMask = 0xffff;

        let body: p2.Body = new p2.Body({mass: 0, position: [0, 0], type: p2.Body.STATIC});
        body.damping = 0;
        body.addShape(shape);

        // let pic: egret.Bitmap = Helper.CreateBitmapByName(data.SpriteName);
        // pic.width = shape.width;
        // pic.height = shape.height;
        // pic.anchorOffsetX = pic.width / 2;
        // pic.anchorOffsetY = pic.height / 2;

        // body.displays = [pic];

        let ground = new Ground();
        ground.Body = body;
        ground.Data = data;
        ground.Display = new GameObjectDisplay();
        ground.Display.name = "Ground";
        ground.Display.width = shape.width;
        ground.Display.height = shape.height;
        Helper.SetAnchorCenter(ground.Display);
        // ground.Display.addChild(pic);
        return ground;
    }

    public static CreateHell(world: p2.World, con: egret.DisplayObjectContainer): Hell
    {
        let data = new HellData();
        data.SpriteName = "button_down_png";

        let shape = new p2.Box({width: 1000, height: con.stage.$stageHeight});
        shape.sensor = true;

        shape.collisionGroup = EnumCollisionType.HELL;
        shape.collisionMask = 0xffff;

        let body: p2.Body = new p2.Body({mass: 0, position: [0, 0], type: p2.Body.STATIC});
        body.damping = 0;
        body.addShape(shape);

        // let pic: egret.Bitmap = Helper.CreateBitmapByName(data.SpriteName);
        // pic.width = shape.width;
        // pic.height = shape.height;
        // pic.anchorOffsetX = pic.width / 2;
        // pic.anchorOffsetY = pic.height / 2;

        // body.displays = [pic];


        let hell = new Hell();
        hell.Body = body;
        hell.Data = data;
        hell.Display = new GameObjectDisplay();
        hell.Display.name = "Hell";
        hell.Display.width = shape.width;
        hell.Display.height = shape.height;
        Helper.SetAnchorCenter(hell.Display);
        // hell.Display.addChild(pic);
        return hell;
    }

    public static SetAnchorCenter(disObj:egret.DisplayObject)
    {
        disObj.anchorOffsetX = disObj.width / 2;
        disObj.anchorOffsetY = disObj.height / 2;
    }

    public static SetToStageCenter(disObj:egret.DisplayObject)
    {
        disObj.x = egret.MainContext.instance.stage.stageWidth / 2;
        disObj.y = egret.MainContext.instance.stage.stageHeight / 2;
    }
    public static GetStageCenter():number[]
    {
        return [egret.MainContext.instance.stage.stageWidth / 2,
            egret.MainContext.instance.stage.stageHeight / 2];
    }
}

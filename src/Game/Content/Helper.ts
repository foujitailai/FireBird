class Helper
{
    public static CreateBitmapByName(name: string): egret.Bitmap
    {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
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

    public static CreateActor(actorType: EnumActorType, resId: number, world: p2.World, con: egret.DisplayObjectContainer): Actor
    {
        //TODO 通过id得到对应的配置数据
        let data = new ActorData();
        data.ActorType = actorType;
        data.SpriteName = "checkbox_select_disabled_png";


        let shape = new p2.Box({width: 100, height: 50});
        shape.sensor = true;

        Helper.SetCollision(actorType, shape, true);

        let body: p2.Body = new p2.Body({mass: 1, position: [0, 0], type: p2.Body.DYNAMIC});
        body.damping = 0;
        body.addShape(shape);

        let pic: egret.Bitmap = Helper.CreateBitmapByName(data.SpriteName);
        pic.width = shape.width;
        pic.height = shape.height;
        pic.anchorOffsetX = pic.width / 2;
        pic.anchorOffsetY = pic.height / 2;

        body.displays = [pic];


        let actor = new Actor();
        actor.Body = body;
        actor.Data = data;
        actor.Display = pic;
        return actor;
    }

    public static CreateBullet(actor: Actor, world: p2.World, con: egret.DisplayObjectContainer): Bullet
    {
        //TODO 通过id得到对应的配置数据
        let data = new BulletData();
        data.BulletType = EnumBulletType.Normal;
        data.SpriteName = "thumb_png";
        data.Actor = actor;

        let shape = new p2.Circle({radius: 10});
        shape.sensor = true;

        Helper.SetCollision(actor.Data.ActorType, shape, false);

        let body: p2.Body = new p2.Body({mass: 1, position: [0, 0], type: p2.Body.DYNAMIC});
        body.damping = 0;
        body.addShape(shape);

        let pic: egret.Bitmap = Helper.CreateBitmapByName(data.SpriteName);
        pic.width = shape.radius * 2;
        pic.height = pic.width;
        pic.anchorOffsetX = pic.width / 2;
        pic.anchorOffsetY = pic.height / 2;
        // 先放在屏幕外面，不显示出来
        pic.x = -2000;

        body.displays = [pic];

        body.position = [actor.Body.position[0] + 50, actor.Body.position[1]];
        //body.velocity = [1000, 0];


        let bullet = new Bullet();
        bullet.Body = body;
        bullet.Data = data;
        bullet.Display = pic;
        return bullet;
    }

    public static CreateGround(world: p2.World, con: egret.DisplayObjectContainer): Ground
    {
        let data = new GroundData();
        data.SpriteName = "checkbox_select_disabled_png";

        let shape = new p2.Box({width: con.stage.$stageWidth, height: 100});
        shape.sensor = true;

        shape.collisionGroup = EnumCollisionType.GROUND;
        shape.collisionMask = 0xffff;

        let body: p2.Body = new p2.Body({mass: 0, position: [0, 0], type: p2.Body.STATIC});
        body.damping = 0;
        body.addShape(shape);

        let pic: egret.Bitmap = Helper.CreateBitmapByName(data.SpriteName);
        pic.width = shape.width;
        pic.height = shape.height;
        pic.anchorOffsetX = pic.width / 2;
        pic.anchorOffsetY = pic.height / 2;

        body.displays = [pic];

        let ground = new Ground();
        ground.Body = body;
        ground.Data = data;
        ground.Display = pic;
        return ground;
    }

    public static CreateHell(world: p2.World, con: egret.DisplayObjectContainer): Hell
    {
        let data = new HellData();
        data.SpriteName = "button_down_png";

        let shape = new p2.Box({width: 2, height: con.stage.$stageHeight});
        shape.sensor = true;

        shape.collisionGroup = EnumCollisionType.HELL;
        shape.collisionMask = 0xffff;

        let body: p2.Body = new p2.Body({mass: 0, position: [0, 0], type: p2.Body.STATIC});
        body.damping = 0;
        body.addShape(shape);

        let pic: egret.Bitmap = Helper.CreateBitmapByName(data.SpriteName);
        pic.width = shape.width;
        pic.height = shape.height;
        pic.anchorOffsetX = pic.width / 2;
        pic.anchorOffsetY = pic.height / 2;

        body.displays = [pic];


        let hell = new Hell();
        hell.Body = body;
        hell.Data = data;
        hell.Display = pic;
        return hell;
    }
}

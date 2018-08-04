class Bullet extends GameObject
{
    public Display: BulletDisplay;
    public Data: BulletData;

    public constructor(data:BulletData, body:p2.Body)
    {
        super();

        this.Body = body;
        this.Data = data;
        this.Display = new BulletDisplay(this);


        // 初始化速度
        this.VelocityX = data.Config.Speed;

        // 初始化方向
        if (this.Data.Actor.Data.ActorType == EnumActorType.Npc)
        {
            this.VelocityX = -this.VelocityX;
        }

        // 初始化位置
        let offsetX = 0;
        if (this.Data.Actor.Data.Direct == EnumDirect.LEFT)
        {
            offsetX += -50;
        }
        else if (this.Data.Actor.Data.Direct == EnumDirect.RIGHT)
        {
            offsetX += 50;
        }

        this.SetPosition(this.Data.Actor.Body.position[0] + offsetX, this.Data.Actor.Body.position[1]);
    }

    public Dispose(): void
    {
        super.Dispose();
        this.Data = null;
    }

    public get CollisionTableType(): EnumCollisionTableType
    {
        if (this.Data.Actor.Data.ActorType == EnumActorType.Player)
        {
            return EnumCollisionTableType.MY_BULLET;
        }
        else
        {
            return EnumCollisionTableType.ENEMY_BULLET;
        }
    }
}

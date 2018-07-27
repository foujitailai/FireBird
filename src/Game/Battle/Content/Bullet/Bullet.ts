class Bullet extends GameObject
{
    public Data: BulletData;

    public constructor()
    {
        super();
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

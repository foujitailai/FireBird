
class Actor extends GameObject
{
    public Data: ActorData;

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
        if (this.Data.ActorType == EnumActorType.Player)
        {
            return EnumCollisionTableType.MY_ACTOR;
        }
        else
        {
            return EnumCollisionTableType.ENEMY_ACTOR;
        }
    }
}
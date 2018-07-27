class Hell extends GameObject
{
    public Data: HellData;

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
        return EnumCollisionTableType.HELL;
    }
}

class Ground extends GameObject
{
    public Data: GroundData;
    private _collisionTableType: EnumCollisionTableType;

    public constructor()
    {
        super();
    }

    public Dispose(): void
    {
        super.Dispose();
        this.Data = null;
    }

    public SetCollisionTableType(type: EnumCollisionTableType): void
    {
        this._collisionTableType = type;
    }

    public get CollisionTableType(): EnumCollisionTableType
    {
        return this._collisionTableType;
    }
}

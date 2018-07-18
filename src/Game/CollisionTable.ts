enum EnumCollisionTableType
{
    NONE,
    MY_ACTOR,
    MY_BULLET,
    ENEMY_ACTOR,
    ENEMY_BULLET,
    TOP_GROUND,
    BOTTOM_GROUND,
    LEFT_HELL,
    RIGHT_HELL,
    COUNT,
}


class CollisionTable
{
    //(a:GameObject, b:GameObject) => void
    private _actionTable : Array<Array< Function >>;

    public constructor()
    {
        this._actionTable = [];
        for (let x = 0; x < EnumCollisionTableType.COUNT; x++)
        {
            this._actionTable.push([]);
            for (let y = 0; y < EnumCollisionTableType.COUNT; y++)
            {
                this._actionTable[x].push(undefined);
            }
        }
    }

    public Release() : void
    {
        this._actionTable = null;
    }

    public Add(a : EnumCollisionTableType, b : EnumCollisionTableType, action : (a:GameObject, b:GameObject) => void) : void
    {
        this._actionTable[a][b] = action;
    }


    public FindAction(a : EnumCollisionTableType, b : EnumCollisionTableType) : Function
    {
        return this._actionTable[a][b];
    }
}

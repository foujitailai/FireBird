enum EnumCollisionTableType
{
    NONE,
    MY_ACTOR,
    MY_BULLET,
    ENEMY_ACTOR,
    ENEMY_BULLET,
    TOP_GROUND,
    BOTTOM_GROUND,
    HELL,
    COUNT,
}

type CollisionTableAction = (a:GameObject, b:GameObject) => void;
class CollisionTable implements IDisposable
{
    private _actionTable: Array<Array<CollisionTableAction>>;

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

    public Dispose(): void
    {
        this._actionTable = null;
    }

    public Add(a: EnumCollisionTableType, b: EnumCollisionTableType, action: CollisionTableAction): void
    {
        this._actionTable[a][b] = action;//, obj:any
    }


    public FindAction(a: EnumCollisionTableType, b: EnumCollisionTableType): CollisionTableAction
    {
        return this._actionTable[a][b];
    }

    public DoCollision(aGO: GameObject, bGO: GameObject): void
    {
        if (!aGO || !bGO)
        {
            return;
        }

        let action = this.FindAction(aGO.CollisionTableType, bGO.CollisionTableType);
        if (action)
        {
            action(aGO, bGO);
        }
    }
}

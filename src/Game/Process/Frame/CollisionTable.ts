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

class CallbackHandle
{
    public Listener: Function;
    public ThisObject: any;

    public constructor(listener: Function, thisObject: any)
    {
        this.Listener = listener;
        this.ThisObject = thisObject;
    }
}

class CollisionTable implements IDisposable
{
    //(a:GameObject, b:GameObject) => void
    private _actionTable: Array<Array<CallbackHandle>>;

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

    public Add(a: EnumCollisionTableType, b: EnumCollisionTableType, action: (a: GameObject, b: GameObject) => void): void
    {
        this._actionTable[a][b] = new CallbackHandle(action, undefined);//, obj:any
    }


    public FindAction(a: EnumCollisionTableType, b: EnumCollisionTableType): CallbackHandle
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
            action.Listener.apply(action.ThisObject, [aGO, bGO]);
        }
    }
}

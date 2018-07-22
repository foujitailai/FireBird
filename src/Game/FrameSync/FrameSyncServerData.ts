class FrameSyncServerData implements IPoolObject, IClearable
{
    private _type: EnumFrameSyncDataType = null;

    private _actorId: number;
    public get ActorId(): number
    {
        return this._actorId;
    }

    public get Type()
    {
        return this._type;
    }

    public SetFire(actorId:number)
    {
        this._actorId = actorId;
        this._type = EnumFrameSyncDataType.FIRE;
    }

    public OnPoolFree(): void
    {
        this.Clear();
    }

    public Clear(): void
    {
        this._actorId = 0;
        this._type = null;
    }
}

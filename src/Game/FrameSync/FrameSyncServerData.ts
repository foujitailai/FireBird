class FrameSyncServerData implements IPoolObject, IClearable
{
    private _type: EnumFrameSyncDataType = null;

    public get Type()
    {
        return this._type;
    }

    public SetFire()
    {
        this._type = EnumFrameSyncDataType.FIRE;
    }

    public OnPoolFree(): void
    {
        this.Clear();
    }

    public Clear(): void
    {
        this._type = null;
    }
}

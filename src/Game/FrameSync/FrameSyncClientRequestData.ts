class FrameSyncClientRequestData
{
    private _fire: RequestDataFire;

    public Clear()
    {
        if (this._fire)
        {
            Pool.Free(this._fire);
            this._fire = null;
        }
    }

    public get Fire():RequestDataFire
    {
        return this._fire;
    }

    public SetFire(id:number, fire: boolean): void
    {
        if (!this._fire)
        {
            this._fire = Pool.Get(RequestDataFire);
        }
        this._fire.SetFire(id, fire);
    }
}


class RequestDataFire implements IPoolObject, IClearable
{
    private _fire: boolean = false;
    private _id: number;

    public get Id():number
    {
        return this._id;
    }
    public get Fire():boolean
    {
        return this._fire;
    }
    public SetFire(id:number, fire:boolean):void
    {
        this._id = id;
        this._fire = fire;
    }

    public OnPoolFree(): void
    {
        this.Clear();
    }

    public Clear(): void
    {
        this._id = 0;
        this._fire = false;
    }

}

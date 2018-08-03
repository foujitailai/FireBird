class ActorInfo implements IDisposable
{
    private _id: number;
    private _avatarResUrl: string;
    private _bullet: number;

    public get ID():number
    {
        return this._id;
    }

    constructor(config: any)
    {
        this._id = config.ID;
        this._avatarResUrl = config.AvatarResUrl;
        this._bullet = config.Bullet;
    }

    public Dispose(): void
    {

    }

}

/**
 * 角色配置文件解释器
 */
class ActorConfig implements IConfigable
{
    private _configObj: any;
    private _actors: Map<number, ActorInfo>;

    public get Actors():Map<number, ActorInfo>
    {
        return this._actors;
    }

    public constructor(configObj: any)
    {
        this._actors = new Map<number, ActorInfo>();
        this._configObj = configObj;

        this.Prase();
    }

    public Dispose(): void
    {
        this._actors.forEach(v=>v.Dispose());
        this._actors.clear();
        this._configObj = null;
    }

    private Prase()
    {
        if (this._configObj.list && this._configObj.list.length)
        {
            for (let i = 0; i < this._configObj.length; ++i)
            {
                let actor = new ActorInfo(this._configObj.list[i]);
                this._actors.set(actor.ID, actor);
            }
        }
    }
}

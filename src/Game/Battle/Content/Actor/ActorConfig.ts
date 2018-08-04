class ActorInfo implements IDisposable
{
    private _id: number;
    private _avatarResUrl: string;
    private _bullet: number;
    private _radius: number;
    private _flipY: boolean;

    public get ID():number
    {
        return this._id;
    }

    public get Radius():number
    {
        return this._radius;
    }

    public get AvatarResUrl():string
    {
        return this._avatarResUrl;
    }

    public get BulletId():number
    {
        return this._bullet;
    }

    public get FlipY():boolean
    {
        return this._flipY;
    }

    constructor(config: any)
    {
        this._id = Number(config.ID);
        this._avatarResUrl = config.AvatarResUrl;
        this._bullet = Number(config.Bullet);
        this._radius = Number(config.Radius);
        this._flipY = config.FlipY;
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
            for (let i = 0; i < this._configObj.list.length; ++i)
            {
                let actor = new ActorInfo(this._configObj.list[i]);
                this._actors.set(actor.ID, actor);
            }
        }
    }
}

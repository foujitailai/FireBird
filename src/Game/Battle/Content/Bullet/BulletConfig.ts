enum EnumAvatarType
{
    /**
     * 位图
     */
    Bitmap = 0,

    /**
     * 序列帧
     */
    MovieClip = 1,
}

class BulletInfo implements IDisposable
{
    private _id: number;
    private _avatarType: EnumAvatarType;
    private _avatarResUrl: string;
    private _hurt: number;
    private _isThrough: boolean;
    private _yinYang: number;
    private _radius: number;
    private _powRadius: number;
    private _speed: number;
    private _rotSpeed: number;
    private _flipY: boolean;

    public get ID():number
    {
        return this._id;
    }

    public get AvatarType():EnumAvatarType
    {
        return this._avatarType;
    }

    public get FlipY():boolean
    {
        return this._flipY;
    }

    public get AvatarResUrl():string
    {
        return this._avatarResUrl;
    }

    public get Radius():number
    {
        return this._radius;
    }

    public get Speed():number
    {
        return this._speed;
    }

    public get RotSpeed():number
    {
        return this._rotSpeed;
    }

    public get Hurt():number
    {
        return this._hurt;
    }

    constructor(config: any)
    {
        this._id = config.ID;
        this._hurt = config.Hurt;
        this._isThrough = config.IsThrough;
        this._yinYang = config.YinYang;
        this._radius = config.Radius;
        this._powRadius = config.PowRadius;
        this._speed = config.Speed;
        this._rotSpeed = config.RotSpeed;
        this._avatarResUrl = config.AvatarResUrl;
        this._avatarType = config.AvatarType;
        this._flipY = config.FlipY;
    }

    public Dispose(): void
    {

    }

}

/**
 * 子弹配置文件解释器
 */
class BulletConfig implements IConfigable
{
    private _configObj: any;
    private _bullets: Map<number, BulletInfo>;

    public get Bullets():Map<number, BulletInfo>
    {
        return this._bullets;
    }

    public constructor(configObj: any)
    {
        this._bullets = new Map<number, BulletInfo>();
        this._configObj = configObj;

        this.Prase();
    }

    public Dispose(): void
    {
        this._bullets.forEach(v=>v.Dispose());
        this._bullets.clear();
        this._configObj = null;
    }

    private Prase()
    {
        if (this._configObj.list && this._configObj.list.length)
        {
            for (let i = 0; i < this._configObj.list.length; ++i)
            {
                let bullet = new BulletInfo(this._configObj.list[i]);
                this._bullets.set(bullet.ID, bullet);
            }
        }
    }
}

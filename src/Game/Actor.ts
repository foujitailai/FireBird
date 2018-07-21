/**
 * 碰撞层类型
 */
enum EnumCollisionType
{
    /**
     * 角色层
     */
    MY_ACTOR = 0x1,
    /**
     * 我的子弹层
     */
    MY_BULLET = 0x2,
    /**
     * 敌方角色层
     */
    ENEMY_ACTOR = 0x4,
    /**
     * 敌方的子弹层
     */
    ENEMY_BULLET = 0x8,
    /**
     * 地面层
     */
    GROUND = 0x10,
    /**
     * 死亡层
     */
    HELL = 0x11,
    /**
     * 其它
     */
    OTHER = 0x12,
}


class GameObject implements IDisposable
{
    public readonly Id: number;

    private static IdGenerate: number = 0;

    public constructor()
    {
        this.Id = ++GameObject.IdGenerate;
    }

    public Dispose(): void
    {
        this.Body = null;
        this.Display = null;
    }


    public Body: p2.Body;
    public Display: egret.DisplayObject;

    public VelocityX: number = 0;
    public VelocityY: number = 0;

    private _lastPosition:number[]=[0,0];
    private _lastRotation:number = 0;

    private _curPosition:number[]=[0,0];
    private _curRotation:number = 0;

    public SetPosition(x: number, y: number): void
    {
        this.Body.position[0] = x;
        this.Body.position[1] = y;
    }

    public SyncPy2View(): void
    {
        this.Display.x = this.Body.position[0];
        this.Display.y = this.Body.position[1];
        this.Display.rotation = this.GetRotationFromPy();
    }

    private GetRotationFromPy():number
    {
        return (this.Body.angle + this.Body.shapes[0].angle) * 180 / Math.PI;
    }

    public SyncData2Py():void
    {
        this.Body.velocity = [this.VelocityX, this.VelocityY];
    }

    public SyncPy2Data():void
    {
        this._lastPosition = this._curPosition;
        this._curPosition = this.Body.position;
        this._lastRotation = this._curRotation;
        this._curRotation = this.GetRotationFromPy();
    }

    public get CollisionTableType(): EnumCollisionTableType
    {
        return EnumCollisionTableType.NONE;
    }

    public SyncRender2View(progress: number)
    {

        this.Display.x = this.GetValueByProgress(progress, this._lastPosition[0], this._curPosition[0]);
        this.Display.y = this.GetValueByProgress(progress, this._lastPosition[1], this._curPosition[1]);
        this.Display.rotation = this.GetValueByProgress(progress, this._lastRotation, this._curRotation);
    }

    private GetValueByProgress(progress: number, src: number, dest: number)
    {
        return (dest - src) * progress + src;
    }
}


enum EnumActorType
{
    Player,
    Npc,
}

class ActorData
{
    public ActorType: EnumActorType;
    public SpriteName: string;
}

class Actor extends GameObject
{
    public Data: ActorData;

    public constructor()
    {
        super();
    }

    public Dispose(): void
    {
        super.Dispose();
        this.Data = null;
    }

    public get CollisionTableType(): EnumCollisionTableType
    {
        if (this.Data.ActorType == EnumActorType.Player)
        {
            return EnumCollisionTableType.MY_ACTOR;
        }
        else
        {
            return EnumCollisionTableType.ENEMY_ACTOR;
        }
    }
}


enum EnumBulletType
{
    Normal,
}

class BulletData
{
    public BulletType: EnumBulletType;
    public SpriteName: string;
    public Actor: Actor;
}

class Bullet extends GameObject
{
    public Data: BulletData;

    public constructor()
    {
        super();
    }

    public Dispose(): void
    {
        super.Dispose();
        this.Data = null;
    }

    public get CollisionTableType(): EnumCollisionTableType
    {
        if (this.Data.Actor.Data.ActorType == EnumActorType.Player)
        {
            return EnumCollisionTableType.MY_BULLET;
        }
        else
        {
            return EnumCollisionTableType.ENEMY_BULLET;
        }
    }
}

class GroundData
{
    public SpriteName: string;
}

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

class HellData
{
    public SpriteName: string;
}

class Hell extends GameObject
{
    public Data: HellData;

    public constructor()
    {
        super();
    }

    public Dispose(): void
    {
        super.Dispose();
        this.Data = null;
    }

    public get CollisionTableType(): EnumCollisionTableType
    {
        return EnumCollisionTableType.HELL;
    }
}

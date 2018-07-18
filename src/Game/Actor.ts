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


class GameObject
{
    public readonly Id: number;

    private static IdGenerate: number = 0;
    public constructor()
    {
        this.Id = ++GameObject.IdGenerate;
    }


    public Body:p2.Body;
    public Display:egret.DisplayObject;


    public SetPosition(x: number, y: number):void
    {
        this.Body.position[0] = x;
        this.Body.position[1] = y;
    }

    public SyncPy2View():void
    {
        this.Display.x = this.Body.position[0];
        this.Display.y = this.Body.position[1];
        this.Display.rotation = (this.Body.angle + this.Body.shapes[0].angle) * 180 / Math.PI;
    }
}



enum EnumActorType
{
	Player,
	Npc,
}

class ActorData
{
	public ActorType:EnumActorType;
	public SpriteName:string;
}

class Actor extends GameObject
{
    public Data:ActorData;
	public constructor()
	{
		super();
	}
}


enum EnumBulletType
{
    Normal,
}

class BulletData
{
    public BulletType:EnumBulletType;
    public SpriteName:string;
    public Actor: Actor;
}

class Bullet extends GameObject
{
    public Data:BulletData;
    public constructor()
    {
        super();
    }
}

class GroundData
{
    public SpriteName:string;
}

class Ground extends GameObject
{
    public Data:GroundData;
    public constructor()
    {
        super();
    }

}

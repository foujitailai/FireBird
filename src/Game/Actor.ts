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

class GameObject
{
	public readonly Id: number;

	private static IdGenerate: number = 0;
	public constructor()
	{
		this.Id = ++GameObject.IdGenerate;
	}
	public Sync():void
	{
	}
}

class Actor extends GameObject
{
	public Body:p2.Body;
	public Display:egret.DisplayObject;
	public Data:ActorData;

	public constructor()
	{
		super();
	}

	public SetPosition(x: number, y: number):void
	{
		this.Body.position[0] = x;
		this.Body.position[1] = y;
	}

	public Sync():void
	{
		this.Display.x = this.Body.position[0];
		this.Display.y = this.Body.position[1];
        this.Display.rotation = (this.Body.angle + this.Body.shapes[0].angle) * 180 / Math.PI;
	}
}
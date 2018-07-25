class ActorData implements IClearable
{
    public ActorType: EnumActorType;
    public SpriteName: string;
    public ActorId: number;
    public ResId: number;
    public Direct: EnumDirect;

    public constructor(actorId: number, actorType: EnumActorType, resId: number)
    {
        this.ActorId = actorId;
        this.ActorType = actorType;
        this.ResId = resId;
        this.Direct = this.ActorType == EnumActorType.Player ?
            EnumDirect.RIGHT :
            EnumDirect.LEFT;
    }

    public Clear(): void
    {
        this.ActorId = 0;
        this.ActorType = null;
        this.ResId = 0;
    }
}

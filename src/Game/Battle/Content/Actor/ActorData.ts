class ActorData implements IClearable
{
    public ActorType: EnumActorType;
    public ActorId: number;
    public Direct: EnumDirect;
    private _config: ActorInfo;

    public get Config(): ActorInfo
    {
        return this._config;
    }

    public constructor(actorId: number, actorType: EnumActorType, resId: number)
    {
        this.ActorId = actorId;
        this.ActorType = actorType;

        let config = ModuleCenter.Get(ConfigModule).GetConfig(ActorConfig, "actor_json");
        this._config = config.Actors.get(resId);

        this.Direct = this.ActorType == EnumActorType.Player ?
            EnumDirect.RIGHT :
            EnumDirect.LEFT;
    }

    public Clear(): void
    {
        this.ActorId = 0;
        this.ActorType = null;
        this._config = null;

    }
}

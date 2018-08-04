class BulletData
{
    public BulletType: EnumBulletType;
    // public SpriteName: string;
    private _actor: Actor;
    private _config: BulletInfo;


    public get Actor():Actor
    {
        return this._actor;
    }

    public get Config(): BulletInfo
    {
        return this._config;
    }

    public constructor(actor:Actor, resId:number)
    {
        this.BulletType = EnumBulletType.Normal;
        this._actor = actor;
        // this.SpriteName = "com-spr_json.HeroRedBall";

        let config = ModuleCenter.Get(ConfigModule).GetConfig(BulletConfig, "bullet_json");
        this._config = config.Bullets.get(resId);
    }
}

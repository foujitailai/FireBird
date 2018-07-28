class ModuleCenter extends ModuleCenterBase
{
    private static _instance: ModuleCenter;

    private _stage: egret.Stage;

    public constructor(stage: egret.Stage)
    {
        super();
        ModuleCenter._instance = this;

        this._stage = stage;
        this.Initialize();
    }

    protected Register(): void
    {
        let uiModule = new UIModule();
        uiModule._RealConstructor(this._stage, _GameUIRegister.Run);

        this.Add(new ResourceModule());
        this.Add(new SoundModule());
        this.Add(uiModule);

        this.Add(new BattleModule());
        this.Add(new AIModule());
        this.Add(new FrameSyncModule());

        this._stage = null;
    }

    public static Get<T extends IModule>(t: { new(): T; }): T
    {
        if (ModuleCenter._instance)
        {
            return ModuleCenter._instance.Get(t);
        }
        return null;
    }

}

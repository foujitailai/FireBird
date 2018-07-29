class ModuleCenter extends ModuleCenterBase
{
    private static _instance: ModuleCenter;

    public constructor()
    {
        super();
        ModuleCenter._instance = this;

        this.Initialize();
    }

    protected Register(): void
    {
        let stage = egret.MainContext.instance.stage;

        let sceneModule = new SceneModule();
        sceneModule._RealConstructor(stage);
        let uiModule = new UIModule();
        uiModule._RealConstructor(stage, _GameUIRegister.Run);

        this.Add(new ResourceModule());
        this.Add(new MasterModule());
        this.Add(new SoundModule());
        this.Add(sceneModule);
        this.Add(uiModule);

        this.Add(new BattleModule());
        this.Add(new AIModule());
        this.Add(new FrameSyncModule());
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

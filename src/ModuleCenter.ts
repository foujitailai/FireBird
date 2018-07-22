class ModuleCenter extends ModuleCenterBase
{
    private static _instance: ModuleCenter;
    public constructor()
    {
        super();
        ModuleCenter._instance = this;
        this.Initialize();
    }

    protected Register():void
    {
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


//TODO 各种功能用组件的方式注入到游戏系统里面去，然后游戏里面就会出现新的功能
class ModuleCenter implements IDisposable
{
    private static _instance: ModuleCenter;
    private _modules: Map<string, IModule>;

    public constructor()
    {
        ModuleCenter._instance = this;
        this._modules = new Map<string, IModule>();

        this.Register();
    }

    public Dispose()
    {
        this._modules.forEach(module =>
        {
            module.OnModuleRemoved();
            module.Dispose()
        });
        this._modules.clear();
        this._modules = null;
    }

    public Add(module: IModule): void
    {
        this._modules.set(module.Name, module);
        module.OnModuleAdded();
    }

    public Remove(module: IModule): void
    {
        module.OnModuleRemoved();
        this._modules.delete(module.Name);
    }

    public static Get<T extends IModule>(t: { new(): T; }): T
    {
        if (ModuleCenter._instance)
        {
            let className = ClassTool.GetTypeName(t);
            let module = ModuleCenter._instance._modules.get(className);
            return <T> module;
        }
        return null;
    }

    private Register():void
    {
        this.Add(new BattleModule());
        this.Add(new AIModule());
        this.Add(new FrameSyncModule());
    }

}

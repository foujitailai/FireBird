//TODO 各种功能用组件的方式注入到游戏系统里面去，然后游戏里面就会出现新的功能
abstract class ModuleCenterBase implements IDisposable
{
    private _modules: Map<string, IModule>;

    protected abstract Register(): void;

    public constructor()
    {
        this._modules = new Map<string, IModule>();
    }

    public Initialize():void
    {
        this.Register();
    }

    public Uninitialize():void
    {
        this._modules.forEach(module =>
        {
            module.OnModuleRemoved();
            module.Dispose()
        });
        this._modules.clear();
    }

    public Dispose()
    {
        this.Uninitialize();
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

    public Get<T extends IModule>(t: { new(): T; }): T
    {
        let className = ClassTool.GetTypeName(t);
        let module = this._modules.get(className);
        return <T> module;
    }
}

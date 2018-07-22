interface IModule extends IDisposable, IClassName
{
    OnModuleAdded(): void;

    OnModuleRemoved(): void;
}

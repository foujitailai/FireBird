/**
 * 配置模块
 */
class ConfigModule implements IModule
{
    private static _className: string;
    private _configs: Map<string, IConfigable>;

    public get Name(): string
    {
        if (!ConfigModule._className)
        {
            ConfigModule._className = ClassTool.GetTypeName(ConfigModule);
        }
        return ConfigModule._className;
    }

    public constructor()
    {
        this._configs = new Map<string, IConfigable>();
    }

    public Dispose(): void
    {
        this._configs.forEach(it => it.Dispose());
        this._configs.clear();
        this._configs = null;
    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
    }

    public GetConfig<T extends IConfigable>(t: {new(v:any): T}, name: string):T
    {
        let config = this._configs.get(name);
        if (!config)
        {
            let res = RES.getRes(name);
            if (!res)
            {
                console.error("找不到指定的配置：" + name);
                return;
            }
            else
            {
                config = new t(res);
                this._configs.set(name, config);
            }
        }
        return <T>config;
    }
}

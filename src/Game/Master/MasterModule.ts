class MasterModule implements IModule
{
    private static _className: string;

    public get Name(): string
    {
        if (!MasterModule._className)
        {
            MasterModule._className = ClassTool.GetTypeName(MasterModule);
        }
        return MasterModule._className;
    }

    private _setting: MasterSettingData;
    private _selfResId: number;

    public get SelfResId(): number
    {
        //TODO 之后要将这个数据转移到真正的角色存储数据里面去
        //return this._selfResId;
        return 11;
    }

    public get Setting():MasterSettingData
    {
        return this._setting;
    }

    public constructor()
    {
        this._setting = new MasterSettingData();
    }

    public Dispose(): void
    {
        this._setting.Dispose();
        this._setting = null;
    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
    }

}

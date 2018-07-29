class MasterModule implements IModule
{
    private static _className: string;
    private _setting: MasterSettingData;

    public get Name(): string
    {
        if (!MasterModule._className)
        {
            MasterModule._className = ClassTool.GetTypeName(MasterModule);
        }
        return MasterModule._className;
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

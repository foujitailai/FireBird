class MasterSettingData implements IDisposable
{
    private _isSoundMute:boolean = false;
    private _isMusicMute:boolean = false;

    private static _defaultSetting = {IsSoundMute:false, IsMusicMute:false};
    private static SETTING_KEY:string = "setting";

    public constructor()
    {
        let setting = LocalStorageTool.Get(MasterSettingData.SETTING_KEY);
        if (!setting)
        {
            this.Apply(MasterSettingData._defaultSetting);
            this.Save();
            setting = LocalStorageTool.Get(MasterSettingData.SETTING_KEY);
        }
        this.Apply(setting);
    }

    public Dispose(): void
    {
    }

    public get IsSoundMute():boolean
    {
        return this._isSoundMute;
    }
    public set IsSoundMute(value:boolean)
    {
        this._isSoundMute = value;
        this.Save();
    }
    public get IsMusicMute():boolean
    {
        return this._isMusicMute;
    }
    public set IsMusicMute(value:boolean)
    {
        this._isMusicMute = value;
        this.Save();
    }

    private Apply(setting: any)
    {
        this._isSoundMute = setting.IsSoundMute;
        this._isMusicMute = setting.IsMusicMute;
    }

    private Save()
    {
        LocalStorageTool.Set(MasterSettingData.SETTING_KEY,
            {IsSoundMute:this._isSoundMute,
            IsMusicMute:this._isMusicMute});
    }
}

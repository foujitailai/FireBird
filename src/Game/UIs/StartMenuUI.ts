class StartMenuUI extends UIBase
{
    public static readonly RES : Array<string> = ["preload"];
    public static readonly URL: string = "resource/ui/StartMenu.exml";//两种都可以"StartMenu";

    public SoundBtn:eui.Group;
    public RankBtn:eui.Group;

    public StartMenu:eui.Group;
    public GameIcon:eui.Image;
    public StartBattleBtn:eui.Group;

    public Top:eui.Group;
    public Bottom:eui.Group;

    private _ani: StartMenuUIAnimation;

    public constructor()
    {
        super(
            ClassTool.GetTypeName(StartMenuUI),
            StartMenuUI.RES,
            StartMenuUI.URL,
            EnumUILayer.NORMAL_MIDDLE);
    }

    public Dispose(): void
    {
        if (this._ani)
        {
            this._ani.Dispose();
            this._ani = null;
        }

        super.Dispose();
    }

    protected Initialize(): void
    {
        this._ani = new StartMenuUIAnimation(this);

        ButtonAniTool.AddScaleAni(this.StartBattleBtn);
        this.StartBattleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnStartBattonBtnClicked, this);
    }

    protected Uninitialize(): void
    {
        ButtonAniTool.RemoveScaleAni(this.StartBattleBtn);

        this._ani.Dispose();
        this._ani = null;
    }


    private _enterOrLeave:boolean=true;
    protected OnStartBattonBtnClicked(): void
    {
        EventTool.Disp(GameMain.Instance, GameEvent.START_BATTLE);

        // if (this._enterOrLeave)
        // {
        //     this._ani.EnterAni();
        // }
        // else
        // {
        //     this._ani.LeaveAni();
        // }
        // this._enterOrLeave = !this._enterOrLeave;
    }

    public PlayEnterAni():void
    {
        if (this._ani)
        {
            this._ani.EnterAni();
        }
    }

    public PlayLeaveAni():void
    {
        if (this._ani)
        {
            this._ani.LeaveAni();
        }
    }
}

class StartMenuUI extends UIBase
{
    public static readonly RES : Array<string> = ["preload"];
    public static readonly URL: string = "resource/ui/StartMenu.exml";//两种都可以"StartMenu";

    private SoundBtn:eui.Group;
    private RankBtn:eui.Group;

    private StartMenu:eui.Group;
    private GameIcon:eui.Image;
    private StartBattleBtn:eui.Group;

    private Top:eui.Group;
    private Bottom:eui.Group;

    private _aniCount:number;

    public constructor()
    {
        super(
            ClassTool.GetTypeName(StartMenuUI),
            StartMenuUI.RES,
            StartMenuUI.URL,
            EnumUILayer.NORMAL_MIDDLE);

        this._aniCount = 0;
    }

    public Dispose(): void
    {
        super.Dispose();
    }

    protected Initialize(): void
    {
        this.SaveOriginalData();

        ButtonAniTool.AddScaleAni(this.StartBattleBtn);
        this.StartBattleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnStartBattonBtnClicked, this);
    }
    private _enterOrLeave:boolean=true;
    protected OnStartBattonBtnClicked(): void
    {
        EventTool.Disp(GameMain.Instance, GameEvent.START_BATTLE);

        // if (this._enterOrLeave)
        // {
        //     this.EnterAni();
        // }
        // else
        // {
        //     this.LeaveAni();
        // }
        // this._enterOrLeave = !this._enterOrLeave;
    }

    protected Uninitialize(): void
    {
        ButtonAniTool.RemoveScaleAni(this.StartBattleBtn);
    }


    private get _isPlayingAni():boolean
    {
        return this._aniCount > 0;
    }
    private _originalData = {};
    public EnterAni(): void
    {
        if (this._isPlayingAni)
        {
            return;
        }

        {
            let src = -1000;
            let dest = this._originalData[this.GameIcon.hashCode].verticalCenter;
            egret.Tween.get(this.GameIcon)
                .call(this.IncreaseAniCount, this)
                .to({verticalCenter:src}, 0)
                .to({verticalCenter:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        {
            let src = -1000;
            let dest = this._originalData[this.StartBattleBtn.hashCode].horizontalCenter;
            egret.Tween.get(this.StartBattleBtn)
                .call(this.IncreaseAniCount, this)
                .to({horizontalCenter:src}, 0)
                .to({horizontalCenter:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        {
            let src = -200;
            let dest = this._originalData[this.Top.hashCode].top;
            egret.Tween.get(this.Top)
                .call(this.IncreaseAniCount, this)
                .to({top:src}, 0)
                .to({top:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        {
            let src = -200;
            let dest = this._originalData[this.Bottom.hashCode].bottom;
            egret.Tween.get(this.Bottom)
                .call(this.IncreaseAniCount, this)
                .to({bottom:src}, 0)
                .to({bottom:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
    }

    private IncreaseAniCount():void
    {
        if (this._aniCount <= 0)
        {
            console.log(`开始动画 当前数量 = ${this._aniCount}`);
            this._aniCount = 0;
        }
        this._aniCount++;
            console.log(`IIII动画 当前数量 = ${this._aniCount}`);
    }

    private DecreaseAniCount():void
    {
        this._aniCount--;
            console.log(`DDDD动画 当前数量 = ${this._aniCount}`);
        if (this._aniCount <= 0)
        {
            console.log(`结束动画 当前数量 = ${this._aniCount}`);
            this._aniCount = 0;
        }
    }

    public LeaveAni(): void
    {
        if (this._isPlayingAni)
        {
            return;
        }

        {
            let src = this._originalData[this.GameIcon.hashCode].verticalCenter;
            let dest = -1000;
            egret.Tween.get(this.GameIcon)
                .call(this.IncreaseAniCount, this)
                .to({verticalCenter:src}, 0)
                .to({verticalCenter:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        {
            let src = this._originalData[this.StartBattleBtn.hashCode].horizontalCenter;
            let dest = 1000;
            egret.Tween.get(this.StartBattleBtn)
                .call(this.IncreaseAniCount, this)
                .to({horizontalCenter:src}, 0)
                .to({horizontalCenter:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        // {
        //     let src = this._originalData[this.Top.hashCode].top;
        //     let dest = -200;
        //     egret.Tween.get(this.Top)
        //         .call(this.IncreaseAniCount, this)
        //         .to({top:src}, 0)
        //         .to({top:dest}, 300)
        //         .call(this.DecreaseAniCount, this);
        // }
        // {
        //     let src = this._originalData[this.Bottom.hashCode].bottom;
        //     let dest = -200;
        //     egret.Tween.get(this.Bottom)
        //         .call(this.IncreaseAniCount, this)
        //         .to({bottom:src}, 0)
        //         .to({bottom:dest}, 300)
        //         .call(this.DecreaseAniCount, this);
        // }
    }

    public SaveOriginalData(): void
    {
        this.SaveElement(this.GameIcon);
        this.SaveElement(this.StartBattleBtn);
        this.SaveElement(this.Top);
        this.SaveElement(this.Bottom);
    }

    private SaveElement(elm: any):void
    {
        this._originalData[elm.hashCode] = {
            horizontalCenter:elm.horizontalCenter,
            verticalCenter:elm.verticalCenter,
            bottom:elm.bottom,
            top:elm.top
        };
    }
}

class StartMenuUIAnimation extends UIAnimationBase
{
    private _ui: StartMenuUI;
    public constructor(ui:StartMenuUI)
    {
        super();
        this._ui = ui;
        this.SaveOriginalData();
    }

    public Dispose(): void
    {
        this._ui = null;
    }

    private SaveOriginalData(): void
    {
        this.SaveOriginal(this._ui.GameIcon);
        this.SaveOriginal(this._ui.StartBattleBtn);
        this.SaveOriginal(this._ui.Top);
        this.SaveOriginal(this._ui.Bottom);
    }

    public EnterAni(): void
    {
        if (this.IsPlayingAni)
        {
            return;
        }

        {
            let src = -1000;
            let dest = this.GetOriginal(this._ui.GameIcon).verticalCenter;
            egret.Tween.get(this._ui.GameIcon)
                .call(this.IncreaseAniCount, this)
                .to({verticalCenter:src}, 0)
                .to({verticalCenter:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        {
            let src = -1000;
            let dest = this.GetOriginal(this._ui.StartBattleBtn).horizontalCenter;
            egret.Tween.get(this._ui.StartBattleBtn)
                .call(this.IncreaseAniCount, this)
                .to({horizontalCenter:src}, 0)
                .to({horizontalCenter:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        {
            let src = -200;
            let dest = this.GetOriginal(this._ui.Top).top;
            egret.Tween.get(this._ui.Top)
                .call(this.IncreaseAniCount, this)
                .to({top:src}, 0)
                .to({top:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        {
            let src = -200;
            let dest = this.GetOriginal(this._ui.Bottom).bottom;
            egret.Tween.get(this._ui.Bottom)
                .call(this.IncreaseAniCount, this)
                .to({bottom:src}, 0)
                .to({bottom:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
    }

    public LeaveAni(): void
    {
        if (this.IsPlayingAni)
        {
            return;
        }

        {
            let src = this.GetOriginal(this._ui.GameIcon).verticalCenter;
            let dest = -1000;
            egret.Tween.get(this._ui.GameIcon)
                .call(this.IncreaseAniCount, this)
                .to({verticalCenter:src}, 0)
                .to({verticalCenter:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        {
            let src = this.GetOriginal(this._ui.StartBattleBtn).horizontalCenter;
            let dest = 1000;
            egret.Tween.get(this._ui.StartBattleBtn)
                .call(this.IncreaseAniCount, this)
                .to({horizontalCenter:src}, 0)
                .to({horizontalCenter:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
        // {
        //     let src = this.GetOriginal(this._ui.Top).top;
        //     let dest = -200;
        //     egret.Tween.get(this._ui.Top)
        //         .call(this.IncreaseAniCount, this)
        //         .to({top:src}, 0)
        //         .to({top:dest}, 300)
        //         .call(this.DecreaseAniCount, this);
        // }
        {
            let src = this.GetOriginal(this._ui.Bottom).bottom;
            let dest = -200;
            egret.Tween.get(this._ui.Bottom)
                .call(this.IncreaseAniCount, this)
                .to({bottom:src}, 0)
                .to({bottom:dest}, 300)
                .call(this.DecreaseAniCount, this);
        }
    }
}

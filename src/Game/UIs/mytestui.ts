
class mytestui extends eui.Component
{
    public SKIN_NAME:string = "TestTest";

    public IsLoadOk:boolean = false;

    //public TestBtn:eui.Group;

    public Show()
    {
        if (this.IsLoadOk)
        {
            this.visible = true;
            return;
        }

        this.Load().catch();

    }

    public Init()
    {
        //this.TestBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClicked, this);
        //ButtonAniTool.AddScaleAni(this.TestBtn);
    }

    public async Load()
    {
        let src=this;
        src.addEventListener(egret.Event.COMPLETE, () => {
            src.IsLoadOk = true;
            src.Init();
        }, this);
        src.skinName = this.SKIN_NAME;
    }

    public onBtnClicked()
    {
        console.log("clicked!");
    }
}

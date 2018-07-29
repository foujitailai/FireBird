class ButtonAniTool
{
    // 贝赛尔曲线计算
    // https://blog.csdn.net/korekara88730/article/details/45743339
    // public get factor():number {
    //     return 0;
    // }
    //                                               P1                              P2                    P3
    // public set factor(value:number) {
    //     this.ball.x = (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 100;
    //     this.ball.y = (1 - value) * (1 - value) * 100 + 2 * value * (1 - value) * 300 + value * value * 500;
    // }

    public static SetAnchorCenter(btn: egret.DisplayObject)
    {
        let anchorX = btn.width >> 1;
        let anchorY = btn.height >> 1;
        if (btn.anchorOffsetX != anchorX)
        {
            btn.x += (anchorX - btn.anchorOffsetX);
            btn.anchorOffsetX = anchorX;
        }
        if (btn.anchorOffsetY != anchorY)
        {
            btn.y += (anchorY - btn.anchorOffsetY);
            btn.anchorOffsetY = anchorY;
        }
    }

    public static AddScaleAni(btn: egret.DisplayObject)
    {
        ButtonAniTool.SetAnchorCenter(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ButtonAniTool.onBtnDown, null);
    }
    public static RemoveScaleAni(btn: egret.DisplayObject)
    {
        btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, ButtonAniTool.onBtnDown, null);
        btn.removeEventListener(egret.TouchEvent.TOUCH_END, ButtonAniTool.onBtnUp, null);
        btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, ButtonAniTool.onBtnUp, null);
    }

    private static onBtnDown(e: egret.TouchEvent)
    {
        // 这里假设按钮的scale是没有被改过的，都是1

        let btn: egret.DisplayObject = e.currentTarget;
        let scale = 1.1;
        let scale2 = 0.9;
        egret.Tween.get(btn)
            //.to({scaleX: scale2, scaleY: scale2}, 50)
            .to({scaleX: scale, scaleY: scale}, 50);
        btn.addEventListener(egret.TouchEvent.TOUCH_END, ButtonAniTool.onBtnUp, null);
        btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, ButtonAniTool.onBtnUp, null);
    }

    private static onBtnUp(e: egret.TouchEvent)
    {
        let btn: egret.DisplayObject = e.currentTarget;
        let scale = 1;
        egret.Tween.get(btn).to({scaleX: scale, scaleY: scale}, 50);
        btn.removeEventListener(egret.TouchEvent.TOUCH_END, ButtonAniTool.onBtnUp, null);
        btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, ButtonAniTool.onBtnUp, null);
    }
}
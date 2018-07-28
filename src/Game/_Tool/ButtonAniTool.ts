class ButtonAniTool
{
    public static AddScaleAni(btn: egret.DisplayObject)
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
        btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ButtonAniTool.onBtnDown, null);
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
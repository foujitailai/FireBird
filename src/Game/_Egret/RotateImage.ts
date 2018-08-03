/**
 * 旋转显示对象
 */
class RotateImage extends egret.DisplayObjectContainer implements IDisposable
{
    /**
     *
     * @param {number} speed 一秒钟旋转多少度
     * @param {egret.DisplayObject} disObj 被旋转的对象
     */
    constructor(speed: number, disObj: egret.DisplayObject)
    {
        super();

        this.width = 0;
        this.height = 0;

        this.addChild(disObj);

        egret.Tween.get(disObj, {loop: true})
            .to({rotation: 0}, 0)
            .to({rotation: 360}, speed);
    }

    public Dispose(): void
    {
        egret.Tween.get(this).pause();
        this.removeChildren();
    }

}
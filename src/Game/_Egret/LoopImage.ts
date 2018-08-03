/**
 * 循环显示显示对象
 */
class LoopImage extends egret.DisplayObjectContainer implements IDisposable
{
    /**
     * 构造函数
     * @param {number} speed 刷新一屏的速度是多少毫秒
     * @param {number} loopUnit 循环一次的单位长度是多少（几个像素）
     * @param disObj 被循环的对象
     */
    constructor(speed: number, loopUnit: number, disObj: egret.DisplayObject)
    {
        super();

        this.addChild(disObj);

        let stageWidth = egret.MainContext.instance.stage.stageWidth;

        let textureSpeed = loopUnit / stageWidth * speed;
        egret.Tween.get(this, {loop: true})
            .to({x: 0}, 0)
            .to({x: -loopUnit}, textureSpeed);
    }

    public Dispose(): void
    {
        egret.Tween.get(this).pause();
        this.removeChildren();
    }

}
/**
 * 循环显示显示对象
 */
class LoopImage extends egret.DisplayObjectContainer implements IDisposable
{
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
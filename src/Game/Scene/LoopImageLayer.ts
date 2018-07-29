/**
 * 循环显示图片层
 */
class LoopImageLayer extends egret.DisplayObjectContainer implements IDisposable
{
    /**
     * 构造函数
     * @param {number} speed 刷新一屏的速度是多少毫秒
     * @param {string} resName sprite 的资源名
     */
    constructor(speed: number, resName: string)
    {
        super();

        let stageWidth = egret.MainContext.instance.stage.stageWidth;
        let texture: egret.Texture = RES.getRes(resName);
        // 接缝处要闪，叠加一个象素
        let textureWidth = texture.textureWidth - 1;
        let colCount = Math.ceil(stageWidth / textureWidth + 1);

        // 创建这些图片，并设置y坐标，让它们连接起来
        for (let i = 0; i < colCount; i++)
        {
            var bmp = Helper.CreateBitmapByName(resName);
            bmp.x = textureWidth * i;
            this.addChild(bmp);
        }

        let textureSpeed = textureWidth / stageWidth * speed;
        egret.Tween.get(this, {loop: true})
            .to({x: 0}, 0)
            .to({x: -textureWidth}, textureSpeed);
    }

    public Dispose(): void
    {
        egret.Tween.get(this).pause();
        this.removeChildren();
    }

}

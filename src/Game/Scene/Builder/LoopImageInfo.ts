/**
 * 循环图像，配置节点
 */
class LoopImageInfo implements IDisposable
{
    private _oneScreenTime: number;
    private _loopUnit: number;

    public constructor(configObj: any)
    {
        this._oneScreenTime = configObj.oneScreenTime;
        this._loopUnit = configObj.loopUnit;
    }

    public Dispose(): void
    {
        this._oneScreenTime = 0;
        this._loopUnit = 0;
    }

    public get OneScreenTime(): number
    {
        return this._oneScreenTime;
    }

    public get LoopUnit(): number
    {
        return this._loopUnit;
    }
}
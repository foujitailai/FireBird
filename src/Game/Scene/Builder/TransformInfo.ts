/**
 * 坐标，配置节点
 */
class TransformInfo implements IDisposable
{
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    public constructor(configObj: any)
    {
        this._x = configObj.x;
        this._y = configObj.y;
        this._width = configObj.w;
        this._height = configObj.h;
    }

    public Set(x: number, y: number, width: number, height: number): void
    {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
    }

    public Dispose(): void
    {
    }

    public get X(): number
    {
        return this._x;
    }

    public get Y(): number
    {
        return this._y;
    }

    public get Width(): number
    {
        return this._width;
    }

    public get Height(): number
    {
        return this._height;
    }
}
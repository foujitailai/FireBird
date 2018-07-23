class GameObject implements IDisposable
{
    public readonly Id: number;

    private static IdGenerate: number = 0;

    public constructor()
    {
        this.Id = ++GameObject.IdGenerate;
    }

    public Dispose(): void
    {
        this.Body = null;
        this.Display = null;
    }


    public Body: p2.Body;
    public Display: egret.DisplayObject;

    public VelocityX: number = 0;
    public VelocityY: number = 0;

    private _lastPosition: number[] = [0, 0];
    private _lastRotation: number = 0;

    private _targetPosition: number[] = [0, 0];
    private _targetRotation: number = 0;

    public SetPosition(x: number, y: number): void
    {
        this.Body.position[0] = x;
        this.Body.position[1] = y;
    }

    public SyncPy2View(): void
    {
        this.Display.x = this.Body.position[0];
        this.Display.y = this.Body.position[1];
        this.Display.rotation = this.GetRotationFromPy();
    }

    private GetRotationFromPy(): number
    {
        return (this.Body.angle + this.Body.shapes[0].angle) * 180 / Math.PI;
    }

    public SyncData2Py(): void
    {
        this.Body.velocity = [this.VelocityX, this.VelocityY];
    }

    public SyncPy2Data(): void
    {
        this._lastPosition = this._targetPosition;
        this._targetPosition = this.Body.position;
        this._lastRotation = this._targetRotation;
        this._targetRotation = this.GetRotationFromPy();
    }

    public get CollisionTableType(): EnumCollisionTableType
    {
        return EnumCollisionTableType.NONE;
    }

    public SyncRender2View(progress: number)
    {

        this.Display.x = this.GetValueByProgress(progress, this._lastPosition[0], this._targetPosition[0]);
        this.Display.y = this.GetValueByProgress(progress, this._lastPosition[1], this._targetPosition[1]);
        this.Display.rotation = this.GetValueByProgress(progress, this._lastRotation, this._targetRotation);
    }

    private GetValueByProgress(progress: number, src: number, dest: number)
    {
        return (dest - src) * progress + src;
    }
}

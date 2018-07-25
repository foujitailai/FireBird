
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
    public Display: GameObjectDisplay;

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

    public SyncInitialize()
    {
        this.SetPos(this._lastPosition, this.Body.position);
        this.SetPos(this._targetPosition, this.Body.position);
        this._lastRotation = this.GetRotationFromPy();
        this._targetRotation = this._lastRotation;
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
        // if(this instanceof Actor)
        // {
        //     console.log("b lp["+this._lastPosition[0]+", "+this._lastPosition[1]+
        //     ", tp["+this._targetPosition[0]+", "+this._targetPosition[1]+
        //     ", bp["+this.Body.position[0]+", "+this.Body.position[1]
        //     );
        // }
        this.SetPos(this._lastPosition, this._targetPosition);
        this.SetPos(this._targetPosition, this.Body.position);
        this._lastRotation = this._targetRotation;
        this._targetRotation = this.GetRotationFromPy();

        // if(this instanceof Actor)
        // {
        //     console.log("e lp["+this._lastPosition[0]+", "+this._lastPosition[1]+
        //     ", tp["+this._targetPosition[0]+", "+this._targetPosition[1]+
        //     ", bp["+this.Body.position[0]+", "+this.Body.position[1]
        //     );
        // }
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

    private SetPos(dest: number[], src: number[])
    {
        dest[0] = src[0];
        dest[1] = src[1];
    }
}

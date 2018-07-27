
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

    private _cachePos: number[] = [0, 0];

    private _lastPosition: number[] = [0, 0];
    private _lastRotation: number = 0;

    private _targetPosition: number[] = [0, 0];
    private _targetRotation: number = 0;

    /**
     * 物理引擎过程中发生了碰撞事件，在里面修改物理对象的 position，是无效的，所以弄了这么一个缓冲
     * @param {number} x
     * @param {number} y
     * @constructor
     */
    public SetPosition(x: number, y: number): void
    {
        this._cachePos = [x,y];
    }
    public get CachePosition(): number[]
    {
        return this._cachePos;
    }

    private _cacheMidPosProcess: number;
    private _cacheMidPos: number[];
    public SetPositionMiddle(process: number, x: number, y: number)
    {
        this._cacheMidPosProcess = process;
        this._cacheMidPos = [x,y];
    }

    public SyncInitialize()
    {
        if (this._cachePos)
        {
            this.SetPos(this.Body.position, this._cachePos);
            this._cachePos = null;
        }
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
        // 在这里清除挺好，同步数据到物理引擎，说明是要进行下一次更新了
        this._cacheMidPos = null;
        this._cacheMidPosProcess = 0;

        this.Body.velocity = [this.VelocityX, this.VelocityY];
    }

    public SyncPy2Data(): void
    {
        // if(this instanceof Actor)
        // {
        //     console.log("b lp["+this._lastPosition[0]+", "+this._lastPosition[1]+
        //     "], tp["+this._targetPosition[0]+", "+this._targetPosition[1]+
        //     "], bp["+this.Body.position[0]+", "+this.Body.position[1]
        //     );
        // }
        if (this._cachePos)
        {
            this.SetPos(this.Body.position, this._cachePos);
            this._cachePos = null;
        }
        this.SetPos(this._lastPosition, this._targetPosition);
        this.SetPos(this._targetPosition, this.Body.position);
        this._lastRotation = this._targetRotation;
        this._targetRotation = this.GetRotationFromPy();

        // if(this instanceof Actor)
        // {
        //     console.log("e lp["+this._lastPosition[0]+", "+this._lastPosition[1]+
        //     "], tp["+this._targetPosition[0]+", "+this._targetPosition[1]+
        //     "], bp["+this.Body.position[0]+", "+this.Body.position[1]
        //     );
        // }
    }

    public get CollisionTableType(): EnumCollisionTableType
    {
        return EnumCollisionTableType.NONE;
    }

    public SyncRender2View(progress: number)
    {
        if (this._cacheMidPos)
        {
            if (progress < this._cacheMidPosProcess)
            {
                let subProgress = progress / this._cacheMidPosProcess;
                this.Display.x = this.GetValueByProgress(subProgress, this._lastPosition[0], this._cacheMidPos[0]);
                this.Display.y = this.GetValueByProgress(subProgress, this._lastPosition[1], this._cacheMidPos[1]);
            }
            else
            {
                let subProgress = (progress - this._cacheMidPosProcess) / (1 - this._cacheMidPosProcess);
                if (subProgress < 0.4)
                {
                    subProgress = 0;
                }
                this.Display.x = this.GetValueByProgress(subProgress, this._cacheMidPos[0], this._targetPosition[0]);
                this.Display.y = this.GetValueByProgress(subProgress, this._cacheMidPos[1], this._targetPosition[1]);
            }
        }
        else
        {
            this.Display.x = this.GetValueByProgress(progress, this._lastPosition[0], this._targetPosition[0]);
            this.Display.y = this.GetValueByProgress(progress, this._lastPosition[1], this._targetPosition[1]);
        }

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

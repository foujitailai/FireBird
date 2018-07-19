class ControllerData
{
    public constructor()
    {

    }

    public Release()
    {

    }


    /**
     * 跳起时给的力
     * @type {number}
     */
    public static readonly JUMP_VELOCITY: number = 2000;
    /**
     * 每帧在衰减的力
     * @type {number}
     */
    public static readonly JUMP_DAMPING: number = 100;
    /**
     * 重力做用的力
     * @type {number}
     */
    public static readonly GRAVITY_VELOCITY: number = 800;

    private _forceUp: number = 0;
    private _forceDown: number = 0;
    public get ForceUp()
    {
        return this._forceUp;
    }
    public set ForceUp(v:number)
    {
        this._forceUp = v;
    }

    public get ForceDown()
    {
        return this._forceDown;
    }
    public set ForceDown(v:number)
    {
        this._forceDown = v;
    }


    public Jump(): void
    {
        this._forceUp = ControllerData.JUMP_VELOCITY;
        this._forceDown = 0;
    }

    public CalcVelocityY():number
    {

        let velocityY = ControllerData.GRAVITY_VELOCITY;

        // 检测是否有在上升？
        if (this._forceUp > 0)
        {
            // 如果有，就加上升的值，同时还要将上升的值衰减下来
            velocityY -= this._forceUp;
            this._forceUp -= ControllerData.JUMP_DAMPING;
            if (this._forceUp < 0)
            {
                this._forceUp = 0;
            }
        }
        // 检测是否有在下降？
        if (this._forceDown > 0)
        {
            // 如果有，就加上升的值，同时还要将上升的值衰减下来
            velocityY += this._forceDown;
            this._forceDown -= ControllerData.JUMP_DAMPING;
            if (this._forceDown < 0)
            {
                this._forceDown = 0;
            }
        }

        return velocityY;
    }
}

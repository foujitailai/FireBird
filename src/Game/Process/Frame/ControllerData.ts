
//TODO 怪物应该也有一个这样的数据，然后就可以像玩家一起跳来跳去了
class ControllerData implements IDisposable
{
    public constructor()
    {

    }

    public Dispose()
    {

    }


    /**
     * 跳起时给的力
     * @type {number}
     */
    public static readonly JUMP_VELOCITY: number = 14/10*1136;
    /**
     * 每帧在衰减的力
     * @type {number}
     */
    public static readonly JUMP_DAMPING: number = 100;
    /**
     * 重力做用的力
     * @type {number}
     */
    public static readonly GRAVITY_VELOCITY: number = 26/10*1136;


    private forceVertical: number = 0;
    public get ForceVertical(): number
    {
        return this.forceVertical;
    }
    public set ForceVertical(v:number)
    {
        this.forceVertical = v;
    }

    public CalcVelocityY(delta: number):number
    {
        this.forceVertical += (delta/EnumFrameSyncDefine.INT_FLOAT_RATE) * ControllerData.GRAVITY_VELOCITY;
        return this.forceVertical;
    }

    public Jump(): void
    {
        this.forceVertical -= ControllerData.JUMP_VELOCITY;
    }

    private _screenSize = 5;
    private get _pixelCountOfScreenSize():number
    {
        return ModuleCenter.Get(BattleModule).Data.Context.Scene.Border.height / 2;
    }
    public ScreenSizeToPixel(screenSize: number)
    {
        return (screenSize / this._screenSize) * this._pixelCountOfScreenSize;
    }





    // public CalcVelocityY():number
    // {
    //     // 直接速度（每秒的速度，如果不去每帧设置，会被衰竭掉，可以通过damping=0来去掉衰竭）
    //     //this._self.Body.velocity = [(this._keyLeft - this._keyRight) * -200, (this._keyUp - this._keyDown) * -200];
    //     //this._self.Body.velocity = [0, 200];
    //
    //
    //     let velocityY = ControllerData.GRAVITY_VELOCITY;
    //
    //     // 检测是否有在上升？
    //     if (this._forceUp > 0)
    //     {
    //         // 如果有，就加上升的值，同时还要将上升的值衰减下来
    //         velocityY -= this._forceUp;
    //         this._forceUp -= ControllerData.JUMP_DAMPING;
    //         if (this._forceUp < 0)
    //         {
    //             this._forceUp = 0;
    //         }
    //     }
    //     // 检测是否有在下降？
    //     if (this._forceDown > 0)
    //     {
    //         // 如果有，就加上升的值，同时还要将上升的值衰减下来
    //         velocityY += this._forceDown;
    //         this._forceDown -= ControllerData.JUMP_DAMPING;
    //         if (this._forceDown < 0)
    //         {
    //             this._forceDown = 0;
    //         }
    //     }
    //
    //     return velocityY;
    // }

}

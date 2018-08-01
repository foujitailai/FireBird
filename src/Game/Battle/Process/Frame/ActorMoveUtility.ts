class ActorMoveUtility
{
    /**
     * 跳起时给的力
     * @type {number}
     */
    public static readonly JUMP_VELOCITY: number = 20/10*1136;
    /**
     * 每帧在衰减的力
     * @type {number}
     */
    public static readonly JUMP_DAMPING: number = 100;
    /**
     * 重力做用的力
     * @type {number}
     */
    public static readonly GRAVITY_VELOCITY: number = 60/10*1136;


    public static CalcVelocity(delta: number, go: GameObject):void
    {
        // 播放动画？
        if (ModuleCenter.Get(BattleModule).Data.Context.IsPlayAni)
        {
            //go.VelocityY;
        }
        // 正常游戏中
        else
        {
            go.VelocityY += (delta/EnumFrameSyncDefine.INT_FLOAT_RATE) * ActorMoveUtility.GRAVITY_VELOCITY;
        }
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

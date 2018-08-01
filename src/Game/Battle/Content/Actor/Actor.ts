
class Actor extends GameObject
{
    public Display: ActorDisplay;
    public Data: ActorData;
    private _sm: ActorStateMachine;

    /**
     * 发射子弹最小间隔时间
     */
    private static _FIRE_CD: number = 10;

    /**
     * 最后一次发射子弹的时间
     */
    private _lastFireTime: number = 0;

    public get Height(): number
    {
        return this.Data.Height;
    }

    public constructor(data:ActorData, body:p2.Body)
    {
        super();

        this.Body = body;
        this.Data = data;
        this.Display = new ActorDisplay(this);
        this._sm = new ActorStateMachine(this);
    }

    public Dispose(): void
    {
        super.Dispose();

        this._sm.Dispose();
        this._sm = null;

        this.Data = null;
    }

    public get CollisionTableType(): EnumCollisionTableType
    {
        if (this.Data.ActorType == EnumActorType.Player)
        {
            return EnumCollisionTableType.MY_ACTOR;
        }
        else
        {
            return EnumCollisionTableType.ENEMY_ACTOR;
        }
    }

    public SetFire()
    {
        // 这里是逻辑帧调用的，可以直接添加子弹了！
        let t = egret.getTimer();
        if (t - this._lastFireTime >= Actor._FIRE_CD)
        {
            ModuleCenter.Get(BattleModule).Battle.GameSceneContent.CreateBullet(this);
            this._lastFireTime = t;
        }
    }

    public SetJump()
    {
        this.VelocityY = -ActorMoveUtility.JUMP_VELOCITY;
    }

    public ChangeState<T extends ActorStateBase>(t: { new(): T }): void
    {
        this._sm.Change(t);
    }
}

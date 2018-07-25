
class Actor extends GameObject
{
    public Data: ActorData;

    /**
     * 发射子弹最小间隔时间
     */
    private static _FIRE_CD: number = 1000;

    /**
     * 最后一次发射子弹的时间
     */
    private _lastFireTime:number = 0;

    public constructor()
    {
        super();
    }

    public Dispose(): void
    {
        super.Dispose();
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

    }
}

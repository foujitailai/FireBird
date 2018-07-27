class PlayerMoveLogic implements IFrameProcessor
{
    private _self: Actor;
    private _controllerData: ControllerData;
    private _border: egret.Rectangle;

    public constructor()
    {
        let bm = ModuleCenter.Get(BattleModule);
        this._self = bm.Battle.GameSceneContent.ActorMgr.FindActor(bm.Data.Context.SelfId);
        this._controllerData = bm.Battle.ControllerData;
        this._border = bm.Data.Context.Scene.Border;
    }

    public Dispose(): void
    {
        this._self = null;
        this._controllerData = null;
        this._border = null;
    }

    public OnFrameSync(frame: number, data: FrameSyncServerDataAsset): void
    {
        if (this._self.Body.position[1] < this._border.top)
        {
            this.OnMyActor2TopGround(this._self, this._border.top);
        }
        else if (this._self.Body.position[1] > this._border.bottom)
        {
            this.OnMyActor2BottomGround(this._self, this._border.bottom);
        }
    }

    private OnMyActor2TopGround(actor: Actor, topGround:number): void
    {
        this._controllerData.ForceVertical = ControllerData.JUMP_VELOCITY*1.3;


        // 位置要修正回来
        let collisionPos = topGround + (actor.Height/2) + 1;
        actor.SetPosition(actor.Body.position[0], collisionPos);

        let moveLength = Math.abs(actor.Body.position[1] - actor.Body.previousPosition[1]);
        let unmoveLength = Math.abs(actor.Body.position[1] - collisionPos);
        actor.SetPositionMiddle((moveLength-unmoveLength) / moveLength, actor.Body.position[0], collisionPos+unmoveLength);
    }

    private OnMyActor2BottomGround(actor: Actor, bottomGround:number): void
    {
        this._controllerData.ForceVertical = -(ControllerData.JUMP_VELOCITY * 1.2);

        // 位置要修正回来
        let collisionPos = bottomGround - (actor.Height/2) - 1;
        actor.SetPosition(actor.Body.position[0], collisionPos);

        let moveLength = actor.Body.position[1] - actor.Body.previousPosition[1];
        let unmoveLength = actor.Body.position[1] - collisionPos;
        actor.SetPositionMiddle((moveLength-unmoveLength) / moveLength, actor.Body.position[0], collisionPos-unmoveLength);

        console.log("actor => ground ["+actor.CachePosition[0]+", "+actor.CachePosition[1] + "]");
    }
}

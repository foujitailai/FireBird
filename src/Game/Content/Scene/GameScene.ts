class GameScene implements IDisposable
{
    private _world: p2.World;

    private _onBeginContactHandle;
    private _onEndContactHandle;

    private _collisionTable: CollisionTable;

    private _battle: Battle;

    public get World()
    {
        return this._world;
    }

    public constructor(battle: Battle, collisionTable: CollisionTable)
    {
        this._collisionTable = collisionTable;
        this._battle = battle;

        this.CreateScene();
    }

    public Dispose()
    {
        this.DestroyScene();
    }

    private CreateScene(): void
    {
        // 创建物理引擎
        var wrd: p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 0];
        this._world = wrd;


        this._onBeginContactHandle = this.OnBeginContact.bind(this);
        this._onEndContactHandle = this.OnEndContact.bind(this);
        this._world.on("beginContact", this._onBeginContactHandle);
        this._world.on("endContact", this._onEndContactHandle);
    }

    private DestroyScene(): void
    {
        if (this._onBeginContactHandle) this._world.off("beginContact", this._onBeginContactHandle);
        if (this._onEndContactHandle) this._world.off("endContact", this._onEndContactHandle);
        this._onBeginContactHandle = null;
        this._onEndContactHandle = null;
    }

    private OnBeginContact(event: any): void
    {
        console.log("on target sensor BEG bodyA.id:" + event.bodyA.id + ",bodyB.id:" + event.bodyB.id);

        let aGO = this._battle.GameSceneContent.GetGameObjectByP2Id(event.bodyA.id);
        let bGO = this._battle.GameSceneContent.GetGameObjectByP2Id(event.bodyB.id);
        this._collisionTable.DoCollision(aGO, bGO);

        // if (!this._self || !this._self.Body)
        //     return;
        //
        // if (event.bodyA.id != this._self.Body.id &&
        //     event.bodyB.id != this._self.Body.id)
        //     return;
        //
        // let body = event.bodyA;
        // if (event.bodyA.id == this._self.Body.id)
        // {
        //     body = event.bodyB;
        // }
        // console.log("REMOVE BODY!!!!!!!!!!!")
        // this._world.removeBody(body);
    }

    private OnEndContact(event: any): void
    {
        console.log("on target sensor END bodyA.id:" + event.bodyA.id + ",bodyB.id:" + event.bodyB.id);
    }

    public OnUpdate(delta): void
    {
        // 更新物理引擎时间
        this._world.step(delta);
    }
}

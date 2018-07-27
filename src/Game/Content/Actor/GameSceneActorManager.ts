class GameSceneActorManager implements IDisposable
{
    private _battle: Battle;
    private _content: GameSceneContent;
    private _world: p2.World;
    private _actors: Map<number, Actor>;
    private _data: BattleData;


    public get ActorCount(): number
    {
        return this._actors.size;
    }

    public constructor(battle: Battle, gameSceneContent: GameSceneContent, world: p2.World)
    {
        this._actors = new Map<number, Actor>();
        this._battle = battle;
        this._content = gameSceneContent;
        this._world = world;
        this._data = ModuleCenter.Get(BattleModule).Data;

    }

    public Dispose()
    {
        this._data = null;

    }

    public CreateActor(data:ActorData):Actor
    {
        let actor = Helper.CreateActor(data, this._world, this._battle);
        this._content.AddGameObject(actor);
        this._actors.set(actor.Data.ActorId, actor);
        return actor;
    }

    public DestroyActor(actorId:number):void
    {
        // 关闭 AI
        this._data.Context.AI.CancelAI(actorId);

        let actor = this._actors.get(actorId);
        this._actors.delete(actorId);
        this._content.RemoveGameObject(actor);
    }

    public OnUpdate(delta: number)
    {
        let self = this.FindActor(this._data.Context.SelfId);

        self.VelocityY = this._battle.ControllerData.CalcVelocityY(delta);
        //console.log("self:" + self.VelocityY + ", p:" + self.Body.position[1]);

        // 测试功能，先让怪物先动起来
        this._actors.forEach(actor =>
        {
            if (actor.Data.ActorId != self.Data.ActorId)
            {
                actor.VelocityY = ControllerData.GRAVITY_VELOCITY;
            }
        });
    }

    public FindActor(actorId: number): Actor
    {
        return this._actors.get(actorId);
    }
}

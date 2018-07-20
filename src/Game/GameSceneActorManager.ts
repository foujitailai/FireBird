class GameSceneActorManager
{
    private _battle: Battle;
    private _content: GameSceneContent;
    private _world: p2.World;

    private _self: Actor;

    private _actors : Map<number, Actor>;//{ [key: number]: Actor; } = {};


    public get MonsterCount():number
    {
        return this._actors.size;
    }

    public get SelfActor(): Actor
    {
        return this._self;
    }

    public constructor(battle: Battle, gameSceneContent: GameSceneContent, world: p2.World)
    {
        this._actors = new Map<number, Actor>();
        this._battle = battle;
        this._content = gameSceneContent;
        this._world = world;

        this.CreateControllableActor();
    }

    public Release()
    {
        this.DestroyControllableActor();

    }


    private CreateControllableActor(): void
    {
        //TODO 添加控制的主角
        this._self = Helper.CreateActor(EnumActorType.Player, 1, this._world, this._battle);
        this._self.SetPosition(100, 100);
        this._content.AddGameObject(this._self);

    }

    public CreateMonster(): Actor
    {
        let actor = Helper.CreateActor(EnumActorType.Npc, 1, this._world, this._battle);
        actor.SetPosition(500, 100);
        this._content.AddGameObject(actor);
        this._actors[actor.Id] = actor;

        return actor;
    }

    public DestroyMonster(id:number)
    {
        let actor = this._actors.get(id);
        this._actors.delete(id);
        this._content.RemoveGameObject(actor);
    }

    private DestroyControllableActor(): void
    {
        console.log("DestroyControllableActor");
    }

    public SyncData2Py()
    {
        let velocityY = this._battle.ControllerData.CalcVelocityY();
        this._self.Body.velocity = [0, velocityY];
    }
}

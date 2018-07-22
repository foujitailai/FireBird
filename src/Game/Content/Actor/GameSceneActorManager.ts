class GameSceneActorManager implements IDisposable
{
    private _battle: Battle;
    private _content: GameSceneContent;
    private _world: p2.World;

    private _self: Actor;

    private _actors: Map<number, Actor>;
    private _data: BattleData;


    public get MonsterCount(): number
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
        this._data = ModuleCenter.Get(BattleModule).Data;

        this.CreateControllableActor();
    }

    public Dispose()
    {
        this.DestroyControllableActor();

        this._data = null;

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
        this._actors.set(actor.Id, actor);

        // 开启 AI
        this._data.Context.AI.SetAI(actor.Id);

        return actor;
    }

    public DestroyMonster(id: number)
    {
        // 关闭 AI
        this._data.Context.AI.CancelAI(id);

        let actor = this._actors.get(id);
        this._actors.delete(id);
        this._content.RemoveGameObject(actor);
    }

    private DestroyControllableActor(): void
    {
        console.log("DestroyControllableActor");
    }

    public OnUpdate(delta: number)
    {
        this._self.VelocityY = this._battle.ControllerData.CalcVelocityY();

        // 测试功能，先让怪物先动起来
        this._actors.forEach(actor =>
        {
            if (actor.Id != this._self.Id)
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

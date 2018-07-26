
class BattleContext implements IDisposable, IClearable
{

    private _selfId: number;
    private _actors: Map<number, ActorData>;
    private _ai: BattleContextAI;
    private _actorIdGenerator:number=0;
    private _scene: BattleSceneData;

    public get SelfId(): number
    {
        return this._selfId;
    }

    public SetSelfId(actorId:number):void
    {
        this._selfId = actorId;
    }

    public get AI():BattleContextAI
    {
        return this._ai;
    }

    public get MonsterCount(): number
    {
        let size = this._actors.size - 1;
        return Math.max(size, 0);
    }

    public get Scene():BattleSceneData
    {
        return this._scene;
    }

    public constructor()
    {
        this._selfId = 0;
        this._actors = new Map<number, ActorData>();
        this._ai = new BattleContextAI();
        this._scene = new BattleSceneData();
    }

    public Dispose(): void
    {
        this._selfId = 0;
        this._actors.clear();
        this._actors = null;
        this._ai.Dispose();
        this._ai = null;
        this._scene.Dispose();
        this._scene = null;
    }

    public Clear(): void
    {
        this._actors.clear();
        this._ai.Clear();
        this._scene.Clear();
    }

    public GenerateActorId():number
    {
        return ++this._actorIdGenerator;
    }

    public AddActor(id: number, data: ActorData): void
    {
        this._actors.set(id, data);
    }

    public RemoveActor(id: number): void
    {
        this._actors.delete(id);
    }

    public GetActor(id: number): ActorData
    {
        return this._actors.get(id);
    }

}

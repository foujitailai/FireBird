
class BattleContext implements IDisposable, IClearable
{

    private _selfId: number;
    private _actors: Map<number, ActorData>;
    private _ai: BattleContextAI;

    public get SelfId(): number
    {
        return this._selfId;
    }

    public get AI():BattleContextAI
    {
        return this._ai;
    }

    public constructor()
    {
        this._selfId = 1;
        this._actors = new Map<number, ActorData>();
        this._ai = new BattleContextAI();
    }

    public Dispose(): void
    {
        this._selfId = 0;
        this._actors.clear();
        this._actors = null;
        this._ai.Dispose();
        this._ai = null;
    }

    public Clear(): void
    {
        this._actors.clear();
        this._ai.Clear();
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

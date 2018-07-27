class BattleContextAI implements IDisposable, IClearable
{
    private _actorsSetAI: Set<number>;
    private _actorsCancelAI: Set<number>;

    public get ActorsSetAI(): Set<number>
    {
        return this._actorsSetAI;
    }

    public get ActorsCancelAI(): Set<number>
    {
        return this._actorsCancelAI;
    }

    public constructor()
    {
        this._actorsSetAI = new Set<number>();
        this._actorsCancelAI = new Set<number>();
    }

    public Clear(): void
    {
        this._actorsSetAI.clear();
        this._actorsCancelAI.clear();
    }

    public Dispose(): void
    {
        this._actorsSetAI.clear();
        this._actorsCancelAI.clear();
        this._actorsSetAI = null;
        this._actorsCancelAI = null;
    }


    public SetAI(actorId: number): void
    {
        this._actorsSetAI.add(actorId);
    }

    public CancelAI(actorId: number): void
    {
        this._actorsCancelAI.add(actorId);
    }
}

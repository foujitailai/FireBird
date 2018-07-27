class BattleData implements IDisposable, IClearable
{
    private _context: BattleContext;

    public get Context(): BattleContext
    {
        return this._context;
    }

    public constructor()
    {
        this._context = new BattleContext();
    }

    public Dispose(): void
    {
        this._context.Dispose();
        this._context = null;
    }

    public Clear(): void
    {
        this._context.Clear();
    }
}

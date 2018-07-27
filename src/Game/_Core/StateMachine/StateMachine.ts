class StateMachine<T extends TState<T>> implements IDisposable
{
    private _curState: T;
    private _states: Map<string, T>;


    public get State(): T
    {
        return this._curState;
    }

    public get IsSilent(): boolean
    {
        return this._curState == null;
    }

    public constructor()
    {
        this._states = new Map<string, T>();
        this._curState = null;
    }

    public Dispose(): void
    {
        this._curState = null;
        this._states.forEach(v => v.Dispose());
        this._states = null;
    }

    public Change(t: {new() : T}): void
    {
        let state = this.Get(t);
        let oldState = this._curState;
        if (this._curState)
        {
            this._curState.OnLeave(state);
        }
        console.log(ClassTool.GetTypeName(oldState) + " => " + ClassTool.GetTypeName(state) );
        this._curState = state;
        this._curState.OnEnter(oldState);
    }

    public Add<TS extends T>(ts: {new() : TS}): TS
    {
        let state = new ts();
        this._states.set(ClassTool.GetTypeName(ts), state);
        return state;
    }

    public Remove<TS extends T>(ts: {new() : TS}): void
    {
        let className = ClassTool.GetTypeName(ts);
        let state = this._states.get(className);
        this._states.delete(className);
        state.Dispose();
    }

    protected Get<TS extends T>(ts: {new() : TS}): TS
    {
        return <TS>this._states.get(ClassTool.GetTypeName(ts));
    }
}

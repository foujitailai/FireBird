interface TState<T extends IState> extends IDisposable, IState
{
    OnLeave(newState: T): void

    OnEnter(oldState: T): void
}

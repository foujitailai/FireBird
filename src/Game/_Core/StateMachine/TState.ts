interface TState<T extends IState> extends IDisposable, IState
{
    OnLevel(newState: T): void

    OnEnter(oldState: T): void
}

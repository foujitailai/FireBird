interface IFrameSyncServerImpl extends IDisposable
{
    Clear(): void;

    SetHandle(renderHandle: Function, frameHandle: Function): void;

    OnUpdate(delta: number): void;

    Start(): void;

    Stop(): void;
}

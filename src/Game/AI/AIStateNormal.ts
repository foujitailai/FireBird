class AIStateNormal extends AIStateBase
{
    public Dispose(): void
    {
    }

    public DoAIProcess(): void
    {
        let event = egret.Event.create(egret.Event, GameEvent.FIRE);
        this.SMachine.dispatchEvent(event);
        egret.Event.release(event);
    }

    public OnEnter(oldState: AIStateBase): void
    {
    }

    public OnLevel(newState: AIStateBase): void
    {
    }
}

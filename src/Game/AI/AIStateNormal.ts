class AIStateNormal extends AIStateBase
{
    public Dispose(): void
    {
    }

    public DoAIProcess(): void
    {
        EventTool.Disp(this.SMachine, GameEvent.FIRE);
    }

    public OnEnter(oldState: AIStateBase): void
    {
    }

    public OnLevel(newState: AIStateBase): void
    {
    }
}

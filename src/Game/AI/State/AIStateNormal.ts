class AIStateNormal extends AIStateBase
{
    public Dispose(): void
    {
    }

    public DoAIProcess(): void
    {
        EventTool.Disp(this.SMachine, BattleEvent.FIRE);
    }

    public OnEnter(oldState: AIStateBase): void
    {
    }

    public OnLeave(newState: AIStateBase): void
    {
    }
}

/**
 * 游戏启动状态
 */
class GameStateStartup extends GameStateBase
{
    public Dispose(): void
    {
    }

    public OnEnter(oldState: GameStateBase): void
    {
        this.SMachine.GameMain.Startup();

        this.SMachine.Change(GameStateInitLoading);
    }

    public OnLeave(newState: GameStateBase): void
    {
    }
}

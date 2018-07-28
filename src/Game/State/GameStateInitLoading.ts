/**
 * 游戏初始化加载
 */
class GameStateInitLoading extends GameStateBase
{
    public Dispose(): void
    {
    }

    public OnEnter(oldState: GameStateBase): void
    {
        this.Loading().catch(e =>
        {
            console.log(e);
        });
    }

    public OnLeave(newState: GameStateBase): void
    {
    }

    private async Loading()
    {
        // 注入自定义的素材解析器
        egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        
        // 加载
        let loading = new Loading();
        await loading.Run(this.SMachine.GameMain.stage);
        loading = null;

        EventTool.Disp(this.SMachine, GameEvent.LOADED);
    }
}

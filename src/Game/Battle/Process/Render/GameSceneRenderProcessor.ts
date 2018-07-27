class GameSceneRenderProcessor implements IRenderProcessor
{
    private _battle: Battle;
    private _gameSceneContent: GameSceneContent;

    constructor(battle: Battle)
    {
        this._battle = battle;
        this._gameSceneContent = this._battle.GameSceneContent;
    }

    public Dispose(): void
    {
        this._battle = null;
        this._gameSceneContent = null;
    }

    public OnRenderFrame(delta: number, progress: number, isFastPlay: boolean)
    {
        // 显示VIEW
        this._gameSceneContent.Render(delta, progress, isFastPlay);
    }
}

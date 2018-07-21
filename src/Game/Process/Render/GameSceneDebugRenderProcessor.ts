class GameSceneDebugRenderProcessor implements IRenderProcessor
{
    private _battle: Battle;
    private _gameSceneDebug: GameSceneDebug;

    constructor(battle: Battle)
    {
        this._battle = battle;
        this._gameSceneDebug = this._battle.GameSceneDebug;
    }

    public Dispose(): void
    {
        this._battle = null;
        this._gameSceneDebug = null;
    }

    public OnRenderFrame(delta: number, progress: number, isFastPlay: boolean)
    {
        if (this._battle.IsShowDebug)
        {
            this._gameSceneDebug.Draw();
        }
    }
}

class GameSceneFrameProcessor implements IFrameProcessor
{
    private _battle: Battle;
    private _gameSceneContent: GameSceneContent;
    private _gameScene: GameScene;
    private _playerMoveLogic: PlayerMoveLogic;

    public constructor(battle:Battle)
    {
        this._battle = battle;
        this._gameSceneContent = this._battle.GameSceneContent;
        this._gameScene = this._battle.GameScene;
        this._playerMoveLogic = new PlayerMoveLogic();
    }

    public Dispose(): void
    {
        this._battle = null;
        this._gameSceneContent = null;
        this._gameScene = null;
        this._playerMoveLogic.Dispose();
        this._playerMoveLogic = null;
    }

    public OnFrameSync(frame: number, data: FrameSyncServerDataAsset): void
    {
        this._gameSceneContent.OnUpdate(EnumFrameSyncDefine.FRAME_TIME);
        this._gameSceneContent.SyncData2Py();
        this._gameScene.OnUpdate(EnumFrameSyncDefine.FRAME_TIME / EnumFrameSyncDefine.INT_FLOAT_RATE);
        this._playerMoveLogic.OnFrameSync(frame, data);
        this._gameSceneContent.SyncPy2Data();
    }

}

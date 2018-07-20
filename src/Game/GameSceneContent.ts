class GameSceneContent
{
    private _battle: Battle;
    private _gameScene: GameScene;

    private _gameSceneBorder: GameSceneBorder;
    private _gameSceneActorMgr: GameSceneActorManager;
    private _gameSceneBulletMgr: GameSceneBulletManager;
    private _gameSceneGameObjectMgr: GameSceneGameObjectManager;

    public get ActorMgr(): GameSceneActorManager
    {
        return this._gameSceneActorMgr;
    }

    public constructor(battle: Battle, gameScene: GameScene)
    {
        this._battle = battle;
        this._gameScene = gameScene;

        this._gameSceneGameObjectMgr = new GameSceneGameObjectManager(this._battle, this._gameScene.World);

        this._gameSceneBorder = new GameSceneBorder(this._battle, this, this._gameScene.World);
        this._gameSceneActorMgr = new GameSceneActorManager(this._battle, this, this._gameScene.World);
        this._gameSceneBulletMgr = new GameSceneBulletManager(this._battle, this, this._gameScene.World);

    }

    public Release()
    {
        this._gameSceneBorder.Release();
        this._gameSceneActorMgr.Release();
        this._gameSceneBulletMgr.Release();
        this._gameSceneBorder = null;
        this._gameSceneActorMgr = null;
        this._gameSceneBulletMgr = null;

        this._gameSceneGameObjectMgr.Release();
        this._gameSceneGameObjectMgr = null;

        this._battle = null;
        this._gameScene = null;

    }

    public GetGameObjectByP2Id(p2Id: number): GameObject
    {
        return this._gameSceneGameObjectMgr.GetGameObjectByP2Id(p2Id);
    }

    public AddGameObject(go: GameObject)
    {
        this._gameSceneGameObjectMgr.AddGameObject(go);
    }

    public RemoveGameObject(go: GameObject)
    {
        this._gameSceneGameObjectMgr.RemoveGameObject(go);
    }

    public CreateBullet(sourceActor: Actor)
    {
        this._gameSceneBulletMgr.CreateBullet(sourceActor);
    }

    public CreateMonster(): Actor
    {
        return this._gameSceneActorMgr.CreateMonster();
    }

    public SyncData2Py()
    {
        this._gameSceneActorMgr.SyncData2Py();
        this._gameSceneBulletMgr.SyncData2Py();
    }

    public SyncPy2View()
    {
        this._gameSceneGameObjectMgr.SyncPy2View();
    }
}

class GameSceneContent implements IDisposable
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

    public Dispose()
    {
        this._gameSceneBorder.Dispose();
        this._gameSceneActorMgr.Dispose();
        this._gameSceneBulletMgr.Dispose();
        this._gameSceneBorder = null;
        this._gameSceneActorMgr = null;
        this._gameSceneBulletMgr = null;

        this._gameSceneGameObjectMgr.Dispose();
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
        //TODO 有些对象不用更新的，比如：墙、销毁区
        this._gameSceneGameObjectMgr.SyncData2Py();
    }

    // public SyncPy2View()
    // {
    //     //TODO 有些对象不用更新的，比如：墙、销毁区
    //     this._gameSceneGameObjectMgr.SyncPy2View();
    // }

    public OnUpdate(delta:number)
    {
        this._gameSceneActorMgr.OnUpdate(delta);
    }

    public Render(delta: number, progress: number, isFastPlay: boolean)
    {
        //TODO 计算插值并应用
        this._gameSceneGameObjectMgr.SyncRender2View(progress);
    }

    public SyncPy2Data()
    {
        this._gameSceneGameObjectMgr.SyncPy2Data();
    }
}

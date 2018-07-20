class GameSceneBulletManager
{
    private _world: p2.World;
    private _content: GameSceneContent;
    private _battle: Battle;

    public constructor(battle:Battle, gameSceneContent:GameSceneContent, world:p2.World)
    {
        this._battle = battle;
        this._content = gameSceneContent;
        this._world = world;
    }

    public Release()
    {

    }

    public CreateBullet(sourceActor: Actor)
    {
        let bullet = Helper.CreateBullet(sourceActor, this._world, this._battle);
        this._content.AddGameObject(bullet);
    }

    SyncData2Py()
    {

    }
}

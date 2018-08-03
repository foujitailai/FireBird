class GameSceneBulletManager implements IDisposable
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

    public Dispose()
    {
        this._battle = null;
        this._content = null;
        this._world = null;
    }

    public CreateBullet(sourceActor: Actor)
    {
        let bullet = Helper.CreateBullet(sourceActor, this._world, this._battle);
        bullet.VelocityX = sourceActor.Data.ActorType == EnumActorType.Player ? 100 : -100;
        this._content.AddGameObject(bullet, EnumSceneLayer.Bullet);
        bullet.SyncInitialize();
    }
}

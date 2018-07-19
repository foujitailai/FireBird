class GameSceneContent
{
    private _battle: Battle;
    private _gameScene: GameScene;

    private _self: Actor;

    public get SelfActor():Actor
    {
        return this._self;
    }

    public constructor(battle: Battle, gameScene:GameScene)
    {
        this._battle = battle;
        this._gameScene = gameScene;

        this.CreateControllableActor();
    }

    public Release()
    {
        this.DestroyControllableActor();
    }


    private CreateControllableActor(): void
    {
        //TODO 添加控制的主角
        this._self = Helper.CreateActor(EnumActorType.Player, 1, this._gameScene.World, this._battle);
        this._self.SetPosition(100, 100);
        this._battle.AddGameObject(this._self);

    }

    private DestroyControllableActor(): void
    {
        console.log("DestroyControllableActor");
    }

}

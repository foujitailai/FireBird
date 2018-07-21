class CollisionAction implements IDisposable
{

    private _battle:Battle;
    private _collisionTable:CollisionTable;
    private _controllerData: ControllerData;

    public constructor(battle:Battle, collisionTable:CollisionTable, controllerData: ControllerData)
    {
        this._battle = battle;
        this._collisionTable = collisionTable;
        this._controllerData = controllerData;

        this.AddCollisionAction();
    }


    public Dispose()
    {
        this._battle = null;
        this._collisionTable = null;
    }

    private AddCollisionAction()
    {
        let src = this;

        this._collisionTable.Add(EnumCollisionTableType.MY_ACTOR, EnumCollisionTableType.TOP_GROUND, (a, b) => src.OnMyActor2TopGround(a, b));
        this._collisionTable.Add(EnumCollisionTableType.MY_ACTOR, EnumCollisionTableType.BOTTOM_GROUND, (a, b) => src.OnMyActor2BottomGround(a, b));
        this._collisionTable.Add(EnumCollisionTableType.TOP_GROUND, EnumCollisionTableType.MY_ACTOR, (a, b) => src.OnMyActor2TopGround(b, a));
        this._collisionTable.Add(EnumCollisionTableType.BOTTOM_GROUND, EnumCollisionTableType.MY_ACTOR, (a, b) => src.OnMyActor2BottomGround(b, a));

        this._collisionTable.Add(EnumCollisionTableType.MY_BULLET, EnumCollisionTableType.HELL, (a, b) => src.OnBullet2Hell(a, b));
        this._collisionTable.Add(EnumCollisionTableType.HELL, EnumCollisionTableType.MY_BULLET, (a, b) => src.OnBullet2Hell(b, a));

        this._collisionTable.Add(EnumCollisionTableType.ENEMY_ACTOR, EnumCollisionTableType.TOP_GROUND, (a, b) => src.OnEnemyActor2TopGround(a, b));
        this._collisionTable.Add(EnumCollisionTableType.ENEMY_ACTOR, EnumCollisionTableType.BOTTOM_GROUND, (a, b) => src.OnEnemyActor2BottomGround(a, b));
        this._collisionTable.Add(EnumCollisionTableType.TOP_GROUND, EnumCollisionTableType.ENEMY_ACTOR, (a, b) => src.OnEnemyActor2TopGround(b, a));
        this._collisionTable.Add(EnumCollisionTableType.BOTTOM_GROUND, EnumCollisionTableType.ENEMY_ACTOR, (a, b) => src.OnEnemyActor2BottomGround(b, a));

        this._collisionTable.Add(EnumCollisionTableType.ENEMY_BULLET, EnumCollisionTableType.HELL, (a, b) => src.OnBullet2Hell(a, b));
        this._collisionTable.Add(EnumCollisionTableType.HELL, EnumCollisionTableType.ENEMY_BULLET, (a, b) => src.OnBullet2Hell(b, a));

    }

    private OnMyActor2TopGround(actor: GameObject, ground: GameObject): void
    {
        this._controllerData.ForceDown = this._controllerData.ForceUp;
        this._controllerData.ForceUp = 0;
        //TODO 位置要修正回来
        actor.SetPosition(actor.Body.position[0], 200);
    }

    private OnMyActor2BottomGround(actor: GameObject, ground: GameObject): void
    {
        this._controllerData.ForceUp = this._controllerData.ForceDown;
        this._controllerData.ForceDown = 0;
        //TODO 位置要修正回来
        actor.SetPosition(actor.Body.position[0], 900);
    }

    private OnBullet2Hell(bullet: GameObject, hell: GameObject): void
    {
        this._battle.GameSceneContent.RemoveGameObject(bullet);
    }

    private OnEnemyActor2TopGround(actor: GameObject, ground: GameObject): void
    {
        actor.SetPosition(actor.Body.position[0], 200);
    }

    private OnEnemyActor2BottomGround(actor: GameObject, ground: GameObject): void
    {
        actor.SetPosition(actor.Body.position[0], 900);
        this._battle.GameSceneContent.CreateBullet(actor as Actor);
    }

}

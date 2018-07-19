class CollisionAction
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


    public Release()
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

        this._collisionTable.Add(EnumCollisionTableType.MY_BULLET, EnumCollisionTableType.HELL, (a, b) => src.OnMyBullet2Hell(a, b));
        this._collisionTable.Add(EnumCollisionTableType.HELL, EnumCollisionTableType.MY_BULLET, (a, b) => src.OnMyBullet2Hell(b, a));
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

    private OnMyBullet2Hell(bullet: GameObject, hell: GameObject): void
    {
        this._battle.RemoveGameObject(bullet);
    }
}

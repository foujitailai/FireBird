import ECTT = EnumCollisionTableType;

class CollisionAction implements IDisposable
{

    private _battle:Battle;
    private _collisionTable:CollisionTable;
    private _controllerData: ControllerData;
    private _topGround: number;
    private _bottomGround: number;

    public constructor(battle:Battle, collisionTable:CollisionTable, controllerData: ControllerData)
    {
        this._battle = battle;
        this._collisionTable = collisionTable;
        this._controllerData = controllerData;

        let data = ModuleCenter.Get(BattleModule).Data;
        this._topGround = data.Context.Scene.Border.top;
        this._bottomGround = data.Context.Scene.Border.bottom;

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

        this._collisionTable.Add(ECTT.MY_ACTOR, ECTT.TOP_GROUND, (a, b) => src.OnMyActor2TopGround(<Actor>a, <Ground>b));
        this._collisionTable.Add(ECTT.MY_ACTOR, ECTT.BOTTOM_GROUND, (a, b) => src.OnMyActor2BottomGround(<Actor>a, <Ground>b));
        this._collisionTable.Add(ECTT.TOP_GROUND, ECTT.MY_ACTOR, (a, b) => src.OnMyActor2TopGround(<Actor>b, <Ground>a));
        this._collisionTable.Add(ECTT.BOTTOM_GROUND, ECTT.MY_ACTOR, (a, b) => src.OnMyActor2BottomGround(<Actor>b, <Ground>a));

        this._collisionTable.Add(ECTT.MY_BULLET, ECTT.HELL, (a, b) => src.OnBullet2Hell(<Bullet>a, <Hell>b));
        this._collisionTable.Add(ECTT.HELL, ECTT.MY_BULLET, (a, b) => src.OnBullet2Hell(<Bullet>b, <Hell>a));

        this._collisionTable.Add(ECTT.ENEMY_ACTOR, ECTT.TOP_GROUND, (a, b) => src.OnEnemyActor2TopGround(<Actor>a, <Ground>b));
        this._collisionTable.Add(ECTT.ENEMY_ACTOR, ECTT.BOTTOM_GROUND, (a, b) => src.OnEnemyActor2BottomGround(<Actor>a, <Ground>b));
        this._collisionTable.Add(ECTT.TOP_GROUND, ECTT.ENEMY_ACTOR, (a, b) => src.OnEnemyActor2TopGround(<Actor>b, <Ground>a));
        this._collisionTable.Add(ECTT.BOTTOM_GROUND, ECTT.ENEMY_ACTOR, (a, b) => src.OnEnemyActor2BottomGround(<Actor>b, <Ground>a));

        this._collisionTable.Add(ECTT.ENEMY_BULLET, ECTT.HELL, (a, b) => src.OnBullet2Hell(<Bullet>a, <Hell>b));
        this._collisionTable.Add(ECTT.HELL, ECTT.ENEMY_BULLET, (a, b) => src.OnBullet2Hell(<Bullet>b, <Hell>a));
    }

    private OnMyActor2TopGround(actor: Actor, ground: Ground): void
    {
        // this._controllerData.ForceDown = this._controllerData.ForceUp;
        // this._controllerData.ForceUp = 0;

        this._controllerData.ForceVertical *= 1.3;

        // 位置要修正回来
        actor.SetPosition(actor.Body.position[0], this._topGround + (actor.Height/2) + 1);
        actor.SyncInitialize();
    }

    private OnMyActor2BottomGround(actor: Actor, ground: Ground): void
    {
        // this._controllerData.ForceUp = this._controllerData.ForceDown;
        // this._controllerData.ForceDown = 0;

        this._controllerData.ForceVertical = -(ControllerData.JUMP_VELOCITY * 1.2);

        // 位置要修正回来
        actor.SetPosition(actor.Body.position[0], this._bottomGround - (actor.Height/2) - 1);
        actor.SyncInitialize();
    }

    private OnBullet2Hell(bullet: Bullet, hell: Hell): void
    {
        this._battle.GameSceneContent.RemoveGameObject(bullet);
    }

    private OnEnemyActor2TopGround(actor: Actor, ground: Ground): void
    {
        actor.SetPosition(actor.Body.position[0], 200);
    }

    private OnEnemyActor2BottomGround(actor: Actor, ground: Ground): void
    {
        actor.SetPosition(actor.Body.position[0], 400);
        //this._battle.GameSceneContent.CreateBullet(actor as Actor);
    }

}

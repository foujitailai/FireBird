import ECTT = EnumCollisionTableType;

class CollisionAction implements IDisposable
{

    private _battle:Battle;
    private _collisionTable:CollisionTable;
    private _topGround: number;
    private _bottomGround: number;

    public constructor(battle:Battle, collisionTable:CollisionTable)
    {
        this._battle = battle;
        this._collisionTable = collisionTable;

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

        this._collisionTable.Add(ECTT.MY_BULLET, ECTT.HELL, (a, b) => src.OnBullet2Hell(<Bullet>a, <Hell>b));
        this._collisionTable.Add(ECTT.HELL, ECTT.MY_BULLET, (a, b) => src.OnBullet2Hell(<Bullet>b, <Hell>a));

        this._collisionTable.Add(ECTT.ENEMY_ACTOR, ECTT.TOP_GROUND, (a, b) => src.OnEnemyActor2TopGround(<Actor>a, <Ground>b));
        this._collisionTable.Add(ECTT.ENEMY_ACTOR, ECTT.BOTTOM_GROUND, (a, b) => src.OnEnemyActor2BottomGround(<Actor>a, <Ground>b));
        this._collisionTable.Add(ECTT.TOP_GROUND, ECTT.ENEMY_ACTOR, (a, b) => src.OnEnemyActor2TopGround(<Actor>b, <Ground>a));
        this._collisionTable.Add(ECTT.BOTTOM_GROUND, ECTT.ENEMY_ACTOR, (a, b) => src.OnEnemyActor2BottomGround(<Actor>b, <Ground>a));

        this._collisionTable.Add(ECTT.ENEMY_BULLET, ECTT.HELL, (a, b) => src.OnBullet2Hell(<Bullet>a, <Hell>b));
        this._collisionTable.Add(ECTT.HELL, ECTT.ENEMY_BULLET, (a, b) => src.OnBullet2Hell(<Bullet>b, <Hell>a));
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

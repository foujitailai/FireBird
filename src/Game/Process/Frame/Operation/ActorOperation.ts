import FSDT = EnumFrameSyncDataType;

class ActorOperation implements IDisposable
{
    private _operations: Map<FSDT, Function>;
    private _actorMgr: GameSceneActorManager;

    public constructor(battle:Battle)
    {
        this._actorMgr = battle.GameSceneContent.ActorMgr;

        this._operations = new Map<FSDT, Function>();

        let src = this;
        this._operations.set(FSDT.FIRE, data => src.OnFire(data));
    }

    public Dispose(): void
    {
        this._actorMgr = null;

        this._operations.clear();
        this._operations = null;
    }

    public Run(operData: FrameSyncServerData)
    {
        let oper = this._operations.get(operData.Type);
        if (oper)
        {
            oper.apply(null, [operData]);
        }
    }

    private GetActor(data: FrameSyncServerData):Actor
    {
        return this._actorMgr.FindActor(data.ActorId);
    }

    private OnFire(data: FrameSyncServerData)
    {
        let actor = this.GetActor(data);
        if (actor)
        {
            actor.SetFire();
        }
    }
}
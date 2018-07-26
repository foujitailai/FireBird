class GameSceneGameObjectManager implements IDisposable
{
    private _battle: Battle;
    private _world: p2.World;

    private _gameObjects: { [key: number]: GameObject; } = {};

    constructor(battle: Battle, world: p2.World)
    {
        this._battle = battle;
        this._world = world;
    }

    public Dispose()
    {

    }

    public GetGameObjectByP2Id(p2Id: number): GameObject
    {
        for (let k in this._gameObjects)
        {
            let v = this._gameObjects[k];
            if (v.Body.id == p2Id)
            {
                return v;
            }
        }
        return null;
    }

    public AddGameObject(go: GameObject)
    {
        console.log("AddGameObject: " + ClassTool.GetTypeName(go) + "(gameObj=" + go.Id + ", body=" + go.Body.id + ")");
        this._battle.addChild(go.Display);
        this._world.addBody(go.Body);
        this._gameObjects[go.Id] = go;
    }

    public RemoveGameObject(go: GameObject)
    {
        if (this._gameObjects[go.Id])
        {
            console.log("RemoveGameObject: " + ClassTool.GetTypeName(go) + "(" + go.Id + ", body=" + go.Body.id + ")");
            delete this._gameObjects[go.Id];
            this._world.removeBody(go.Body);
            this._battle.removeChild(go.Display);
            go.Dispose();
        }
    }

    public SyncPy2View()
    {
        for (let k in this._gameObjects)
        {
            let v = this._gameObjects[k];
            v.SyncPy2View();
        }
    }

    public SyncData2Py()
    {
        for (let k in this._gameObjects)
        {
            let v = this._gameObjects[k];
            v.SyncData2Py();
        }
    }

    public SyncPy2Data()
    {
        for (let k in this._gameObjects)
        {
            let v = this._gameObjects[k];
            v.SyncPy2Data();
        }
    }

    public SyncRender2View(progress: number)
    {
        for (let k in this._gameObjects)
        {
            let v = this._gameObjects[k];
            v.SyncRender2View(progress);
        }
    }
}

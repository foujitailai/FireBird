interface IConfigable extends IDisposable
{
}

/**
 * 场景配置文件解释器
 */
class SceneConfig implements IConfigable
{
    private _configObj: any;
    private _rootNode: SceneNodeInfo;

    public get Root(): SceneNodeInfo
    {
        return this._rootNode;
    }

    public constructor(configObj: any)
    {
        this._configObj = configObj;

        this.Prase();
    }

    public Dispose(): void
    {
        this._configObj = null;
    }

    private Prase()
    {
        this._rootNode = new SceneNodeInfo(this._configObj);
    }
}

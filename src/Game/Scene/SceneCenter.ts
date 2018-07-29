class SceneCenter
{
    private _layerRoot : egret.DisplayObjectContainer;
    private _layerArray : Array<string>;
    private _layers : Map<string, SceneLayer>;


    public constructor(layerArray : Array<string>, stage: egret.Stage)
    {
        this._layerArray = layerArray;
        this._layerRoot = new egret.DisplayObjectContainer();
        this._layerRoot.name = "Scene";
        this._layers = new Map<string, SceneLayer>();

        this.Initialize(stage);
    }

    public Dispose() : void
    {
        this.Uninitialize();

        if (this._layers)
        {
            this._layers.clear();
            this._layers = null;
        }
        this._layerArray = null;
        if (this._layerRoot)
        {
            if (this._layerRoot.parent)
            {
                this._layerRoot.parent.removeChild(this._layerRoot);
            }
            this._layerRoot = null;
        }
    }

    private Initialize(stage : egret.Stage) : void
    {
        if (this._layerArray &&
            this._layers &&
            stage)
        {
            //UI层根节点的尺寸
            this._layerRoot.width = stage.width;
            this._layerRoot.height = stage.height;
            this._layerRoot.x = 0;
            this._layerRoot.y = 0;
            stage.addChild(this._layerRoot);

            //创建所有的层对象
            let layerCount : number = this._layerArray.length;
            for (let i : number = 0; i < layerCount; ++i)
            {
                let layerName = this._layerArray[i];
                let layer = new SceneLayer(layerName, this._layerRoot);
                this._layers.set(layerName, layer);
            }
        }
    }

    private Uninitialize() : void
    {
        if (this._layers)
        {
            this._layers.forEach(layer =>
            {
                layer.Dispose();
            });
            this._layers.clear();
        }
    }

    public GetLayer(layer:string):SceneLayer
    {
        return this._layers.get(layer);
    }
}

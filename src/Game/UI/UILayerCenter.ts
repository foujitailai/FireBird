/**
 * UI层管理中心
 */
class UILayerCenter implements IDisposable
{
    private _layerRoot : eui.UILayer;
    private _layerArray : Array<string>;
    private _layers : Map<string, UILayer>;


    public constructor(layerArray : Array<string>, stage: egret.Stage)
    {
        this._layerArray = layerArray;
        this._layerRoot = new eui.UILayer();
        this._layerRoot.name = "UI";
        this._layers = new Map();

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

    /**
     * 初始化
     * @param stage 舞台对象
     */
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
                let layerName : string = this._layerArray[i];
                let layer : UILayer = new UILayer(layerName, this._layerRoot);
                this._layers.set(layerName, layer);
            }
        }
    }

    /**
     * 反初始化
     */
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

    /**
     * 添加UI对象到层上
     * @param ui UI对象
     * @param layerName 层名字
     */
    public AddUIToLayer(ui : UIBase, layerName : string) : void
    {
        if (this._layers &&
            ui)
        {
            let layer : UILayer = this._layers.get(layerName);
            if (layer)
            {
                layer.AddUI(ui);
            }
        }
    }

    /**
     * 从层上移除UI对象
     * @param ui UI对象
     * @param layerName 层名字
     */
    public RemoveUIFromLayer(ui : UIBase, layerName : string) : void
    {
        if (this._layers &&
            ui)
        {
            let layer : UILayer = this._layers.get(layerName);
            if (layer)
            {
                layer.RemoveUI(ui);
            }
        }
    }
}

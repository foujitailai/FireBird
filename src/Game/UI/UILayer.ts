/**
 * UI层
 */
class UILayer implements IDisposable
{
    private _name: string;
    private _root: eui.UILayer;
    private _layer: eui.UILayer;
    private _uis: Map<string, UIBase>;

    /**
     * 构造函数
     * @param name 层名字
     * @param root 层的根节点
     */
    public constructor(name: string,
                       root: eui.UILayer)
    {
        this._name = name;
        this._root = root;
        this._layer = new eui.UILayer();
        this._layer.name = name;
        this._layer.touchEnabled = false;
        this._layer.touchChildren = true;

        if (this._root)
        {
            this._root.addChild(this._layer);
            this._layer.width = this._root.width;
            this._layer.height = this._root.height;
            this._layer.x = 0;
            this._layer.y = 0;
        }

        this._uis = new Map<string, UIBase>();
    }

    public Dispose(): void
    {
        if (this._uis)
        {
            this._uis.forEach(ui =>
            {
                ui.Dispose();
            });
            this._uis.clear();
            this._uis = null;
        }

        if (this._layer)
        {
            if (this._layer.parent)
            {
                this._layer.parent.removeChild(this._layer);
            }
            this._layer = null;
        }
        this._root = null;
        this._name = "";
    }

    public AddUI(ui: UIBase)
    {
        if (!ui)
        {
            return;
        }

        let uiName = ui.Name;
        let findUI = this._uis.get(uiName);
        if (!findUI)
        {
            this._uis.set(uiName, ui);
            this._layer.addChild(ui);
        }
    }

    public RemoveUI(ui: UIBase)
    {
        if (!ui)
        {
            return;
        }

        let uiName = ui.Name;
        let findUI = this._uis.get(uiName);
        if (findUI)
        {
            this._uis.delete(uiName);
            this._layer.removeChild(ui);
        }
    }
}

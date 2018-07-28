/**
 * UI模块
 */
class UIModule extends egret.EventDispatcher implements IModule
{
    private static _className: string;

    public get Name(): string
    {
        if (!UIModule._className)
        {
            UIModule._className = ClassTool.GetTypeName(UIModule);
        }
        return UIModule._className;
    }

    private _uis: Map<string, UIBase>;
    private _layerCenter : UILayerCenter;

    public constructor()
    {
        super();
    }

    public _RealConstructor(stage: egret.Stage, registerFunc:Function)
    {
        this._layerCenter = new UILayerCenter(this.GetLayerArray(), stage);

        this._uis = new Map<string, UIBase>();

        registerFunc(this._uis);
    }

    public Dispose() : void
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

        if (this._layerCenter)
        {
            this._layerCenter.Dispose();
            this._layerCenter = null;
        }
    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
    }

    /**
     * 将UI添加到指定名字的层上
     * @param ui UI对象
     * @param layerName 层名字
     */
    public AddUIToLayer(ui : UIBase, layerName : string) : void
    {
        this._layerCenter.AddUIToLayer(ui, layerName);
    }

    /**
     * 从指定名字的层上移除UI
     * @param ui UI对象
     * @param layerName 层名字
     */
    public RemoveUIFromLayer(ui : UIBase, layerName : string) : void
    {
        this._layerCenter.RemoveUIFromLayer(ui, layerName);
    }

    /**
     * 通过UI类型查询UI对象
     * @param uiClass UI类型
     * @return UI对象
     */
    public FindUI<UIClass extends UIBase>(uiClass : {new() : UIClass;}) : UIClass
    {
        let uiClassID = ClassTool.GetTypeName(uiClass);
        return <UIClass>this._uis.get(uiClassID);
    }


    private GetLayerArray()
    {
        let layerArray : Array<string> = [];
        for (let layerValue in EnumUILayer)
        {
            let layerIntValue = parseInt(layerValue);
            if (isNaN(layerIntValue))
            {
                layerArray.push(layerValue);
            }
        }

        return layerArray;
    }
}


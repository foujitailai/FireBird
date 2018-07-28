/**
 * UI基础类
 */
class UIBase extends eui.Component implements IDisposable
{
    private _state: EnumUIState;
    private _resUrls: Array<string>;
    private _exmlUrl: string;
    private _layer: string;
    private _uiName: string;

    public get Name(): string
    {
        return this._uiName;
    }

    /**
     * 构造函数
     * @param uiName UI名字
     * @param resUrls 资源Url集合
     * @param uiSkin UI的皮肤
     * @param uiLayer UI的层
     */
    public constructor(uiName: string, resUrls: Array<string>, uiSkin: string, uiLayer: string)
    {
        super();


        this._state = EnumUIState.FREE;
        this._uiName = uiName;
        this._resUrls = resUrls;
        this._exmlUrl = uiSkin;
        this._layer = uiLayer;
    }

    public Dispose(): void
    {
        this.Close();

        this._state = EnumUIState.FREE;
        this._layer = "";
        this._exmlUrl = "";
        this._resUrls = null;
    }

    /**
     * 开启UI
     */
    public Open(): void
    {
        switch (this._state)
        {
        case EnumUIState.FREE:
        {
            this._state = EnumUIState.LOADING;
            this.DoLoad();
            break;
        }
        case EnumUIState.CLOSE:
        {
            this.DoInitialize();
            break;
        }
        case EnumUIState.BREAKOFF:
        {
            this._state = EnumUIState.LOADING;
            break;
        }
        default:
        {
            break;
        }
        }
    }

    /**
     * 关闭UI
     */
    public Close(): void
    {
        switch (this._state)
        {
        case EnumUIState.OPEN:
        {
            this.DoUninitialize();
            break;
        }
        case EnumUIState.LOADING:
        {
            this._state = EnumUIState.BREAKOFF;
            break;
        }
        default:
        {
            break;
        }
        }
    }

    /**
     * 加载的行为
     */
    private async DoLoad(): Promise<void>
    {
        // //错误句柄
        // let errorHandler = function(error)
        // {
        //     throw error;
        // };
        //
        // //加载所有的依赖资源
        // let resCount : number = this._resUrls.length;
        // for (let i : number = 0; i < resCount; ++i)
        // {
        //     let resUrl: string = this._resUrls[i];
        //     //判断是否加载了资源
        //     var isLoadGroup = ResModule.IsLoadGroup(resUrl);
        //
        //     if (!isLoadGroup)
        //     {
        //         await ResModule.LoadGroup(resUrl).catch(errorHandler);
        //     }
        // }
        //
        // //加载Exml文件
        // await this._root.LoadExml(this._exmlUrl).catch(errorHandler);

        this.skinName = this._exmlUrl;

        //如果加载完毕后，在逻辑上UI被关闭了，则不去显示与初始化
        if (EnumUIState.BREAKOFF == this._state)
        {
            this._state = EnumUIState.CLOSE;
            return;
        }

        //初始化、显示UI
        this.DoInitialize();
    }

    /**
     * 初始化
     */
    private DoInitialize(): void
    {
        ModuleCenter.Get(UIModule).AddUIToLayer(this, this._layer);

        this._state = EnumUIState.OPEN;

        this.Initialize();
    }

    /**
     *  反初始化
     */
    private DoUninitialize(): void
    {
        this.Uninitialize();

        ModuleCenter.Get(UIModule).RemoveUIFromLayer(this, this._layer);

        this._state = EnumUIState.CLOSE;
    }

    /**
     * 初始化 (可重写)
     */
    protected Initialize(): void
    {
    }

    /**
     * 反初始化 (可重写)
     */
    protected Uninitialize(): void
    {
    }
}

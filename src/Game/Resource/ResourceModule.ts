class ResourceModule implements IModule
{
    private static _className: string;

    public get Name(): string
    {
        if (!ResourceModule._className)
        {
            ResourceModule._className = ClassTool.GetTypeName(ResourceModule);
        }
        return ResourceModule._className;
    }


    private _factory: egret.MovieClipDataFactory;

    public constructor()
    {
        this._factory = null;
    }

    public Dispose(): void
    {
        if (this._factory)
        {
            this._factory.clearCache();
            this._factory = null;
        }
    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
    }

    private GetFactory(factoryName: string): egret.MovieClipDataFactory
    {
        if (factoryName != "com")
        {
            console.error("暂时只支持com");
            return null;
        }

        if (this._factory)
        {
            return this._factory;
        }

        let data = RES.getRes("com-mc_json");
        if (!data)
        {
            console.error("没有 res=" + "com-mc_json");
            return null;
        }
        let txtr = RES.getRes("com-comp_png");
        if (!txtr)
        {
            console.error("没有 res=" + "com-comp_png");
            return null;
        }

        // 为什么这张纹理的offsetX会变成16???????????为什么 ！！！！！！！
        let ttt = <egret.Texture>txtr;
        ttt.$offsetX = 1;


        let factory = new egret.MovieClipDataFactory(data, txtr);
        factory.enableCache = true;

        this._factory = factory;
        return this._factory;
    }

    public GetMovieClip(factoryName: string, movieClipName: string): MyMovieClip
    {
        let factory = this.GetFactory(factoryName);
        if (!factory)
        {
            console.error("没有 factory=" + factoryName);
            return null;
        }

        let mcData = factory.generateMovieClipData(movieClipName);
        if (!mcData || mcData.frames.length <= 0)
        {
            console.error("没有 movieClipName=" + movieClipName);
            return null;
        }

        let mcReal = new egret.MovieClip(mcData);
        let mc = Pool.Get(MyMovieClip);
        mc.Initialize(mcReal);

        return mc;
    }

    public Free(mc: MyMovieClip)
    {
        Pool.Free(mc);
    }
}
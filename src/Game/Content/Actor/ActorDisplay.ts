class MyMovieClip implements IDisposable, IPoolObject
{
    private _mc: egret.MovieClip;

    public get MovieClip():egret.MovieClip
    {
        return this._mc;
    }

    public constructor()
    {
        this._mc = null;
    }

    public Dispose(): void
    {
        this.Uninitialize();
    }

    public OnPoolFree(): void
    {
        this.Uninitialize();
    }

    public Initialize(mc: egret.MovieClip)
    {
        this._mc = mc;

        this._mc.anchorOffsetX = this._mc.width / 2;
        this._mc.anchorOffsetY = this._mc.height / 2;
    }

    public Uninitialize()
    {
        if (this._mc)
        {
            this._mc.stop();
            this._mc = null;
        }
    }
}

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

    private GetFactory(factoryName:string):egret.MovieClipDataFactory
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

    public GetMovieClip(factoryName: string, movieClipName: string):MyMovieClip
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

class ActorDisplay extends GameObjectDisplay implements IDisposable
{
    private _actor: Actor;
    private _curPic: egret.Bitmap;
    private _mc: MyMovieClip;

    public constructor(actor: Actor)
    {
        super();
        this._actor = actor;

        this._mc = ModuleCenter.Get(ResourceModule).GetMovieClip("com", "Bird");
        this.addChild(this._mc.MovieClip);
    }

    public Dispose()
    {
        this.removeChild(this._mc.MovieClip);
        ModuleCenter.Get(ResourceModule).Free(this._mc);
        this._mc = null;
    }

    public SetAnimation(ani: string)
    {
        let aniName = "normal";
        if (ani == "Normal")
        {
            aniName = "normal";
        }
        else if (ani == "Fire")
        {
            aniName = "fire";
        }
        else if (ani == "Injured")
        {
            aniName = "dead";
        }

        this._mc.MovieClip.gotoAndPlay(aniName, -1);

        // let pic: egret.Bitmap = Helper.CreateBitmapByName(spriteName);
        // let shape = <p2.Box>this._actor.Body.shapes[0];
        // pic.width = shape.width;
        // pic.height = shape.height;
        // pic.anchorOffsetX = pic.width / 2;
        // pic.anchorOffsetY = pic.height / 2;
        // if (this._curPic)
        // {
        //     this.removeChild(this._curPic);
        //     this._curPic = null;
        // }
        // this._curPic = pic;
        // this.addChild(pic);
    }

    public AddEffect(effect: string)
    {

    }
}

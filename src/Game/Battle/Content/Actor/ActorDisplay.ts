
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

        this._mc.MovieClip.addEventListener(egret.Event.COMPLETE, this.OnAniComplete, this);
    }

    public Dispose()
    {
        this._mc.MovieClip.removeEventListener(egret.Event.COMPLETE, this.OnAniComplete, this);

        this.removeChild(this._mc.MovieClip);
        ModuleCenter.Get(ResourceModule).Free(this._mc);
        this._mc = null;
    }

    public OnAniComplete()
    {
        EventTool.Disp(this, egret.Event.COMPLETE);
    }

    public SetAnimation(ani: string)
    {
        let aniName = "normal";
        let playTimes = -1;
        if (ani == "Normal")
        {
            aniName = "normal";
        }
        else if (ani == "Fire")
        {
            aniName = "fire";
            playTimes = 1;
        }
        else if (ani == "Injured")
        {
            aniName = "dead";
        }

        this._mc.MovieClip.gotoAndPlay(aniName, playTimes);

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

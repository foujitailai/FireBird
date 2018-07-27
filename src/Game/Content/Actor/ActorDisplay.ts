
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

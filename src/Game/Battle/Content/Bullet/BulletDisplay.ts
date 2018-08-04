
class BulletDisplay extends GameObjectDisplay implements IDisposable
{
    private _bullet: Bullet;
    private _curPic: egret.Bitmap;
    private _mc: MyMovieClip;

    public constructor(bullet:Bullet)
    {
        super();
        this._bullet = bullet;

        let config = bullet.Data.Config;

        let disObj = null;

        // 位图类型
        if (config.AvatarType == EnumAvatarType.Bitmap)
        {
            let pic: egret.Bitmap = Helper.CreateBitmapByName(config.AvatarResUrl);
            pic.width = config.Radius * 2;
            pic.height = pic.width;
            Helper.SetAnchorCenter(pic);
            this._curPic = pic;
            disObj = this._curPic;
        }
        // 序列帧类型
        else if (config.AvatarType == EnumAvatarType.MovieClip)
        {
            this._mc = ModuleCenter.Get(ResourceModule).GetMovieClip("com", config.AvatarResUrl);
            disObj = this._mc.MovieClip;
            this.PlayAnimation();
        }

        // 必须是两个值中只有一个值为真才行
        if (config.FlipY || bullet.Data.Actor.Data.ActorType == EnumActorType.Npc)
        {
            if (!(config.FlipY && bullet.Data.Actor.Data.ActorType == EnumActorType.Npc))
            {
                // 垂直翻转
                disObj.skewY = 180;
            }
        }


        // 是否要旋转
        if (config.RotSpeed > 0)
        {
            this.addChild(new RotateImage(config.RotSpeed, disObj));
        }
        else
        {
            this.addChild(disObj);
        }

        // this._mc.MovieClip.addEventListener(egret.Event.COMPLETE, this.OnAniComplete, this);
    }

    public Dispose()
    {
        // this._mc.MovieClip.removeEventListener(egret.Event.COMPLETE, this.OnAniComplete, this);

        //TODO 需要把不同的显示对象统一到一个基类上面，再派生它的 Dispose，就可以管理自己的生命周期了
        if (this._mc)
        {
            if (this._mc.MovieClip && this._mc.MovieClip.parent)
            {
                this._mc.MovieClip.parent.removeChild(this._mc.MovieClip);
            }
            ModuleCenter.Get(ResourceModule).Free(this._mc);
            this._mc = null;
        }
        if (this._curPic)
        {
            if (this._curPic.parent)
            {
                this._curPic.parent.removeChild(this._curPic);
            }
            this._curPic = null;
        }
        this.removeChildren();

        super.Dispose();
    }

    // public OnAniComplete()
    // {
    //     EventTool.Disp(this, egret.Event.COMPLETE);
    // }

    private PlayAnimation()
    {
        let aniName = "normal";
        if (this._mc)
        {
            this._mc.MovieClip.gotoAndPlay(aniName, -1);
        }

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

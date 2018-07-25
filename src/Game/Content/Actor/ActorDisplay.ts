class ActorDisplay extends GameObjectDisplay
{
    private _actor: Actor;
    private _curPic: egret.Bitmap;

    public constructor(actor: Actor)
    {
        super();
        this._actor = actor;
    }

    public SetAnimation(ani: string)
    {
        let spriteName = this._actor.Data.SpriteName;
        if (ani == "Normal")
        {
            spriteName = "checkbox_select_disabled_png"
        }
        else if (ani == "Fire")
        {
            spriteName = "radiobutton_select_down_png";
        }
        else if (ani == "Injured")
        {
            spriteName = "thumb_png";
        }

        let pic: egret.Bitmap = Helper.CreateBitmapByName(spriteName);
        let shape = <p2.Box>this._actor.Body.shapes[0];
        pic.width = shape.width;
        pic.height = shape.height;
        pic.anchorOffsetX = pic.width / 2;
        pic.anchorOffsetY = pic.height / 2;
        if (this._curPic)
        {
            this.removeChild(this._curPic);
            this._curPic = null;
        }
        this._curPic = pic;
        this.addChild(pic);
    }

    public AddEffect(effect: string)
    {

    }
}

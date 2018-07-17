class Helper
{
    public static CreateBitmapByName(name: string): egret.Bitmap
    {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

	public static CreateActor(id: number, world: p2.World, con: egret.DisplayObjectContainer): Actor
	{
		//TODO 通过id得到对应的配置数据
		let data = new ActorData();
		data.ActorType = EnumActorType.Player;
		data.SpriteName = "checkbox_select_disabled_png";


        let boxShape: p2.Shape = new p2.Box({width: 100, height: 50});
        boxShape.sensor = true;
        let boxBody: p2.Body = new p2.Body({ mass: 1, position: [0, 0], type:p2.Body.DYNAMIC });
        boxBody.damping = 0;
        boxBody.addShape(boxShape);
        
        let pic: egret.Bitmap = Helper.CreateBitmapByName(data.SpriteName);
        pic.width = 100;
        pic.height = 100;
        pic.anchorOffsetX = pic.width / 2;
        pic.anchorOffsetY = pic.height / 2;
        con.addChild(pic);

        boxBody.displays = [pic];

        world.addBody(boxBody);


		let actor = new Actor();
		actor.Body = boxBody;
		actor.Data = data;
		actor.Display = pic;
		return actor;
	}

}
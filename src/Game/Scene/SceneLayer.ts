class SceneLayer extends egret.DisplayObjectContainer implements IDisposable
{
    public constructor(name:string,
                       root:egret.DisplayObjectContainer)
    {
        super();

        this.name = name;
        this.touchEnabled = false;
        // this.touchChildren = true;

        if (root)
        {
            root.addChild(this);
            //TODO 会有性能问题吗？
            this.width = root.width;
            this.height = root.height;
            this.x = 0;
            this.y = 0;
        }
    }

    public Dispose(): void
    {
        if (this.parent)
        {
            this.parent.removeChild(this);
        }
        this.name = "";
    }

    public AddGameObject(go:GameObject):void
    {
        this.addChild(go.Display);
    }

    public RemoveGameObject(go:GameObject):void
    {
        if (this !== go.Display.parent)
        {
            console.error("不在这个SceenLayer里面，但想通过它释放自己！")
            return;
        }

        go.Display.parent.removeChild(go.Display);

        //TODO 放到缓冲池里面 backup.addChild(go.Display);
    }
}

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
}

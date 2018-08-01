class ActorOnSelectNode extends egret.DisplayObjectContainer implements IDisposable
{
    private _node: egret.DisplayObjectContainer;
    public constructor(disObj:egret.DisplayObject)
    {
        super();

        this.width = 0;
        this.height = 0;

        this._node = new egret.DisplayObjectContainer();
        this._node.width = 0;
        this._node.height = 0;
        this._node.name = "node";
        this.addChild(this._node);
        this._node.addChild(disObj);

        egret.Tween.get(this._node, {loop: true})
            .to({y: 0}, 0)
            .to({y: -100}, 500)
            .to({y: 0}, 500);
    }

    public Dispose(): void
    {
        egret.Tween.get(this._node).pause();
        this._node.removeChildren();
        this.removeChildren();
    }

}

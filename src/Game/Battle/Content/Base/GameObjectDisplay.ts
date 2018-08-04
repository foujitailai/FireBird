class GameObjectDisplay extends egret.DisplayObjectContainer implements IDisposable
{
    public Dispose(): void
    {
        if (this.parent)
        {
            this.parent.removeChild(this);
        }
    }

}

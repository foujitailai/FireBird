class MyMovieClip implements IDisposable, IPoolObject
{
    private _mc: egret.MovieClip;

    public get MovieClip(): egret.MovieClip
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
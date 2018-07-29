class UIAnimationBase implements IDisposable
{
    private _aniCount: number;

    private _originalData = {};

    protected get IsPlayingAni(): boolean
    {
        return this._aniCount > 0;
    }

    public constructor()
    {
        this._aniCount = 0;
    }

    public Dispose(): void
    {
        this._aniCount = 0;
    }

    protected IncreaseAniCount(): void
    {
        if (this._aniCount <= 0)
        {
            // console.log(`开始动画 当前数量 = ${this._aniCount}`);
            this._aniCount = 0;
        }
        this._aniCount++;
        // console.log(`IIII动画 当前数量 = ${this._aniCount}`);
    }

    protected DecreaseAniCount(): void
    {
        this._aniCount--;
        // console.log(`DDDD动画 当前数量 = ${this._aniCount}`);
        if (this._aniCount <= 0)
        {
            // console.log(`结束动画 当前数量 = ${this._aniCount}`);
            this._aniCount = 0;
        }
    }

    protected SaveOriginal(elm: any): void
    {
        this._originalData[elm.hashCode] = {
            horizontalCenter: elm.horizontalCenter,
            verticalCenter: elm.verticalCenter,
            bottom: elm.bottom,
            top: elm.top
        };
    }

    protected GetOriginal(elm: any): any
    {
        return this._originalData[elm.hashCode];
    }
}

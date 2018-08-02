class BattleSceneData implements IDisposable, IClearable
{
    private _border: egret.Rectangle;

    public get Border():egret.Rectangle
    {
        return this._border;
    }

    public constructor()
    {
        this._border = egret.Rectangle.create();

        let horSide = 100;
        let verSide = 50;
        let width = 640;
        let height = 1136;

        this._border.setTo(-horSide, verSide, width + (horSide*2), height - (verSide*2));
    }

    public Clear(): void
    {
        this._border.setEmpty();
        this._border = null;
    }

    public Dispose(): void
    {
        egret.Rectangle.release(this._border);
    }
}
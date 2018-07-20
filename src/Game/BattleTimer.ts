class BattleTimer
{
    private _lastTime: number = 0;
    private _delta: number = 0;

    public get Delta():number
    {
        return this._delta;
    }

    public constructor()
    {
        this._lastTime = egret.getTimer();
    }
    public Release()
    {

        this._lastTime = 0;

    }

    public TakeSample()
    {
        // 计算当前帧的时间间隔
        let curTime = egret.getTimer();
        this._delta = (curTime - this._lastTime) / 1000;
        this._lastTime = curTime;
        if (this._delta > 1)
        {
            this._delta = 30 / 1000;
        }
    }


}

class ProcessorCenter
{
    private _processors: Array<IBattleProcessor>;

    public constructor()
    {
        this._processors = [];

        // 注册各种处理流程
        this.Register();
    }

    public Release()
    {
        this._processors.slice(0, this._processors.length);
        this._processors = null;
    }

    public Add(processor: IBattleProcessor)
    {
        this._processors.push(processor);
    }

    public Remove(processor: IBattleProcessor)
    {
        let index = this._processors.indexOf(processor);
        if (index >= 0)
        {
            this._processors.slice(index, 1);
        }
    }

    public OnFrameSync(frame: number)
    {
        for (let i: number = 0; i < this._processors.length; ++i)
        {
            this._processors[i].OnFrameSync(frame);
        }
    }

    /**
     * 注册各种处理流程
     */
    private Register()
    {
        this.Add(ModuleCenter.Get(AIModule).Processor);
    }
}

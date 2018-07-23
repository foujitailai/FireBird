abstract class ProcessorCenter<TProcessor extends IDisposable> implements IDisposable
{
    protected _processors: Array<TProcessor>;

    public constructor()
    {
        this._processors = [];

        // 注册各种处理流程
        this.Register();
    }

    public Dispose()
    {
        for (let i: number = 0; i < this._processors.length; ++i)
        {
            this._processors[i].Dispose();
        }
        this._processors.splice(0, this._processors.length);
        this._processors = null;
    }

    public Add(processor: TProcessor)
    {
        this._processors.push(processor);
    }

    public Remove(processor: TProcessor)
    {
        let index = this._processors.indexOf(processor);
        if (index >= 0)
        {
            this._processors.splice(index, 1);
        }
    }

    // public OnFrameSync(frame: number)
    // {
    //     for (let i: number = 0; i < this._processors.length; ++i)
    //     {
    //         this._processors[i].OnFrameSync(frame);
    //     }
    // }
    //
    /**
     * 注册各种处理流程
     */
    protected abstract Register():void;
}

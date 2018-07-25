class BattleProcess implements IDisposable
{
    private _renderProcess: RenderProcess;
    private _frameProcess: FrameProcess;
    private _frameSync: FrameSyncModule;

    public constructor()
    {
        this._renderProcess = new RenderProcess();
        this._frameProcess = new FrameProcess();


        // 注册帧回调
        this._frameSync = ModuleCenter.Get(FrameSyncModule);
        this._frameSync.SetHandle(
            this._renderProcess.OnRenderFrame.bind(this._renderProcess),
            this._frameProcess.OnFrameSync.bind(this._frameProcess));
    }

    public Dispose(): void
    {
        this._frameSync.SetHandle(null, null);
        this._renderProcess.Dispose();
        this._renderProcess = null;
        this._frameProcess.Dispose();
        this._frameProcess = null;
    }

    public OnUpdate(delta: number)
    {
        this._frameSync.OnUpdate(delta);
    }
}

class BattleStateMachine implements IDisposable
{
    public constructor()
    {

    }

    public Dispose()
    {

    }


    public BattlePause()
    {

    }

    public BattleBegin()
    {
        let frameSync = ModuleCenter.Get(FrameSyncModule);
        frameSync.Start(true);
    }

    public Battling()
    {

    }

    public BattleEnd()
    {
        let frameSync = ModuleCenter.Get(FrameSyncModule);
        frameSync.Stop();
        frameSync.ClearData();
    }
}

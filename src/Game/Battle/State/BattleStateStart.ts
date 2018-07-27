/**
 * 战斗开始状态
 */
class BattleStateStart extends BattleStateBase
{
    private _autoStartBattleTimer: egret.Timer;
    public Dispose(): void
    {
    }

    public OnEnter(oldState: BattleStateBase): void
    {
        let frameSync = ModuleCenter.Get(FrameSyncModule);
        frameSync.Start(true);

        // 角色切换到入场动画
        ModuleCenter.Get(BattleModule).Battle.GameSceneContent.SelfActor.ChangeState(ActorStateEntrance);

        // 入场动画结束，进入战斗状态
        this._autoStartBattleTimer = new egret.Timer(1000);
        this._autoStartBattleTimer.addEventListener(egret.TimerEvent.TIMER, this.OnAutoStartBattle, this);
        this._autoStartBattleTimer.start();
    }

    public OnLeave(newState: BattleStateBase): void
    {
        this._autoStartBattleTimer.removeEventListener(egret.TimerEvent.TIMER, this.OnAutoStartBattle, this);
        this._autoStartBattleTimer.stop();
        this._autoStartBattleTimer = null;
    }

    private OnAutoStartBattle():void
    {
        this.SMachine.Change(BattleStatePlaying);
    }
}

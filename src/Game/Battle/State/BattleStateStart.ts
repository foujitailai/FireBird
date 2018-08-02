/**
 * 战斗开始状态
 */
class BattleStateStart extends BattleStateBase
{
    private _autoStartBattleTimer: egret.Timer;
    private _selfActor: Actor;
    public Dispose(): void
    {
    }

    public OnEnter(oldState: BattleStateBase): void
    {
        let frameSync = ModuleCenter.Get(FrameSyncModule);
        frameSync.Start(true);

        // 角色切换到入场动画
        this._selfActor = ModuleCenter.Get(BattleModule).Battle.GameSceneContent.SelfActor;
        this._selfActor.ChangeState(ActorStateEntrance);

        this._selfActor.addEventListener(BattleEvent.ACTOR_ENTRANCED, this.OnActorEntranced, this);


        // // 入场动画结束，进入战斗状态
        // this._autoStartBattleTimer = new egret.Timer(1000);
        // this._autoStartBattleTimer.addEventListener(egret.TimerEvent.TIMER, this.OnAutoStartBattle, this);
        // this._autoStartBattleTimer.start();
    }

    public OnLeave(newState: BattleStateBase): void
    {
        // this._autoStartBattleTimer.removeEventListener(egret.TimerEvent.TIMER, this.OnAutoStartBattle, this);
        // this._autoStartBattleTimer.stop();
        // this._autoStartBattleTimer = null;

        this._selfActor.removeEventListener(BattleEvent.ACTOR_ENTRANCED, this.OnActorEntranced, this);
        this._selfActor = null;
    }

    private OnAutoStartBattle():void
    {
        this.SMachine.Change(BattleStatePlaying);
    }

    private OnActorEntranced()
    {
        this._selfActor.removeEventListener(BattleEvent.ACTOR_ENTRANCED, this.OnActorEntranced, this);

        this.SMachine.Change(BattleStatePlaying);
    }
}

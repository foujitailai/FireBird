/**
 * 游戏开始界面入口
 */
class GameStateStartMenu extends GameStateBase
{
    private _autoStartBattleTimer: egret.Timer;
    public Dispose(): void
    {
    }

    public OnEnter(oldState: GameStateBase): void
    {
        // show ui
        // show actor
        // play music

        this.SMachine.GameMain.addEventListener(GameEvent.START_BATTLE, this.OnStartBattle, this);

        this._autoStartBattleTimer = new egret.Timer(200);
        this._autoStartBattleTimer.addEventListener(egret.TimerEvent.TIMER, this.OnAutoStartBattle, this);
        this._autoStartBattleTimer.start();
    }

    public OnLeave(newState: GameStateBase): void
    {
        this._autoStartBattleTimer.removeEventListener(egret.TimerEvent.TIMER, this.OnAutoStartBattle, this);
        this._autoStartBattleTimer.stop();
        this._autoStartBattleTimer = null;

        this.SMachine.GameMain.removeEventListener(GameEvent.START_BATTLE, this.OnStartBattle, this);
    }

    private OnStartBattle():void
    {
        this.SMachine.Change(GameStateBattling);
    }

    private OnAutoStartBattle():void
    {
        this.OnStartBattle();
    }

}

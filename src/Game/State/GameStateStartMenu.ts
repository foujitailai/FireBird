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
        let ui = ModuleCenter.Get(UIModule).FindUI(StartMenuUI);
        ui.Open();
        ui.PlayEnterAni();

        // show scene
        let stage = egret.MainContext.instance.stage;
        let bgl = ModuleCenter.Get(SceneModule).GetLayer(EnumSceneLayer.Background);

        let config = ModuleCenter.Get(ConfigModule).GetConfig("Map1_json");
        let sceneDisObj = SceneBuilder.Run(config);
        Helper.SetToStageCenter(sceneDisObj);
        bgl.addChild(sceneDisObj);

        // show actor


        // play music
        ModuleCenter.Get(SoundModule).PlayMusic(EnumGameMusic.Main);

        this.SMachine.GameMain.addEventListener(GameEvent.START_BATTLE, this.OnStartBattle, this);

        this._autoStartBattleTimer = new egret.Timer(1000);
        this._autoStartBattleTimer.addEventListener(egret.TimerEvent.TIMER, this.OnAutoStartBattle, this);
        // this._autoStartBattleTimer.start();
    }

    public OnLeave(newState: GameStateBase): void
    {
        this._autoStartBattleTimer.removeEventListener(egret.TimerEvent.TIMER, this.OnAutoStartBattle, this);
        this._autoStartBattleTimer.stop();
        this._autoStartBattleTimer = null;

        this.SMachine.GameMain.removeEventListener(GameEvent.START_BATTLE, this.OnStartBattle, this);

        // 播放界面隐藏动画
        let ui = ModuleCenter.Get(UIModule).FindUI(StartMenuUI);
        ui.PlayLeaveAni();
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

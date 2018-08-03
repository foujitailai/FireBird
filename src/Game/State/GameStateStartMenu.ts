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

        let maps = ["Map1_json", "Map2_json", "Map3_json"];
        let mapIndex =  Math.floor( Math.random() * 100) % 3;

        let config = ModuleCenter.Get(ConfigModule).GetConfig(maps[mapIndex]);
        let sceneDisObj = SceneBuilder.Run(config);
        Helper.SetToStageCenter(sceneDisObj);
        bgl.addChild(sceneDisObj);
        //TODO GameObject不是从DisplayObject上面派生下来的，这样也就无法直接通过GetLayer().AddGameObject来进行统一管理了，怎么弄呢？

        // show actor
        let msl = ModuleCenter.Get(SceneModule).GetLayer(EnumSceneLayer.Master);
        let actorDisObj = new ActorDisplay(null);
        actorDisObj.width = 0;
        actorDisObj.height = 0;
        Helper.SetAnchorCenter(actorDisObj);
        actorDisObj.SetAnimation("Normal");
        let actorOnSelectNode = new ActorOnSelectNode(actorDisObj);
        msl.addChild(actorOnSelectNode);
        Helper.SetToStageCenter(actorOnSelectNode);

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

        // 角色换成真正的游戏里面的
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

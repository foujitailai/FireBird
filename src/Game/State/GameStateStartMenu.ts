/**
 * 游戏开始界面入口
 */
class GameStateStartMenu extends GameStateBase
{
    private _autoStartBattleTimer: egret.Timer;
    private _showingActor: Actor;

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
        this.AddScene();

        // show actor
        this.AddShowingActor();

        // play music
        ModuleCenter.Get(SoundModule).PlayMusic(EnumGameMusic.Main);

        this.SMachine.GameMain.addEventListener(GameEvent.START_BATTLE, this.OnStartBattle, this);

        this._autoStartBattleTimer = new egret.Timer(1000);
        this._autoStartBattleTimer.addEventListener(egret.TimerEvent.TIMER, this.OnAutoStartBattle, this);
        // this._autoStartBattleTimer.start();
    }

    private AddScene()
    {
        let stage = egret.MainContext.instance.stage;
        let bgl = ModuleCenter.Get(SceneModule).GetLayer(EnumSceneLayer.Background);

        let maps = ["Map1_json", "Map2_json", "Map3_json"];
        let mapIndex = Math.floor(Math.random() * 100) % 3;

        let config = ModuleCenter.Get(ConfigModule).GetConfig(SceneConfig, maps[mapIndex]);
        let sceneDisObj = SceneBuilder.Run(config);
        Helper.SetToStageCenter(sceneDisObj);
        bgl.addChild(sceneDisObj);
        //TODO GameObject不是从DisplayObject上面派生下来的，这样也就无法直接通过GetLayer().AddGameObject来进行统一管理了，怎么弄呢？
    }

    private AddShowingActor()
    {
        let msl = ModuleCenter.Get(SceneModule).GetLayer(EnumSceneLayer.Master);
        let showingActorData = new ActorData(0, EnumActorType.Player, ModuleCenter.Get(MasterModule).SelfResId);
        let actor = new Actor(showingActorData, null);
        let actorDisObj = actor.Display;
        actorDisObj.width = 0;
        actorDisObj.height = 0;
        Helper.SetAnchorCenter(actorDisObj);
        actor.ChangeState(ActorStateWait);
        let actorOnSelectNode = new ActorOnSelectNode(actorDisObj);
        msl.addChild(actorOnSelectNode);
        Helper.SetToStageCenter(actorOnSelectNode);

        this._showingActor = actor;
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

        this._showingActor.Dispose();
        this._showingActor = null;
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

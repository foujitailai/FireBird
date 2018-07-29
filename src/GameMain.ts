/**
 * 整个应用程序的入口, game=app、battle=具体玩法
 */
class GameMain extends egret.DisplayObjectContainer
{
    private _stateMachine: GameStateMachine;
    private _startpper: Startupper;

    private static _instance: GameMain;
    public static get Instance():GameMain
    {
        return GameMain._instance;
    }

    public get StateMachine():GameStateMachine
    {
        return this._stateMachine;
    }

    public constructor()
    {
        super();

        GameMain._instance = this;

        this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        // this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveToStage, this);

    }

    private onAddToStage(): void
    {
        this.Run().catch(e =>
        {
            console.log(e);
        });
    }

    // private onRemoveToStage(): void
    // {
    //     //TODO 哪里去做销毁工作
    //     // if (this._battle)
    //     //     this._battle.Dispose();
    //     // this._battle = null;
    // }

    private async Run()
    {
        this._stateMachine = new GameStateMachine(this);
        this._stateMachine.Change(GameStateStartup);
    }

    public Startup():void
    {
        this._startpper = new Startupper();

        // 初始化整个模块系统
        new ModuleCenter();
    }
}

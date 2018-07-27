/**
 * 游戏状态机
 */
class GameStateMachine extends egret.EventDispatcher implements IDisposable
{
    private _sm: StateMachine<GameStateBase>;
    private _gameMain: GameMain;

    public get GameMain():GameMain
    {
        return this._gameMain;
    }

    public constructor(gameMain:GameMain)
    {
        super();

        this._gameMain = gameMain;

        this._sm = new StateMachine<GameStateBase>();

        this.Add(GameStateStartup);
        this.Add(GameStateInitLoading);
        this.Add(GameStateStartMenu);
        this.Add(GameStateBattling);

        this.addEventListener(GameEvent.LOADED, this.OnLoaded, this);
    }

    public Dispose(): void
    {
        this._gameMain = null;
        this._sm.Dispose();
        this._sm = null;
    }

    private Add<T extends GameStateBase>(t: { new(): T }): void
    {
        let state = this._sm.Add(t);
        state.Initialize(this);
    }

    public Change<T extends GameStateBase>(t: { new(): T }): void
    {
        this._sm.Change(t);
    }

    private OnLoaded()
    {
        this.Change(GameStateStartMenu);
    }
}

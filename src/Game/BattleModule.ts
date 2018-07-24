
class BattleModule implements IModule
{
    private static _className: string;

    public get Name(): string
    {
        if (!BattleModule._className)
        {
            BattleModule._className = ClassTool.GetTypeName(BattleModule);
        }
        return BattleModule._className;
    }


    private _ui: BattleUI;
    private _battle: Battle;
    private _data: BattleData;

    public get UI(): BattleUI
    {
        return this._ui;
    }

    public get Data():BattleData
    {
        return this._data;
    }

    public get Battle():Battle
    {
        return this._battle;
    }

    public constructor()
    {
        this._data = new BattleData();
    }

    public Dispose(): void
    {
        this._data.Dispose();
        this._data = null;
    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
    }


    public Start(view:egret.DisplayObjectContainer): void
    {
        this._ui = new BattleUI();
        this._battle = new Battle();

        view.addChild(this._battle);
    }

    public Stop(): void
    {
        this._ui.Dispose();
        this._ui = null;
        this._battle.Dispose();
        this._battle = null;
        this.Clear();
    }

    public Clear(): void
    {
        this._data.Clear();
    }

}

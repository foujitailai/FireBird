import tr = egret.sys.tr;

class InputController implements IDisposable
{
    private _onKeyDownHandle;
    private _onKeyUpHandle;

    private _battle: Battle;

    private _keyDown: number = 0;
    private _keyUp: number = 0;
    private _keyLeft: number = 0;
    private _keyRight: number = 0;

    private _isEnable: boolean = false;

    public get IsEnable():boolean
    {
        return this._isEnable;
    }
    public set IsEnable(value:boolean)
    {
        this._isEnable = value;
    }

    public constructor(battle: Battle)
    {
        this._battle = battle;

        // 绑定键盘控制
        this._onKeyDownHandle = this.onKeyDown.bind(this);
        this._onKeyUpHandle = this.onKeyUp.bind(this);
        document.addEventListener("keydown", this._onKeyDownHandle);
        document.addEventListener("keyup", this._onKeyUpHandle);
        this._battle.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

        this._isEnable = true;
    }

    public Dispose()
    {
        if (this._onKeyDownHandle) document.removeEventListener("keydown", this._onKeyDownHandle);
        if (this._onKeyUpHandle) document.removeEventListener("keyup", this._onKeyUpHandle);
        this._onKeyDownHandle = null;
        this._onKeyUpHandle = null;
        this._battle.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

        this._battle = null;
        this._isEnable = false;
    }

    private onTouch(e: egret.TouchEvent): void
    {
        if (!this._isEnable)
        {
            return;
        }
        // console.log("clicked");
        this.SendFireEvent();
    }

    private SendFireEvent(): void
    {
        EventTool.Disp(this._battle, BattleEvent.FIRE);
    }

    private onKeyDown(evt): void
    {
        if (!this._isEnable)
        {
            return;
        }
        // console.log("evt.keyCode:" + evt.keyCode);
        // keycode 38 = Up ↑
        // keycode 40 = Down ↓
        // keycode 37 = Left ←
        // keycode 39 = Right →
        switch (evt.keyCode)
        {
        case 38:
            this._keyUp = 1;
            break;
        case 40:
            this._keyDown = 1;
            break;
        case 37:
            this._keyLeft = 1;
            break;
        case 39:
            this._keyRight = 1;
            break;
        case 32:
            this.SendFireEvent();
            break;
            // case 86:
            //     this._battle.OnJump();
            //     break;
        case 18:
            this._battle.SetShowDebug(true);
            break;
        }
    }

    private onKeyUp(evt): void
    {
        if (!this._isEnable)
        {
            return;
        }
        switch (evt.keyCode)
        {
        case 38:
            this._keyUp = 0;
            break;
        case 40:
            this._keyDown = 0;
            break;
        case 37:
            this._keyLeft = 0;
            break;
        case 39:
            this._keyRight = 0;
            break;
        case 18:
            this._battle.SetShowDebug(false);
            break;
        }
    }

}

/**
 * 场景模块，游戏的场景渲染是通过这里进行统一管理的，它是在程序启动之后就存在的一个对象，而不是到战斗中才出现的
 */
class SceneModule extends egret.EventDispatcher implements IModule
{
    private static _className: string;

    public get Name(): string
    {
        if (!SceneModule._className)
        {
            SceneModule._className = ClassTool.GetTypeName(SceneModule);
        }
        return SceneModule._className;
    }

    private _sceneCenter: SceneCenter;

    public constructor()
    {
        super();
    }

    public _RealConstructor(stage: egret.Stage)
    {
        let array = ClassTool.EnumToStringArray(EnumSceneLayer);
        this._sceneCenter = new SceneCenter(array, stage);
    }

    public Dispose(): void
    {
        this._sceneCenter.Dispose();
        this._sceneCenter = null;
    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
    }
}


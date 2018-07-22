
//TODO 各种功能用组件的方式注入到游戏系统里面去，然后游戏里面就会出现新的功能
class AIModule implements IModule
{
    private static _className: string;

    public get Name(): string
    {
        if (!AIModule._className)
        {
            AIModule._className = ClassTool.GetTypeName(AIModule);
        }
        return AIModule._className;
    }

    public Dispose(): void
    {

    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
    }

    // public Initialize(): void
    // {
    //     this._processor = new AIProcessor();
    //     let battle = ModuleCenter.Get(Battle);
    //     battle.ProcessorCenter.Add(this._processor);
    // }
    //
    // public Uninitialize(): void
    // {
    //     let battle = ModuleCenter.Get(Battle);
    //     battle.ProcessorCenter.Remove(this._processor);
    //     this._processor.Dispose();
    //     this._processor = null;
    // }
}

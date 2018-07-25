class SoundModule implements IModule
{
    private static _className: string;

    public get Name(): string
    {
        if (!SoundModule._className)
        {
            SoundModule._className = ClassTool.GetTypeName(SoundModule);
        }
        return SoundModule._className;
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

    public PlaySound(sound: string)
    {
        //TODO PLAYSOUND
    }
}

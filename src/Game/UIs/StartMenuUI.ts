class StartMenuUI extends UIBase
{
    public static readonly RES : Array<string> = ["preload"];
    public static readonly URL: string = "StartMenu";//"resource/ui/StartMenu.exml";
    public constructor()
    {
        super(
            ClassTool.GetTypeName(StartMenuUI),
            StartMenuUI.RES,
            StartMenuUI.URL,
            EnumUILayer.NORMAL_MIDDLE);
    }

    public Dispose(): void
    {
        super.Dispose();
    }
}

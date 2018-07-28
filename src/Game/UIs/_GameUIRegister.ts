class _GameUIRegister
{
    public static Run(uis: Map<string, UIBase>)
    {
        _GameUIRegister.DoRegisterUI(StartMenuUI, uis);
    }

    private static DoRegisterUI<UIClass extends UIBase>(uiClass: { new(): UIClass; }, uis: Map<string, UIBase>): void
    {
        if (uis && uiClass)
        {
            let ui = new uiClass();
            let classID = ClassTool.GetTypeName(uiClass);
            uis.set(classID, ui);
        }
    }
}

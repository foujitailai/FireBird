interface IBattleProcessor extends IDisposable
{
    // Dispose(): void;
    //
    // Initialize(): void;
    //
    // Uninitialize(): void;

    OnFrameSync(frame: number): void;
}

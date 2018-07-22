
class OperationProcessor implements IFrameProcessor
{
    private _battle: Battle;
    private _actorOperation: ActorOperation;

    public constructor(battle:Battle)
    {
        this._battle = battle;
        this._actorOperation = new ActorOperation(battle);
    }

    public Dispose(): void
    {
        this._actorOperation.Dispose();
        this._actorOperation = null;
        this._battle = null;
    }

    public OnFrameSync(frame: number, data: FrameSyncServerDataAsset): void
    {
        this.RunPlayer(frame, data);
        this.RunAI();
    }

    public RunAI()
    {
        this.RunFrame(this._battle.AIFrameSyncDataAsset.DataAsset);
    }

    public RunPlayer(frame: number, data: FrameSyncServerDataAsset)
    {
        let frameData = data.GetFrameData(frame);
        this.RunFrame(frameData);
    }

    private RunFrame(frameData:Array<FrameSyncServerData>)
    {
        if (!frameData)
        {
            return;
        }
        for (let i:number = 0; i < frameData.length; ++i)
        {
            let operData = frameData[i];
            if (operData)
            {
                this._actorOperation.Run(operData);
            }
        }
    }

}

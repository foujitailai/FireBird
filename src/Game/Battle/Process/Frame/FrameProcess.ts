
class FrameProcess extends ProcessorCenter<IFrameProcessor> implements IFrameProcessor
{
    /**
     * 注册各种处理流程
     */
    protected Register()
    {
        let battle = ModuleCenter.Get(BattleModule);
        this.Add(new OperationProcessor(battle.Battle));
        this.Add(new GameLogicProcessor(battle.Battle));
        this.Add(new GameSceneFrameProcessor(battle.Battle));
        this.Add(new AIProcessor(battle.Battle));
    }

    /**
     * 帧同步
     * @param {number} frame 帧同步索引
     * @param {FrameSyncServerDataAsset} data 帧同步服务器数据集合
     */
    public OnFrameSync(frame: number, data: FrameSyncServerDataAsset): void
    {
        // console.log("     frame = " + frame);
        for (let i: number = 0; i < this._processors.length; ++i)
        {
            this._processors[i].OnFrameSync(frame, data);
        }
    }

}

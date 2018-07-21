
class RenderProcess extends ProcessorCenter<IRenderProcessor> implements IRenderProcessor
{
    /**
     * 注册各种处理流程
     */
    protected Register()
    {
        let battle = ModuleCenter.Get(BattleModule);
        this.Add(new GameSceneRenderProcessor(battle.Battle));
        this.Add(new GameSceneDebugRenderProcessor(battle.Battle));
    }

    /**
     * 渲染同步
     * @param {number} delta 距离上一个逻辑帧的时间
     * @param {number} progress 在两个逻辑帧之间的百分比进度
     * @param {boolean} isFastPlay 是否快速播放
     */
    public OnRenderFrame(delta: number, progress: number, isFastPlay: boolean)
    {
        for (let i: number = 0; i < this._processors.length; ++i)
        {
            this._processors[i].OnRenderFrame(delta, progress, isFastPlay);
        }
    }

}


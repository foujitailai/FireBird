interface IRenderProcessor extends IDisposable
{
    /**
     * 渲染同步
     * @param {number} delta 距离上一个逻辑帧的时间
     * @param {number} progress 在两个逻辑帧之间的百分比进度
     * @param {boolean} isFastPlay 是否快速播放
     */
    OnRenderFrame(delta: number, progress: number, isFastPlay: boolean);
}

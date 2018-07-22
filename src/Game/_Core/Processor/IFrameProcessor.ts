interface IFrameProcessor extends IDisposable
{
    /**
     * 帧同步
     * @param {number} frame 帧同步索引
     * @param {FrameSyncServerDataAsset} data 帧同步服务器数据集合
     */
    OnFrameSync(frame: number, data: FrameSyncServerDataAsset): void;
}

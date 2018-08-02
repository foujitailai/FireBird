/**
 * 场景节点总信息，配置节点
 *
 * "children": [
 * {
 *     "name": "High1",
 *     "position": {
 *         "x": "0",
 *         "y": "0",
 *         "w": "1536",
 *         "h": "144"
 *     },
 *     "image": "Map01_cloud_1",
 *     "node": {
 *         "oneScreenTime": "12000",
 *         "loopUnit": "1536"
 *     }
 * }]
 */
class SceneNodeInfo implements IDisposable
{
    private _name: string;
    private _image: string;
    private _transform: TransformInfo;
    private _loopImage: LoopImageInfo;
    private _children: Array<SceneNodeInfo>;

    public constructor(configObj: any)
    {
        this._name = configObj.name;
        this._image = configObj.image;
        this._transform = new TransformInfo(configObj.position);
        this._loopImage = configObj.node ? new LoopImageInfo(configObj.node) : null;
        this._children = null;

        if (configObj.children && configObj.children.length)
        {
            this._children = [];

            // 由于 egret.DisplayObjectContainer 不能直接显示图像，需要将图像放到子节点里面去
            this.ConvertContainerImageToChild(configObj);

            // 加载子节点
            for (let i = 0; i < configObj.children.length; ++i)
            {
                let child = new SceneNodeInfo(configObj.children[i]);
                this._children.push(child);
            }
        }
        else if (!this._image)
        {
            // 没有图像，那就是容器
            this.NormalizeContainer();
        }
    }

    public Dispose(): void
    {
        this._name = null;
        this._image = null;
        if (this._transform)
        {
            this._transform.Dispose();
            this._transform = null;
        }
        if (this._loopImage)
        {
            this._loopImage.Dispose();
            this._loopImage = null;
        }
        if (this._children)
        {
            this._children.forEach(v=>v.Dispose());
            this._children.splice(0, this._children.length);
            this._children = null;
        }
    }

    private ConvertContainerImageToChild(configObj: any): void
    {
        // 由于 egret.DisplayObjectContainer 不能直接显示图像，需要将图像放到子节点里面去
        if (this._image)
        {
            // clone 一个 node 出来，修改上面的节点属性，让它只会是一个 Image
            let tmpNode = {children: null, position: null, node: null};
            Object.assign(tmpNode, configObj);
            Object.assign(tmpNode.position, configObj.position);
            tmpNode.children = null;
            tmpNode.node = null;
            tmpNode.position.x = 0;
            tmpNode.position.y = 0;

            let fakeChild = new SceneNodeInfo(tmpNode);
            this._children.push(fakeChild);

            this._image = null;

            this.NormalizeContainer();
        }
    }

    private NormalizeContainer(): void
    {
        // 容器节点，不要宽高 不要宽高 不要宽高
        // egret与unity在锚点系统应用上不同
        //   unity里面设置了锚点在中心点，它的子节点会在以这个锚点为原点，而
        //   egret里面，子节点会以节点的左上角为原点
        //   有了宽高，位置就出错了
        this._transform.Set(this._transform.X, this._transform.Y, 0, 0);
    }

    public get Name(): string
    {
        return this._name;
    }

    public get Image(): string
    {
        return this._image;
    }

    public get Transform(): TransformInfo
    {
        return this._transform;
    }

    public get LoopImage(): LoopImageInfo
    {
        return this._loopImage;
    }

    public get Children(): Array<SceneNodeInfo>
    {
        return this._children;
    }
}
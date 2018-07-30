/**
 * 配置模块
 */
class ConfigModule implements IModule
{
    private static _className: string;
    private _configs: Map<string, SceneConfig>;

    public get Name(): string
    {
        if (!ConfigModule._className)
        {
            ConfigModule._className = ClassTool.GetTypeName(ConfigModule);
        }
        return ConfigModule._className;
    }

    public constructor()
    {
        this._configs = new Map<string, SceneConfig>();
    }

    public Dispose(): void
    {
        this._configs.forEach(it=>it.Dispose());
        this._configs.clear();
        this._configs = null;
    }

    public OnModuleAdded(): void
    {
    }

    public OnModuleRemoved(): void
    {
    }

    public GetConfig(name:string)
    {
        let config = this._configs.get(name);
        if (!config)
        {
            let res = RES.getRes(name);
            if (!res)
            {
                console.error("找不到指定的配置：" + name);
                return;
            }
            else
            {
                config = new SceneConfig(res);
                this._configs.set(name, config);
            }
        }
        return config;
    }
}


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

    public constructor(configObj:any)
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
            if (this._image)
            {
                // clone 一个 node 出来，修改上面的节点属性，让它只会是一个 Image
                let tmpNode = {children:null, position:null, node:null};
                Object.assign(tmpNode, configObj);
                Object.assign(tmpNode.position, configObj.position);
                tmpNode.children = null;
                tmpNode.node = null;
                tmpNode.position.x = 0;
                tmpNode.position.y = 0;

                let fakeChild = new SceneNodeInfo(tmpNode);
                this._children.push(fakeChild);

                this._image = null;
            }

            for (let i = 0; i < configObj.children.length; ++i)
            {
                let child = new SceneNodeInfo(configObj.children[i]);
                this._children.push(child);
            }
        }
    }

    public Dispose(): void
    {
    }

    public get Name():string
    {
        return this._name;
    }
    public get Image():string
    {
        return this._image;
    }
    public get Transform():TransformInfo
    {
        return this._transform;
    }
    public get LoopImage():LoopImageInfo
    {
        return this._loopImage;
    }
    public get Children():Array<SceneNodeInfo>
    {
        return this._children;
    }
}

/**
 * 坐标，配置节点
 */
class TransformInfo implements IDisposable
{
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    public constructor(configObj: any)
    {
        this._x = configObj.x;
        this._y = configObj.y;
        this._width = configObj.w;
        this._height = configObj.h;
    }

    public Dispose(): void
    {
    }
    public get X():number
    {
        return this._x;
    }
    public get Y():number
    {
        return this._y;
    }
    public get Width():number
    {
        return this._width;
    }
    public get Height():number
    {
        return this._height;
    }
}

/**
 * 循环图像，配置节点
 */
class LoopImageInfo implements IDisposable
{
    private _oneScreenTime: number;
    private _loopUnit: number;

    public constructor(configObj:any)
    {
        this._oneScreenTime = configObj.oneScreenTime;
        this._loopUnit = configObj.loopUnit;
    }

    public Dispose(): void
    {
        this._oneScreenTime = 0;
        this._loopUnit = 0;
    }

    public get OneScreenTime():number
    {
        return this._oneScreenTime;
    }
    public get LoopUnit():number
    {
        return this._loopUnit;
    }
}

/**
 * 场景配置文件解释器
 */
class SceneConfig implements IDisposable
{
    private _configObj: any;
    private _rootNode: SceneNodeInfo;

    public get Root():SceneNodeInfo
    {
        return this._rootNode;
    }

    public constructor(configObj:any)
    {
        this._configObj = configObj;

        this.Prase();
    }

    public Dispose(): void
    {
        this._configObj = null;
    }

    private Prase()
    {
        this._rootNode = new SceneNodeInfo(this._configObj);
    }
}

/**
 * 场景构造器，根据场景的配置生成渲染对象
 */
class SceneBuilder
{
    public static Run(config:SceneConfig):egret.DisplayObject
    {
        return SceneBuilder.Build(config.Root);
    }

    private static Build(node: SceneNodeInfo):egret.DisplayObject
    {
        if (node.Children &&
            node.Children.length > 0)
        {
            return SceneBuilder.BuildParent(node);
        }
        else
        {
            return SceneBuilder.BuildNode(node);
        }
    }

    private static BuildNode(node:SceneNodeInfo)
    {
        let disObj = null;
        if (node.Image &&
            node.Image.length > 0)
        {
            // 具体图像节点
            let bmp = Helper.CreateBitmapByName(node.Image);
            if (bmp)
            {
                disObj = bmp;
            }
            else
            {
                console.error("不存在的图像资源：" + node.Image);
                return null;
            }
        }
        else
        {
            // 容器节点
            disObj = new egret.DisplayObjectContainer();
        }

        if (node.LoopImage)
        {
            disObj = new LoopImage(node.LoopImage.OneScreenTime, node.LoopImage.LoopUnit, disObj);
        }

        if (disObj)
        {
            disObj.name = node.Name;

            disObj.x = node.Transform.X;
            disObj.y = node.Transform.Y;
            disObj.width = node.Transform.Width;
            disObj.height = node.Transform.Height;
        }

        return disObj;
    }

    private static BuildParent(node: SceneNodeInfo):egret.DisplayObjectContainer
    {
        let objCon = SceneBuilder.BuildNode(node);

        // // 自已身上的图形节点，做为第一个子节点添加进来
        // if (disObj)
        // {
        //     disObj.x = 0;
        //     disObj.y = 0;
        //     objCon.addChild(disObj);
        // }

        // 处理子节点
        for (let i = 0; i < node.Children.length; ++i)
        {
            let child = node.Children[i];
            if (child)
            {
                let childDisObj = SceneBuilder.Build(child);
                if (childDisObj)
                {
                    objCon.addChild(childDisObj);
                }
            }
        }

        return objCon;
    }
}

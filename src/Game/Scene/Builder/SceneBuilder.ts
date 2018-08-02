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

    private static BuildNode(node:SceneNodeInfo):egret.DisplayObject
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

            disObj.x = Number(node.Transform.X);
            disObj.y = -Number(node.Transform.Y);
            disObj.width = Number(node.Transform.Width);
            disObj.height = Number(node.Transform.Height);

            // 固定成锚点在中心点对齐，egret与unity在锚点系统应用上不同
            //   unity里面设置了锚点在中心点，它的子节点会在以这个锚点为原点，而
            //   egret里面，子节点会以节点的左上角为原点
            Helper.SetAnchorCenter(disObj);
        }

        return disObj;
    }

    private static BuildParent(node: SceneNodeInfo):egret.DisplayObjectContainer
    {
        let objCon = <egret.DisplayObjectContainer>SceneBuilder.BuildNode(node);
        if (!objCon)
        {
            console.error("怎么能不是容器(egret.DisplayObjectContainer)呢？")
        }

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

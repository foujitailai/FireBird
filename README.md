
# FireBird

just a small game

## TODO LIST

- [ ] 放角色、子弹到SCENE的合适层内
- [ ] 创建怪物到SCENE的合适层内
- [ ] 把一些图形的样子先弄出来，看起来漂亮一些
- [ ] 导出egret的场景对象，导入到unity3d里面 查看 方便调试用

- [ ] 全局常量配置到一个文件里面去 globalValues

- [x] 输入禁止功能
- [ ] 定时器！！！要与帧同步关联在一起！不能够用系统的时间  Schedule
- [ ] 声音支持

- [ ] Actor 下面的图形、数据 代码考虑分离？？？
- [ ] 网络版的帧同步没有处理，还没有弄网络底层
- [ ] 当快速从某个位置到另一个位置（一个逻辑帧），会因为位置插值而出现闪的感觉，需要处理吗？

## REQUEST

主角

1. 脑门可以飘出状态字出来
2. 吐子弹的动作变化

怪物

1. 上下移动过程中可以有一点点的 X 轴变化
2. 被子弹打中时，会僵直、抖动效果
3. 被子弹打死时，会有击飞效果
4. 速度
5. 大小
6. 上下碰撞，反弹
7. 可以被多次攻击

子弹可变属性：

1. 速度
2. 大小
3. 位移曲线
4. 表现效果都不同

地表&天花板

- [x] 1. 掉在地表上面，就反向运动
- [x] 2. 跳时撞到天花板，会快速向下落

背景

- [x] 1. 多层卷轴
- [x] 2. 云层快速飘过

场景小道具

1. 固定金币
2. 从子弹边上过可以得到金币
3. 子弹可以被打成金币
4. 击死怪物得到金币
5. 金币获得，飞向左上角效果

技能：

1. 全屏扫荡技能

## DONE

- [x] 角色会穿过上面
- [x] 原版里面的的跳跃手感算法
- [x] 角色状态有了，但是子弹看不见了

- [x] jump 没有了，看如何与 FIRE 关联到一起
- [X] AI控制角色移动并发射子弹
  - [x] 应用BattleData
  - [x] 应用AI 模块
  - [x] 应用FrameSync模块

- [x] 玩家操作角色应用帧同步系统
  - [x] 输入转为客户端请求
  - [x] 定时发送帧数据数据包到服务器（模拟器）
  - [x] 真正实现服务器接收与发送到客户端帧数据集合
  - [x] 逻辑帧与渲染帧分离调用逻辑

- [X] 如果 AIDataAsset是3帧清除一次，那么，每次同步帧更新的时候，都会重复执行3帧吗？？？
  - 是的，代码里面有BUG，应该去掉的。
- [X] 其它的 processor 不用去处理 AIDataAsset 吗？
  - 是的，不处理！！！

- [X] 每个 BODY 要能够绑定信息，用于分辨出它是什么对象
- [X] 场景里面可以生成不同的对象
- [X] 添加主角下落
- [X] 添加主角发射子弹
- [X] 添加场景上下反弹墙
- [X] 添加场景左右销毁墙

- [X] 加入p2
- [X] 创建世界
- [X] 创建物体
- [X] 显示物体
- [X] 物体位移
- [X] 物体碰撞事件
- [X] 更新物体位移方向、速度
- [X] 物体消失

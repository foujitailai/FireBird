/**
 * 碰撞层类型
 */
enum EnumCollisionType
{
    /**
     * 角色层
     */
    MY_ACTOR = 0x1,
    /**
     * 我的子弹层
     */
    MY_BULLET = 0x2,
    /**
     * 敌方角色层
     */
    ENEMY_ACTOR = 0x4,
    /**
     * 敌方的子弹层
     */
    ENEMY_BULLET = 0x8,
    /**
     * 地面层
     */
    GROUND = 0x10,
    /**
     * 死亡层
     */
    HELL = 0x11,
    /**
     * 其它
     */
    OTHER = 0x12,
}

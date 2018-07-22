class Pool
{
    private static _pools = {};

    private static _list: Array<any> = [];

    public static Get<T>(t: { new(): T }): T
    {
        let result: T;
        let className = ClassTool.GetTypeName(t);
        let pool = Pool._pools[className];
        if (pool && pool.length > 0)
        {
            result = pool.shift();
        }
        else
        {
            result = new t();
        }
        Pool._list.push(result);

        return result;
    }

    public static Free(obj: IPoolObject)
    {
        // 存入池内
        let className = ClassTool.GetTypeName(obj);
        if (Pool._pools[className] == null)
        {
            Pool._pools[className] = [];
        }
        Pool._pools[className].push(obj);

        // 重置
        obj.OnPoolFree();

        // 从使用池中移除
        let index = Pool._list.indexOf(obj);
        if (index >= 0)
        {
            Pool._list.splice(index, 1);
        }
    }
}

class LocalStorageTool
{
    public static Set(key:string, value:any)
    {
        let strValue = JSON.stringify(value);
        console.log(`SET  key=${key}, value=${JSON.stringify(value)}`);
        egret.localStorage.setItem(key, strValue);
    }

    public static Get(key:string):any
    {
        let strValue = egret.localStorage.getItem(key);
        console.log(`GET  key=${key}, value=${strValue}`);
        return JSON.parse(strValue);
    }

    public static Clear()
    {
        egret.localStorage.clear();
    }
}

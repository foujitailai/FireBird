class EventTool
{
    public static Disp<T extends egret.EventDispatcher>(target:T, eventName:string, data?:any)
    {
        let event = egret.Event.create(egret.Event, eventName);
        if (data)
        {
            event.data = data;
        }
        target.dispatchEvent(event);
        egret.Event.release(event);
    }
}
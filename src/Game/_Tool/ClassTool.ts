class ClassTool
{
    public static readonly CLASS: string = "function";
    public static readonly OBJECT: string = "object";

    public static GetTypeName(obj: any): string
    {
        if (!obj)
        {
            return "";
        }

        let objType: string = typeof(obj);
        switch (objType)
        {
        case ClassTool.CLASS:
            if (!obj.prototype)
            {
                return "";
            }
            return obj.prototype.__class__;

        case ClassTool.OBJECT:
            if (!obj.__proto__)
            {
                return "";
            }
            return obj.__proto__.__class__;
        }

        return "";
    }

    public static EnumToStringArray(t:any)
    {
        let layerArray: Array<string> = [];
        for (let layerValue in t)
        {
            let layerIntValue = parseInt(layerValue);
            if (isNaN(layerIntValue))
            {
                layerArray.push(layerValue);
            }
        }

        return layerArray;
    }
}

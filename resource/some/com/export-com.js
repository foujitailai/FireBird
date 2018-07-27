/**
 * 说明，修改配置在com-mc-cfg.json进行。修改完成之后，执行：
 *   > node export-com.js
 *   生成com-mc.json文件
 */




let Path = require('path');
let FS = require( "fs" );


function egret( rSourceFile, rTargetFile )
{
    let rSource = require( rSourceFile );

    if( null == rSource.mc || null == rSource.res)
    {
        return;
    }

	frameDic = {}
    for( let mcKey in rSource.mc )
    {
        let mc = rSource.mc[ mcKey ];
		if (mc.frames != null)
		{
			for( let frameKey in mc.frames )
			{
				let frame = mc.frames[frameKey];
				if (frameDic[frame.res])
				{
					frameDic[frame.res].push(frame);
				}
				else
				{
					frameDic[frame.res] = [frame];
				}
			}
		}
    }
	for (let frameKey in frameDic)
	{
		let frames = frameDic[frameKey];
		for (let frameKey in frames)
		{
			let frame = frames[frameKey];
			let res = rSource.res[frame.res];
			frame.x = res.offX;
			frame.y = res.offY;
		}
	}

    FS.writeFileSync( rTargetFile, JSON.stringify( rSource, null, "\t" ) );
}


egret("./com-mc-cfg.json","./com-mc.json");

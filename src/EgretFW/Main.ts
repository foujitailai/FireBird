//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    private world: p2.World;
    private debugDraw: p2DebugDraw;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        // this.runGame().catch(e => {
        //     console.log(e);
        // })
        // this.runPhysics().catch(e => {
        //     console.log(e);
        // });
        this.runMyGame().catch(e => {
            console.log(e);
        });
        
        // this.runPhysics22();
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        let button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);


    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }













    private runPhysics22(): void {
        var value:number = 5;
        switch (value){
            case 1:
                this.addChild(new RayReflectScene());
                break;
            case 2:
                this.addChild(new BuoyancyScene());
                break;
            case 3:
                this.addChild(new HeightfieldScene());
                break;
            case 4:
                this.addChild(new TearableScene());
                break;
            case 5:
                this.addChild(new KinematicScene());
                break;
            case 6:
                this.addChild(new RestitutionScene());
                break;
            case 7:
                this.addChild(new LockScene());
                break;
            case 8:
                this.addChild(new SleepScene());
                break;
            case 9:
                this.addChild(new SpringsScene());
                break;
            case 10:
                this.addChild(new PistonScene());
                break;
        }
    }

    private selfBody : p2.Body;
    private async runPhysics() {
        await this.loadResource();

        this._keyDown = 0;
        this._keyUp = 0;
        this._keyLeft = 0;
        this._keyRight = 0;
 

        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.createWorld();
        this.createBodies();
        this.createDebug();


        var src = this;
        document.addEventListener("keydown", function onkeydown(event:KeyboardEvent){src.onKeyDown(event);});
        document.addEventListener("keyup", function onkeyup(event:KeyboardEvent){src.onKeyUp(event);});

        // this.addEventListener("keydown", this.onKeyDown, this);
    }
    
    private createWorld(): void {
        var wrd: p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 0];
        this.world = wrd;
        var myclass = this;
        
        this.world.on("beginContact",function(event){
            console.log("on target sensor BEG bodyA.id:"+event.bodyA.id+",bodyB.id:"+event.bodyB.id);

            if (!myclass.selfBody)
                return;
            if (event.bodyA.id != myclass.selfBody.id &&
                event.bodyB.id != myclass.selfBody.id)
                return;

            let body = event.bodyA;
            if (event.bodyA.id == myclass.selfBody.id)
            {
                body = event.bodyB;
            }
            console.log("REMOVE BODY!!!!!!!!!!!")
            myclass.world.removeBody(body);
        });
        this.world.on("endContact",function(event){
            //console.log("on target sensor END bodyA.id:"+event.bodyA.id+",bodyB.id:"+event.bodyB.id);
        });
    }
    private createBodies(): void {
        //var boxShape: p2.Shape = new p2.Rectangle(100, 50);
        var boxShape: p2.Shape = new p2.Box({width: 100, height: 50});
        boxShape.sensor = true;
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [400, 200], type:p2.Body.DYNAMIC });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        this.selfBody = boxBody;
        
        let icon: egret.Bitmap = this.createBitmapByName("checkbox_select_disabled_png");
        this.addChild(icon);
        this.selfBody.displays = [icon];
        icon.width = 100;
        icon.height = 100;
        icon.anchorOffsetX = icon.width / 2;
        icon.anchorOffsetY = icon.height / 2;
        // this.selfBody.angularVelocity = 1;
        this.selfBody.velocity = [-10,0];
        this.selfBody.damping = 0;

        //var boxShape: p2.Shape = new p2.Rectangle(50, 50);
        var boxShape: p2.Shape = new p2.Box({width: 50, height: 50});
        boxShape.sensor = true;
        var boxBody: p2.Body = new p2.Body({ mass: 0, position: [200, 180], angularVelocity: 1, type:p2.Body.KINEMATIC });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        
        var boxShape: p2.Shape = new p2.Box({width: 50, height: 50});
        boxShape.sensor = true;
        var boxBody: p2.Body = new p2.Body({ mass: 0, position: [200, 480], angularVelocity: 1 });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);


        var boxShape: p2.Shape = new p2.Box({width: 640, height: 1000});
        boxShape.sensor = true;
        var boxBody: p2.Body = new p2.Body({ mass: 0, position: [640/2, 1136+500-50], angularVelocity: 0 });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);


    }
    private createSprite(): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        result.graphics.beginFill(0x37827A);
        result.graphics.drawRect(0,0,80,40);
        result.graphics.endFill();
        return result;
    }
    private createDebug(): void {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    }
    private _keyDown : number;
    private _keyUp : number;
    private _keyLeft : number;
    private _keyRight : number;
 
    private _dddd : number = 0;
    private loop(): void {
        // 平滑加速度（如果不去每帧设置，会被衰竭掉，可以通过damping=0来去掉衰竭）
        //this.selfBody.applyForceLocal([(this._keyLeft - this._keyRight) * -20, (this._keyUp - this._keyDown) * -20], undefined);
        // 直接速度（每秒的速度，如果不去每帧设置，会被衰竭掉，可以通过damping=0来去掉衰竭）
        this.selfBody.velocity = [(this._keyLeft - this._keyRight) * -200, (this._keyUp - this._keyDown) * -200];
        //this.selfBody.angularVelocity = (this._keyLeft - this._keyRight) * 4;

        if (this._dddd<=0) this._dddd = egret.getTimer();
        var tim = egret.getTimer();
        var dxx = tim - this._dddd;
        this._dddd = tim;
        
        // console.log("" + egret.getTimer() +
        //     " self body velocity= " + this.selfBody.velocity[0] + ", " + this.selfBody.velocity[1] +
        //     " pos= " + this.selfBody.position[0] + ", "+ this.selfBody.position[1]);

        this.world.step(dxx/1000);
        this.debugDraw.drawDebug();

        var stageHeight: number = this.stage.stageHeight;
        var factor: number = 50;
        var boxBody: p2.Body = this.selfBody;
        var box: egret.DisplayObject = this.selfBody.displays[0];
        if (box) {
            box.x = boxBody.position[0];
            box.y = boxBody.position[1];
            box.rotation = (boxBody.angle + boxBody.shapes[0].angle) * 180 / Math.PI;
            if (boxBody.sleepState == p2.Body.SLEEPING) {
                box.alpha = 0.5;
            }
            else {
                box.alpha = 1;
            }
        }
    }

    private onKeyDown(evt): void {
        //console.log("evt.keyCode:" + evt.keyCode);
        var target: any;
        // if (evt.keyCode == 'v')
        // for(target in PcKeyBoardHelper.instance.list) {
        //     var vo: KeyVo = PcKeyBoardHelper.instance.list[target];
        //     vo.callback.call(vo.target,evt);
        // }
        
        // keycode 38 = Up ↑
        // keycode 40 = Down ↓
        // keycode 37 = Left ←
        // keycode 39 = Right →
        switch(evt.keyCode)
        {
            case 38: this._keyUp = 1;
                // this.selfBody.applyForceLocal([0, 1],[0,0]);
                break;
            case 40: this._keyDown = 1;
                // this.selfBody.applyForceLocal([0, -1],[0,0]);
                break;
            case 37: this._keyLeft = 1;
                // this.selfBody.position[0] = -1;
                break;
            case 39: this._keyRight = 1;
                // this.selfBody.position[0] = 1;
                break;
        }
    }
 
    private onKeyUp(evt): void {
        switch(evt.keyCode)
        {
            case 38: this._keyUp = 0;
                break;
            case 40: this._keyDown = 0;
                break;
            case 37: this._keyLeft = 0;
                break;
            case 39: this._keyRight = 0;
                break;
        }
    }












    private _selfBody : p2.Body;
    private async runMyGame() {
        await this.loadResource();

        this._keyDown = 0;
        this._keyUp = 0;
        this._keyLeft = 0;
        this._keyRight = 0;
 

        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.createWorld();
        this.createBodies();
        this.createDebug();

        let tui = new mytestui();
        tui.Show();
        this.addChild(tui);


        var src = this;
        document.addEventListener("keydown", function onkeydown(event:KeyboardEvent){src.onKeyDown(event);});
        document.addEventListener("keyup", function onkeyup(event:KeyboardEvent){src.onKeyUp(event);});

        // this.addEventListener("keydown", this.onKeyDown, this);
    }
    





}


cc.Class({
    extends: cc.Component,

    properties: {
        canvas: {
            default: null,
            type: cc.Node
        },
        setting_panel: {
            default: null,
            type: cc.Node
        },
        normal: {
            default: null,
            type: cc.Node
        },
        hard: {
            default: null,
            type: cc.Node
        },
        hell: {
            default: null,
            type: cc.Node
        },
        extreme: {
            default: null,
            type: cc.Node
        },
        
        close_btn: {
            default: null,
            type: cc.Sprite
        },
        btn_pause: {
            default: null,
            type: cc.Sprite
        },
        btn_restart: {
            default: null,
            type: cc.Node
        },
        btn_continue: {
            default: null,
            type: cc.Node
        },
        btn_steps: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.game = this.canvas.getComponent('Game');

        this.node_active = true;
        this.btn_pause_active = true;
        this.setting_panel.zIndex = 999;
        this.btn_continue.parent.zIndex = 999;        
        
        this.events();
        this.actions();
        
    },

    events: function()
    {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            if(this.node_active)
                this.in_panel();
        }, this);
        this.normal.on(cc.Node.EventType.MOUSE_DOWN, function (){ 
            this.load_level(0);
        }, this);
        this.hard.on(cc.Node.EventType.MOUSE_DOWN, function () {            
            this.load_level(1);
        }, this);
        this.hell.on(cc.Node.EventType.MOUSE_DOWN, function () {            
            this.load_level(2);
        }, this);
        this.extreme.on(cc.Node.EventType.MOUSE_DOWN, function () {            
            this.load_level(3);
        }, this);

        this.close_btn.node.on(cc.Node.EventType.MOUSE_DOWN, function () {            
            this.out_panel();
        }, this);

        this.btn_pause.node.on(cc.Node.EventType.MOUSE_DOWN, function () {            
            if(this.btn_pause_active)
                this.in_pause_panel();                
        }, this);

        this.btn_continue.on(cc.Node.EventType.MOUSE_DOWN, function () {            
            this.out_pause_panel();            
        }, this);

        this.btn_restart.on(cc.Node.EventType.MOUSE_DOWN, function () {            
            this.out_pause_panel();
            this.game.clear_node();
            this.game.change_level(this.game.game_level);            
            this.game.create_table();       
        }, this);

        this.btn_steps.on(cc.Node.EventType.MOUSE_DOWN, function () {        
            // this.out_pause_panel();
            this.onClickInvite();
        }, this);
    },

    actions: function()
    {
        this.lobbyAppearAction1 = cc.moveBy(0.4, cc.v2(0, 480)).easing(cc.easeElasticOut());
        this.lobbyAppearAction2 = cc.moveBy(0.5, cc.v2(0, 480)).easing(cc.easeElasticOut());
        this.lobbyAppearAction3 = cc.moveBy(0.6, cc.v2(0, 480)).easing(cc.easeElasticOut());
        this.lobbyAppearAction4 = cc.moveBy(0.7, cc.v2(0, 480)).easing(cc.easeElasticOut());

        this.lobbyDisappearAction1 = cc.moveBy(0.7, cc.v2(0, -480)).easing(cc.easeElasticOut());
        this.lobbyDisappearAction2 = cc.moveBy(0.6, cc.v2(0, -480)).easing(cc.easeElasticOut());
        this.lobbyDisappearAction3 = cc.moveBy(0.5, cc.v2(0, -480)).easing(cc.easeElasticOut());
        this.lobbyDisappearAction4 = cc.moveBy(0.4, cc.v2(0, -480)).easing(cc.easeElasticOut());
        
        this.fadeToDark = cc.fadeOut(0.5);
        this.fadeToLight = cc.fadeIn(0.5);

        this.rotateActionIn = cc.rotateTo(0.3, -90).easing(cc.easeElasticOut());
        this.rotateActionOut = cc.rotateTo(0.3, 0).easing(cc.easeElasticOut());

        this.lobbyAppearLeftContinue = cc.moveBy(0.2, cc.v2(300, 0)).easing(cc.easeElasticOut());
        this.lobbyAppearLeftRestart = cc.moveBy(0.1, cc.v2(230, 0)).easing(cc.easeElasticOut());
        this.lobbyAppearRightSteps = cc.moveBy(0.3, cc.v2(-250, 0)).easing(cc.easeElasticOut());

        this.lobbyAppearLeftContinueOut = cc.moveBy(0.2, cc.v2(-300, 0)).easing(cc.easeElasticOut());
        this.lobbyAppearLeftRestartOut = cc.moveBy(0.1, cc.v2(-230, 0)).easing(cc.easeElasticOut());
        this.lobbyAppearRightStepsOut = cc.moveBy(0.3, cc.v2(250, 0)).easing(cc.easeElasticOut());
    },

    fadein_screen: function()
    {
        this.canvas.runAction(cc.sequence(
            cc.fadeTo(1, 50),
            cc.delayTime(0.1)
        ));
        this.node.runAction(cc.sequence(
            cc.fadeTo(1, 50),
            cc.delayTime(0.1)
        ));
    },

    fadeout_screen: function()
    {
        this.canvas.runAction(cc.sequence(            
            cc.delayTime(0.1),
            cc.fadeTo(1, 255),
            cc.delayTime(0.1)
        )); 
        
        this.node.runAction(cc.sequence(            
            cc.delayTime(0.1),
            cc.fadeTo(1, 255),
            cc.delayTime(0.1)
        ));  
    },

    in_panel: function () {
        this.node_active = false;
        this.btn_pause_active = false;
        this.fadein_screen();

        this.btn_pause.node.runAction(cc.sequence(
            cc.fadeTo(0.7, 50),
            cc.delayTime(0.1),
            cc.callFunc(this.callbackCloseIn.bind(this))
        ));  

        this.normal.runAction(cc.sequence(cc.moveBy(0.4, cc.v2(0, 480)), this.lobbyAppearAction1));
        this.hard.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, 480)), this.lobbyAppearAction2));
        this.hell.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, 480)), this.lobbyAppearAction3));
        this.extreme.runAction(cc.sequence(cc.moveBy(0.7, cc.v2(0, 480)), this.lobbyAppearAction4));        
    },

    out_panel: function () {
        this.node_active = true;
        this.btn_pause_active = true;
        this.fadeout_screen();      

        this.close_btn.node.runAction(cc.sequence(cc.rotateTo(0.3, 0), this.rotateActionOut, cc.callFunc(this.callbackCloseOut.bind(this))));     
        this.normal.runAction(cc.sequence(cc.moveBy(0.7, cc.v2(0, -480)), this.lobbyDisappearAction1));
        this.hard.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, -480)), this.lobbyDisappearAction2));
        this.hell.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, -480)), this.lobbyDisappearAction3));
        this.extreme.runAction(cc.sequence(cc.moveBy(0.4, cc.v2(0, -480)), this.lobbyDisappearAction4)); 
    },

    callbackCloseIn: function () {
        this.close_btn.node.runAction(cc.sequence(cc.rotateTo(0.3, -90), this.rotateActionIn));
    },

    callbackCloseOut: function () {
        this.btn_pause.node.runAction(cc.sequence(
            cc.delayTime(0.1),
            cc.fadeTo(0.3, 255),
            cc.delayTime(0.1)
        ));
    },    

    in_pause_panel: function()
    {   
        this.node_active = false;
        this.btn_pause_active = false;
        this.fadein_screen();
        this.btn_pause.node.runAction(cc.sequence(
            cc.fadeOut(0.7),
            cc.delayTime(0.1)
        ));  
        this.btn_continue.runAction(cc.sequence(cc.moveBy(0.2, cc.v2(300, 0)), this.lobbyAppearLeftContinue));
        this.btn_restart.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(230, 0)), this.lobbyAppearLeftRestart));
        this.btn_steps.runAction(cc.sequence(cc.moveBy(0.3, cc.v2(-250, 0)), this.lobbyAppearRightSteps));
    },

    out_pause_panel: function()
    {    
        this.node_active = true;
        this.btn_pause_active = true;
        this.fadeout_screen();
        this.btn_pause.node.runAction(cc.sequence(
            cc.fadeIn(0.7),
            cc.delayTime(0.1)
        )); 
        this.btn_continue.runAction(cc.sequence(cc.moveBy(0.2, cc.v2(-300, 0)), this.lobbyAppearLeftContinueOut));
        this.btn_restart.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(-230, 0)), this.lobbyAppearLeftRestartOut));
        this.btn_steps.runAction(cc.sequence(cc.moveBy(0.3, cc.v2(250, 0)), this.lobbyAppearRightStepsOut));
    },

    load_level: function (lvl) {
        if(this.game.game_level != lvl)
        {
            this.game.clear_node();
            this.game.change_level(lvl);            
            this.game.create_table();
            this.game.load_table();
        }   
        this.out_panel();        
    },

    set_font: function (lvl) {

        // this.normal.font.size = 40;
        // this.hard.font.size = 40;
        // this.hell.font.size = 40;
        // this.extreme.font.size = 40;
        // switch(lvl)
        // {
        //     case 0:this.normal.font.size = 80;break;
        //     case 1:this.hard.font.size = 80;break;
        //     case 2:this.hell.font.size = 80;break;
        //     default:this.extreme.font.size = 80;break;
        // }        
                
    },

    update (dt) {
        
    },

    onClickInvite: function() {
        //wx.shareAppMessage({title: "", imageUrl: ""});
        //分享按钮
        cc.log("点击分享按钮");
        //this.playBtnSound();

        //主动拉起分享接口
        cc.loader.loadRes("texture/share",function(err,data){
            wx.shareAppMessage({
                title: "Enjoy Flood It!",
                imageUrl: data.url,
                success(res){
                    console.log(res)
                },
                fail(res){
                    console.log(res)
                }
            })
        });
    },
});

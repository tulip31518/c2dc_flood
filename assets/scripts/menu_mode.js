
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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.game = this.canvas.getComponent('Game');
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            this.in_panel();
        }, this);

        this.normal.on(cc.Node.EventType.MOUSE_DOWN, function ()
        {            
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
    },

    in_panel: function () {
        var movement = cc.moveTo(0.3, cc.v2(0, 960));
        this.setting_panel.runAction(movement);
        // this.canvas.color.a = 50;
        this.setting_panel.zIndex = 999;
    },

    out_panel: function () {
        // this.canvas.color.a = 255;
        var movement = cc.moveTo(0.3, cc.v2(0, 0));
        this.setting_panel.runAction(movement);        
        this.setting_panel.zIndex = 0;        
    },

   load_level: function (lvl) {
        if(this.game.game_level != lvl)
        {
            this.game.clear_node();
            this.game.change_level(lvl);            
            this.game.create_table();
        }   
        this.out_panel();        
    },

    // update (dt) {},
});

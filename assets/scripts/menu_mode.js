
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

        
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            var movement = cc.moveTo(0.3, cc.v2(0, 960));
            this.setting_panel.runAction(movement);
            this.canvas.opacity = 50;
            this.setting_panel.zIndex = 999;
            // this.game.flood (this.color);
            // this.game.updateMoves();
        }, this);
        this.normal.on(cc.Node.EventType.MOUSE_ENTER, function () {
            this.normal.opacity = 255;
            
        }, this);
        this.hard.on(cc.Node.EventType.MOUSE_ENTER, function () {
            this.hard.opacity = 255;
        }, this);
        this.hell.on(cc.Node.EventType.MOUSE_ENTER, function () {
            this.hell.opacity = 255;
        }, this);
        this.extreme.on(cc.Node.EventType.MOUSE_ENTER, function () {
            this.extreme.opacity = 255;
        }, this);


        this.normal.on(cc.Node.EventType.MOUSE_DOWN, function () {
            
        }, this);
        this.hard.on(cc.Node.EventType.MOUSE_DOWN, function () {
            
        }, this);
        this.hell.on(cc.Node.EventType.MOUSE_DOWN, function () {
            
        }, this);
        this.extreme.on(cc.Node.EventType.MOUSE_DOWN, function () {
            
        }, this);
    },

    // start () {

    // },

    // update (dt) {},
});

(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/menu_mode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fa869wUm3FKQrnCytXfD2Ks', 'menu_mode', __filename);
// scripts/menu_mode.js

'use strict';

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
        pause: {
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        this.node_active = true;
        this.pause_active = true;
        this.game = this.canvas.getComponent('Game');
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            if (this.node_active) this.in_panel();
        }, this);
        this.normal.on(cc.Node.EventType.MOUSE_DOWN, function () {
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

        this.pause.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            if (this.pause_active) ;
        }, this);

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
    },


    in_panel: function in_panel() {
        this.node_active = false;
        this.pause_active = false;
        this.canvas.runAction(cc.sequence(cc.fadeTo(1, 50), cc.delayTime(0.1)));
        this.node.runAction(cc.sequence(cc.fadeTo(1, 50), cc.delayTime(0.1)));

        this.pause.node.runAction(cc.sequence(cc.fadeTo(0.7, 50), cc.delayTime(0.1), cc.callFunc(this.callbackCloseIn.bind(this))));

        this.normal.runAction(cc.sequence(cc.moveBy(0.4, cc.v2(0, 480)), this.lobbyAppearAction1));
        this.hard.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, 480)), this.lobbyAppearAction2));
        this.hell.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, 480)), this.lobbyAppearAction3));
        this.extreme.runAction(cc.sequence(cc.moveBy(0.7, cc.v2(0, 480)), this.lobbyAppearAction4));

        this.setting_panel.zIndex = 999;
    },

    out_panel: function out_panel() {
        this.node_active = true;
        this.pause_active = true;
        this.canvas.runAction(cc.sequence(cc.delayTime(0.1), cc.fadeTo(1, 255), cc.delayTime(0.1)));

        this.node.runAction(cc.sequence(cc.delayTime(0.1), cc.fadeTo(1, 255), cc.delayTime(0.1)));

        this.close_btn.node.runAction(cc.sequence(cc.rotateTo(0.3, 0), this.rotateActionOut, cc.callFunc(this.callbackCloseOut.bind(this))));
        this.normal.runAction(cc.sequence(cc.moveBy(0.7, cc.v2(0, -480)), this.lobbyDisappearAction1));
        this.hard.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, -480)), this.lobbyDisappearAction2));
        this.hell.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, -480)), this.lobbyDisappearAction3));
        this.extreme.runAction(cc.sequence(cc.moveBy(0.4, cc.v2(0, -480)), this.lobbyDisappearAction4));
        // this.setting_panel.zIndex = 0;                
    },

    callbackCloseIn: function callbackCloseIn() {
        this.close_btn.node.runAction(cc.sequence(cc.rotateTo(0.3, -90), this.rotateActionIn));
    },

    callbackCloseOut: function callbackCloseOut() {
        this.pause.node.runAction(cc.sequence(cc.delayTime(0.1), cc.fadeTo(0.3, 255), cc.delayTime(0.1)));
    },

    load_level: function load_level(lvl) {
        if (this.game.game_level != lvl) {
            this.game.clear_node();
            this.game.change_level(lvl);
            this.game.create_table();
        }
        this.out_panel();
    },

    set_font: function set_font(lvl) {

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

    update: function update(dt) {}
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=menu_mode.js.map
        
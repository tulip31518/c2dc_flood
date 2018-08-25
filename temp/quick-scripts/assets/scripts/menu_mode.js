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
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        // this.canvas.runAction(cc.sequence(
        //     cc.tintTo(2, 255, 0, 0),
        //     cc.delayTime(0.5),
        //     cc.fadeTo(1, 50),
        //     cc.delayTime(0.5),
        //     cc.fadeTo(1, 255),
        //     cc.delayTime(0.5),
        //     cc.tintTo(2, 255, 255, 255)
        // ));
        this.game = this.canvas.getComponent('Game');
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            // this.set_font(this.game.game_level);
            this.in_panel();
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
    },


    in_panel: function in_panel() {

        this.canvas.runAction(cc.sequence(cc.fadeTo(1, 50), cc.delayTime(0.1)));
        this.normal.runAction(cc.sequence(cc.moveBy(0.4, cc.v2(0, 480)), this.lobbyAppearAction1));
        this.hard.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, 480)), this.lobbyAppearAction2));
        this.hell.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, 480)), this.lobbyAppearAction3));
        this.extreme.runAction(cc.sequence(cc.moveBy(0.7, cc.v2(0, 480)), this.lobbyAppearAction4));

        this.setting_panel.zIndex = 999;
    },

    out_panel: function out_panel() {
        this.canvas.runAction(cc.sequence(cc.delayTime(0.1), cc.fadeTo(1, 255), cc.delayTime(0.1)));
        this.normal.runAction(cc.sequence(cc.moveBy(0.7, cc.v2(0, -480)), this.lobbyDisappearAction1));
        this.hard.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, -480)), this.lobbyDisappearAction2));
        this.hell.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, -480)), this.lobbyDisappearAction3));
        this.extreme.runAction(cc.sequence(cc.moveBy(0.4, cc.v2(0, -480)), this.lobbyDisappearAction4));
        // this.setting_panel.zIndex = 0;                
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

    }

    // update (dt) {},
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
        
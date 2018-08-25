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

        this.game = this.canvas.getComponent('Game');
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
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
    },


    in_panel: function in_panel() {
        var movement = cc.moveTo(0.3, cc.v2(0, 960));
        this.setting_panel.runAction(movement);
        // this.canvas.color.a = 50;
        this.setting_panel.zIndex = 999;
    },

    out_panel: function out_panel() {
        // this.canvas.color.a = 255;
        var movement = cc.moveTo(0.3, cc.v2(0, 0));
        this.setting_panel.runAction(movement);
        this.setting_panel.zIndex = 0;
    },

    load_level: function load_level(lvl) {
        if (this.game.game_level != lvl) {
            this.game.clear_node();
            this.game.change_level(lvl);
            this.game.create_table();
        }
        this.out_panel();
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
        
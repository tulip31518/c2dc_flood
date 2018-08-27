"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts/Game.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        level: [],
        floodPrefab: {
            default: null,
            type: cc.Prefab
        },
        canvas: {
            default: null,
            type: cc.Node
        },
        move_display: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        mode_label: {
            default: null,
            type: cc.Label
        },
        setting_pan: {
            default: null,
            type: cc.Node
        },
        result_pan: {
            default: null,
            type: cc.Node
        },
        btn_restart: {
            default: null,
            type: cc.Node
        },
        btn_friend: {
            default: null,
            type: cc.Node
        },
        lbl_result_title: {
            default: null,
            type: cc.Label
        },
        cup_success: {
            default: null,
            type: cc.Node
        },
        cup_failed: {
            default: null,
            type: cc.Node
        },
        lbl_score: {
            default: null,
            type: cc.Label
        },
        lbl_resul_moves: {
            default: null,
            type: cc.Label
        },
        btn_pause: {
            default: null,
            type: cc.Sprite
        },
        backAudio: {
            default: null,
            type: cc.AudioClip
        },
        spawnInterval: 0
    },

    onLoad: function onLoad() {

        this.spawnCount = 0;
        this.scoreparam = 0;
        this.level = [{ name: "Normal", rows: 10, limit: 18 }, { name: "Hard", rows: 12, limit: 24 }, { name: "Hell", rows: 18, limit: 31 }, { name: "Extreme", rows: 24, limit: 41 }];
        this.arrayPosX = [];
        this.arrayPosY = [];
        this.actions();
        this.events();

        this.initialize();
        this.create_table();
        this.load_table();
        this.score = 0;
        // this.arrayPosX = [];
        // this.rows = 5;
        // this.reset_table();
        // this.setSpawnCordinate();
    },

    load_table: function load_table() {
        if (this.game_level == 0) this.schedule(this.spawnNewStar, this.spawnInterval);else this.schedule(this.spawnNewStar2, this.spawnInterval);
    },

    initialize: function initialize() {
        this.finished = false;
        this.game_level = 0;
        this.game_successed = false;
        this.colours = [new cc.Color(255, 127, 0), new cc.Color(219, 90, 200), new cc.Color(237, 92, 75), new cc.Color(199, 219, 85), new cc.Color(80, 178, 189), new cc.Color(95, 87, 146)];
        this.marginX = 50;
        this.marginy = 250;

        this.change_level(this.game_level);
    },

    actions: function actions() {
        this.comein_panAction = cc.moveBy(0.5, cc.v2(320, 0)).easing(cc.easeCubicActionOut());
        this.comeout_panAction = cc.moveBy(0.5, cc.v2(-320, 0)).easing(cc.easeCubicActionOut());
        this.goout_pan = cc.moveBy(0.5, cc.v2(-640, 0)).easing(cc.easeCubicActionOut());

        //Appear Result Pan
        this.lobbyAppearAction1 = cc.moveBy(0.7, cc.v2(0, -280)).easing(cc.easeElasticOut());
        this.lobbyAppearAction2 = cc.moveBy(0.6, cc.v2(0, -280)).easing(cc.easeElasticOut());
        this.lobbyAppearAction3 = cc.moveBy(0.5, cc.v2(0, -280)).easing(cc.easeElasticOut());
        this.lobbyAppearAction4 = cc.moveBy(0.4, cc.v2(0, -280)).easing(cc.easeElasticOut());

        this.lobbyAppearRestart = cc.moveBy(0.2, cc.v2(320, 0)).easing(cc.easeElasticOut());
        this.lobbyAppearFriend = cc.moveBy(0.1, cc.v2(320, 0)).easing(cc.easeElasticOut());

        //Disapper Result Pan
        this.lobbyDisAppearAction1 = cc.moveBy(0.7, cc.v2(0, 280)).easing(cc.easeElasticOut());
        this.lobbyDisAppearAction2 = cc.moveBy(0.6, cc.v2(0, 280)).easing(cc.easeElasticOut());
        this.lobbyDisAppearAction3 = cc.moveBy(0.5, cc.v2(0, 280)).easing(cc.easeElasticOut());
        this.lobbyDisAppearAction4 = cc.moveBy(0.4, cc.v2(0, 280)).easing(cc.easeElasticOut());

        this.lobbyDisAppearRestart = cc.moveBy(0.2, cc.v2(-320, 0)).easing(cc.easeElasticOut());
        this.lobbyDisAppearFriend = cc.moveBy(0.1, cc.v2(-320, 0)).easing(cc.easeElasticOut());
    },

    events: function events() {
        this.btn_restart.on(cc.Node.EventType.MOUSE_DOWN, function () {
            this.out_result_pan_restart();
        }, this);

        this.btn_friend.on(cc.Node.EventType.MOUSE_DOWN, function () {
            // web service                   
        }, this);
    },

    in_result_pan: function in_result_pan(b_result) {
        this.setting_pan.zIndex = 3;
        this.btn_pause.node.runAction(cc.sequence(cc.fadeOut(0.7), cc.delayTime(0.1)));
        this.result_pan.runAction(cc.sequence(cc.moveBy(0.3, cc.v2(320, 0)), this.comein_panAction, cc.callFunc(this.callback_result_in.bind(this))));
        this.clear_node();
    },

    out_result_pan_restart: function out_result_pan_restart() {
        this.btn_pause.node.runAction(cc.sequence(cc.fadeIn(1.5), cc.delayTime(0.1)));
        if (this.game_successed) {
            this.cup_success.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, 280)), this.lobbyDisAppearAction2));
        } else {
            this.cup_failed.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, 280)), this.lobbyDisAppearAction2));
        }
        this.lbl_result_title.node.runAction(cc.sequence(cc.moveBy(0.7, cc.v2(0, 280)), this.lobbyDisAppearAction1
        // ,cc.callFunc(this.callback_result_out.bind(this))
        ));
        this.callback_result_out();
        this.lbl_score.node.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, 280)), this.lobbyDisAppearAction3));
        this.lbl_resul_moves.node.runAction(cc.sequence(cc.moveBy(0.4, cc.v2(0, 280)), this.lobbyDisAppearAction4));

        this.btn_restart.runAction(cc.sequence(cc.moveBy(0.2, cc.v2(-320, 0)), this.lobbyDisAppearRestart));
        this.btn_friend.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(-320, 0)), this.lobbyDisAppearFriend));
    },

    callback_result_in: function callback_result_in() {
        cc.audioEngine.play(this.backAudio, false, 1);
        if (this.game_successed) {
            this.lbl_result_title.string = "PASS";
            this.cup_success.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, -280)), this.lobbyAppearAction2));
        } else {
            this.lbl_result_title.string = "FAIL";
            this.cup_failed.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, -280)), this.lobbyAppearAction2));
        }
        this.lbl_score.string = this.score;
        this.lbl_resul_moves.string = this.moves + " / " + this.limit_moves;
        this.lbl_result_title.node.runAction(cc.sequence(cc.moveBy(0.7, cc.v2(0, -280)), this.lobbyAppearAction1));
        this.lbl_score.node.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, -280)), this.lobbyAppearAction3));
        this.lbl_resul_moves.node.runAction(cc.sequence(cc.moveBy(0.4, cc.v2(0, -280)), this.lobbyAppearAction4));

        this.btn_restart.runAction(cc.sequence(cc.moveBy(0.2, cc.v2(320, 0)), this.lobbyAppearRestart));
        this.btn_friend.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(320, 0)), this.lobbyAppearFriend));
        // this.game_successed = false;
    },

    callback_result_out: function callback_result_out() {
        this.result_pan.runAction(cc.sequence(cc.moveBy(0.3, cc.v2(-320, 0)), this.comeout_panAction, cc.callFunc(this.restart_game.bind(this))));
    },

    restart_game: function restart_game() {
        this.game_successed = false;
        this.finished = false;
        this.score = 0;
        this.clear_node();
        this.change_level(this.game_level);
        this.create_table();
    },

    clear_node: function clear_node() {
        var colortemp = new cc.Color(0, 0, 0);
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.rows; col++) {
                this.node.removeChild(this.game_table[row][col].element);
                this.game_table[row][col].element.destroy();
            }
        }
    },

    reset_table: function reset_table() {
        this.numberToSpawn = this.rows * this.rows;
        this.start_table = {};
        for (var row = 0; row < this.rows; row++) {
            this.start_table[row] = {};
            for (var col = 0; col < this.rows; col++) {
                this.start_table[row][col] = 0;
            }
        }

        this.game_table = {};
        for (var row = 0; row < this.rows; row++) {
            this.game_table[row] = {};
            for (var col = 0; col < this.rows; col++) {
                this.game_table[row][col] = {
                    colour: null,
                    flooded: false,
                    element: null
                };
            }
        }
    },

    change_level: function change_level(num) {
        this.game_successed = false;
        this.game_level = num;
        this.rows = this.level[num].rows;
        this.limit_moves = this.level[num].limit;
        this.level_name = this.level[num].name;
        this.moves = 0;
        this.updateMoves();
        this.mode_label.string = this.level_name;
        this.reset_table();
        this.setSpawnCordinate();
    },

    random_colour: function random_colour() {
        var colour_no = Math.floor(Math.random() * 6);
        return this.colours[colour_no];
    },

    flood_element: function flood_element(row, col, colour) {
        this.game_table[row][col].colour = colour;
        this.game_table[row][col].element.color = colour;
    },

    flood_neighbours: function flood_neighbours(row, col, colour) {
        if (row < this.rows - 1) this.test_colour_flood(row + 1, col, colour);
        if (row > 0) this.test_colour_flood(row - 1, col, colour);
        if (col < this.rows - 1) this.test_colour_flood(row, col + 1, colour);
        if (col > 0) this.test_colour_flood(row, col - 1, colour);
    },

    test_colour_flood: function test_colour_flood(row, col, colour) {
        if (this.game_table[row][col].flooded) return;
        if (this.game_table[row][col].colour.equals(colour)) {
            this.game_table[row][col].flooded = true;
            this.scoreparam++;
            this.flood_neighbours(row, col, colour);
        }
    },

    all_flooded: function all_flooded() {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.rows; col++) {
                if (!this.game_table[row][col].flooded) {
                    return false;
                }
            }
        }
        return true;
    },

    flood: function flood(colour, initial) {
        if (this.finished) return;
        var old_colour = this.game_table[0][0].colour;
        if (!initial && colour == old_colour) return;
        this.moves++;

        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.rows; col++) {
                if (this.game_table[row][col].flooded) {
                    this.flood_element(row, col, colour);
                }
            }
        }for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.rows; col++) {
                if (this.game_table[row][col].flooded) {
                    this.flood_neighbours(row, col, colour);
                }
            }
        }this.score += this.scoreparam * this.scoreparam * 10;
        this.scoreparam = 0;

        if (this.moves < this.limit_moves) {
            if (this.all_flooded()) {
                this.finished = true;
                this.game_successed = true;
                var remind = this.limit_moves - this.moves;
                this.score += remind * remind * 100;
                this.in_result_pan();
            }
        } else this.in_result_pan();
    },

    create_table: function create_table() {
        this.moves = -1;
        this.finished = false;
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.rows; col++) {
                var colour = this.random_colour();
                this.game_table[row][col].colour = colour;
                // this.start_table[row][col] = colour;
                var star = this.spawnNewStarByNum(row, col, row, colour);
                this.game_table[row][col].element = star;
                this.game_table[row][col].flooded = false;
            }
        }
        this.game_table[0][0].flooded = true;
        this.flood(this.game_table[0][0].colour, true);
    },

    setSpawnCordinate: function setSpawnCordinate() {
        this.arrayPosX = [];
        this.arrayPosY = [];
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < i + 1; j++) {
                var num = i - j;
                this.arrayPosX.push(num);
                this.arrayPosY.push(j);
            }
        }for (var i = 0; i < this.rows - 1; i++) {
            for (var j = i; j < this.rows - 1; j++) {
                var num = this.rows - 1 - j + i;
                this.arrayPosX.push(num);
                this.arrayPosY.push(j + 1);
            }
        }this.spawnCount = 0;
    },

    spawnNewStarByNum: function spawnNewStarByNum(i, j, inum, newcolour) {

        var newStar = cc.instantiate(this.floodPrefab);
        var color = newStar.color;
        newStar.color = newcolour;
        // this.node.addChild(newStar);

        var starWidth = (this.canvas.width - 2 * this.marginX) / this.rows;
        newStar.width = starWidth;
        newStar.height = starWidth;

        var x = starWidth * inum - this.canvas.width / 2 + starWidth / 2 + this.marginX;
        var y = this.canvas.height / 2 - starWidth * j - starWidth / 2 - this.marginy;
        var pos = cc.v2(x, y);
        newStar.setPosition(pos);
        return newStar;
    },

    spawnNewStar: function spawnNewStar() {
        if (this.spawnCount >= this.numberToSpawn) {
            return;
        }
        this.getNewStarPosition();
        this.spawnCount += 2;
    },

    getNewStarPosition: function getNewStarPosition() {

        var i = this.spawnCount % this.rows;
        var j = parseInt(this.spawnCount / this.rows);
        var inum = parseInt(this.arrayPosX[this.spawnCount]);
        var jnum = parseInt(this.arrayPosY[this.spawnCount]);
        var inum1 = parseInt(this.arrayPosX[this.spawnCount + 1]);
        var jnum1 = parseInt(this.arrayPosY[this.spawnCount + 1]);
        var newStar = this.game_table[inum][jnum].element;
        var newStar1 = this.game_table[inum1][jnum1].element;
        this.node.addChild(newStar);
        this.node.addChild(newStar1);
    },

    spawnNewStar2: function spawnNewStar2() {
        if (this.spawnCount >= this.numberToSpawn) {
            return;
        }
        this.getNewStarPosition6();
        this.spawnCount += 6;
    },

    getNewStarPosition6: function getNewStarPosition6() {
        cc.log(6);
        var i = this.spawnCount % this.rows;
        var j = parseInt(this.spawnCount / this.rows);
        var inum = parseInt(this.arrayPosX[this.spawnCount]);
        var jnum = parseInt(this.arrayPosY[this.spawnCount]);
        var inum1 = parseInt(this.arrayPosX[this.spawnCount + 1]);
        var jnum1 = parseInt(this.arrayPosY[this.spawnCount + 1]);
        var inum2 = parseInt(this.arrayPosX[this.spawnCount + 2]);
        var jnum2 = parseInt(this.arrayPosY[this.spawnCount + 2]);
        var inum3 = parseInt(this.arrayPosX[this.spawnCount + 3]);
        var jnum3 = parseInt(this.arrayPosY[this.spawnCount + 3]);
        var inum4 = parseInt(this.arrayPosX[this.spawnCount + 4]);
        var jnum4 = parseInt(this.arrayPosY[this.spawnCount + 4]);
        var inum5 = parseInt(this.arrayPosX[this.spawnCount + 5]);
        var jnum5 = parseInt(this.arrayPosY[this.spawnCount + 5]);
        var newStar = this.game_table[inum][jnum].element;
        var newStar1 = this.game_table[inum1][jnum1].element;
        var newStar2 = this.game_table[inum2][jnum2].element;
        var newStar3 = this.game_table[inum3][jnum3].element;
        var newStar4 = this.game_table[inum4][jnum4].element;
        var newStar5 = this.game_table[inum5][jnum5].element;
        this.node.addChild(newStar);
        this.node.addChild(newStar1);
        this.node.addChild(newStar2);
        this.node.addChild(newStar3);
        this.node.addChild(newStar4);
        this.node.addChild(newStar5);
    },

    updateMoves: function updateMoves() {
        this.move_display.string = this.moves + " / " + this.limit_moves;
    },

    gainScore: function gainScore() {},

    gameOver: function gameOver() {
        cc.director.loadScene('game');
    }
});

cc._RF.pop();
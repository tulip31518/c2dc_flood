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
        spawnInterval: 0
    },

    onLoad: function onLoad() {

        this.spawnCount = 0;
        this.level = [{ name: "Normal", rows: 3, limit: 18 }, { name: "Hard", rows: 12, limit: 24 }, { name: "Hell", rows: 18, limit: 31 }, { name: "Extreme", rows: 24, limit: 41 }];

        this.actions();
        this.events();

        this.initialize();
        this.create_table();
        this.score = 0;
    },

    initialize: function initialize() {
        this.finished = false;
        this.game_level = 0;
        this.game_successed = false;
        this.colours = [cc.Color.BLUE, cc.Color.RED, cc.Color.GREEN, cc.Color.YELLOW, cc.Color.ORANGE, cc.Color.MAGENTA];
        this.marginX = 50;
        this.marginy = 180;

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
        this.result_pan.runAction(cc.sequence(cc.moveBy(0.3, cc.v2(320, 0)), this.comein_panAction, cc.callFunc(this.callback_result_in.bind(this))));
    },

    out_result_pan_restart: function out_result_pan_restart() {
        if (this.game_successed) {
            this.cup_success.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, 280)), this.lobbyDisAppearAction2));
        } else {
            this.cup_failed.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, 280)), this.lobbyDisAppearAction2));
        }
        this.lbl_result_title.node.runAction(cc.sequence(cc.moveBy(0.7, cc.v2(0, 280)), this.lobbyDisAppearAction1, cc.callFunc(this.callback_result_out.bind(this))));
        this.lbl_score.node.runAction(cc.sequence(cc.moveBy(0.5, cc.v2(0, 280)), this.lobbyDisAppearAction3));
        this.lbl_resul_moves.node.runAction(cc.sequence(cc.moveBy(0.4, cc.v2(0, 280)), this.lobbyDisAppearAction4));

        this.btn_restart.runAction(cc.sequence(cc.moveBy(0.2, cc.v2(-320, 0)), this.lobbyDisAppearRestart));
        this.btn_friend.runAction(cc.sequence(cc.moveBy(0.1, cc.v2(-320, 0)), this.lobbyDisAppearFriend));
    },

    callback_result_in: function callback_result_in() {
        if (this.game_successed) {
            this.lbl_result_title.string = "PASS";
            this.cup_success.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, -280)), this.lobbyAppearAction2));
        } else {
            this.lbl_result_title.string = "FAIL";
            this.cup_failed.runAction(cc.sequence(cc.moveBy(0.6, cc.v2(0, -280)), this.lobbyAppearAction2));
        }
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
        this.clear_node();
        this.change_level(this.game_level);
        this.create_table();
    },

    clear_node: function clear_node() {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.rows; col++) {
                this.node.removeChild(this.game_table[row][col].element);
                this.game_table[row][col].element.destroy();
                this.game_table[row][col].element = null;
            }
        }
    },

    reset_table: function reset_table() {
        this.numberToSpawn = this.rows * this.rows;
        this.start_table = {};
        for (var row = 0; row < this.rows; row++) {
            this.start_table[row] = {};
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
        }if (this.moves < this.limit_moves) {
            if (this.all_flooded()) {
                this.finished = true;
                this.game_successed = true;
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
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j <= i; j++) {
                this.spawnCount++;
                this.start_table[i][j] = i - j + 1;
            }
        }for (var i = 1; i < this.rows; i++) {
            for (var j = i; j < this.rows; j++) {
                var inum = this.rows - j + i;
                this.spawnCount++;
                this.start_table[i][j] = this.rows - j + i;
            }
        }
    },

    spawnNewStarByNum: function spawnNewStarByNum(i, j, inum, newcolour) {

        var newStar = cc.instantiate(this.floodPrefab);
        var color = newStar.color;
        newStar.color = newcolour;
        this.node.addChild(newStar);

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

        var newStar = cc.instantiate(this.floodPrefab);
        this.node.addChild(newStar);
        newStar.zIndex = 3;
        newStar.setPosition(this.getNewStarPosition(newStar.width));
        //newStar.setPosition(cc.v2(newStar.getPosition().x + newStar.node.width * i, 0)); 
        this.spawnCount++;
    },

    getNewStarPosition: function getNewStarPosition(starWidth) {
        this.marginX = (this.canvas.width - starWidth * this.numberToSpawn / this.rows) / 2;
        // this.marginy = (this.canvas.height - starWidth * this.numberToSpawn / this.rows ) / 2;
        var x = starWidth * (this.spawnCount % this.rows) - this.canvas.width / 2 + starWidth / 2 + this.marginX;
        var ynum = (this.spawnCount - this.spawnCount % this.rows) * this.rows;
        var y = this.canvas.height / 2 - starWidth * parseInt(this.spawnCount / this.rows) - starWidth / 2 - this.marginy;
        return cc.v2(x, y);
    },

    new_game: function new_game() {
        this.create_table();
    },

    updateMoves: function updateMoves() {
        this.move_display.string = this.moves + " / " + this.limit_moves;
    },

    gainScore: function gainScore() {
        // this.score += 1;        
        // this.scoreDisplay.string = this.score;        
        // cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function gameOver() {
        // this.player.stopAllActions(); 
        cc.director.loadScene('game');
    }
});

cc._RF.pop();
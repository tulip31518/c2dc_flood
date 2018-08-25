(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game', __filename);
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
        spawnInterval: 0
        // rows: 0
    },

    onLoad: function onLoad() {

        this.spawnCount = 0;
        this.level = [{
            name: "Normal",
            rows: 10,
            limit: 18
        }, {
            name: "Hard",
            rows: 12,
            limit: 24
        }, {
            name: "Hell",
            rows: 18,
            limit: 31
        }, {
            name: "Extreme",
            rows: 24,
            limit: 41
        }];
        this.initialize();
        this.create_table();

        this.score = 0;
    },

    initialize: function initialize() {
        this.finished = false;
        this.game_level = 0;
        this.change_level(this.game_level);

        this.colours = [cc.Color.BLUE, cc.Color.RED, cc.Color.GREEN, cc.Color.YELLOW, cc.Color.ORANGE, cc.Color.MAGENTA];
        this.reset_table();
    },

    clear_node: function clear_node() {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.rows; col++) {
                this.game_table[row][col].element.destroy();
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
        this.game_level = num;
        this.rows = this.level[num].rows;
        this.limit_moves = this.level[num].limit;
        this.level_name = this.level[num].name;
        this.moves = 0;
        this.updateMoves();
        this.reset_table();
        // this.create_table();       
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
        }if (this.all_flooded()) {
            this.finished = true;
            if (this.moves <= this.max_moves) {
                cc.log("You win.");
            } else {
                cc.log("Finished, at last!");
            }
        } else if (this.moves == this.max_moves) {
            cc.log("You lost.");
        }
    },

    create_table: function create_table() {
        this.moves = -1;
        this.finished = false;
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.rows; col++) {
                var colour = this.random_colour();
                this.game_table[row][col].colour = colour;
                this.start_table[row][col] = colour;
                var star = this.spawnNewStarByNum(row, col, row, colour);
                this.game_table[row][col].element = star;
                this.game_table[row][col].flooded = false;
            }
        }
        this.game_table[0][0].flooded = true;
        this.flood(this.game_table[0][0].colour, true);
    },

    spawnAllStars: function spawnAllStars() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j <= i; j++) {
                var inum = i - j + 1;
                this.spawnCount++;
                this.spawnNewStarByNum(i, j, i - j + 1);
            }
        }for (var i = 1; i < this.rows; i++) {
            for (var j = i; j < this.rows; j++) {
                var inum = this.rows - j + i;
                this.spawnCount++;
                this.spawnNewStarByNum(i, j, this.rows - j + i);
            }
        }
    },

    spawnNewStarByNum: function spawnNewStarByNum(i, j, inum, newcolour) {

        var newStar = cc.instantiate(this.floodPrefab);
        var color = newStar.color;
        newStar.color = newcolour;
        this.node.addChild(newStar);
        var starWidth = newStar.width;

        var marginX = (this.canvas.width - starWidth * this.rows) / 2;
        var marginy = (this.canvas.height - starWidth * this.rows) / 2;

        var x = starWidth * inum - this.canvas.width / 2 + starWidth / 2 + marginX;
        var ynum = (this.spawnCount - this.spawnCount % this.rows) * this.rows;
        var y = this.canvas.height / 2 - starWidth * j - starWidth / 2 - marginy + 50;
        var pos = cc.v2(x, y);
        newStar.setPosition(pos);

        newStar.getComponent('Star').game = this;
        return newStar;
    },

    spawnNewStar: function spawnNewStar() {

        if (this.spawnCount >= this.numberToSpawn) {
            return;
        }

        var newStar = cc.instantiate(this.floodPrefab);
        this.node.addChild(newStar);

        newStar.setPosition(this.getNewStarPosition(newStar.width));
        //newStar.setPosition(cc.v2(newStar.getPosition().x + newStar.node.width * i, 0));        
        newStar.getComponent('Star').game = this;
        this.spawnCount++;
    },

    getNewStarPosition: function getNewStarPosition(starWidth) {
        var marginX = (this.canvas.width - starWidth * this.numberToSpawn / this.rows) / 2;
        var marginy = (this.canvas.height - starWidth * this.numberToSpawn / this.rows) / 2;
        var x = starWidth * (this.spawnCount % this.rows) - this.canvas.width / 2 + starWidth / 2 + marginX;
        var ynum = (this.spawnCount - this.spawnCount % this.rows) * this.rows;
        var y = this.canvas.height / 2 - starWidth * parseInt(this.spawnCount / this.rows) - starWidth / 2 - marginy;
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
        //# sourceMappingURL=Game.js.map
        
"use strict";
cc._RF.push(module, '4e12fLSQu1L+KV6QmxDiavU', 'Game');
// scripts/Game.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        maxStarDuration: 0,
        minStarDuration: 0,
        ground: {
            default: null,
            type: cc.Node
        },
        canvas: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            type: cc.AudioClip
        },
        numberToSpawn: 0,
        spawnInterval: 0,
        rows: 0,
        colours: []
    },

    onLoad: function onLoad() {

        this.groundY = this.ground.y + this.ground.height / 2;
        this.timer = 0;
        this.starDuration = 0;
        this.spawnCount = 0;
        // this.schedule(this.spawnNewStar, this.spawnInterval);
        // this.spawnNewStar();

        this.initialize();
        this.create_table();
        // this.spawnAllStars();
        // this.score = 0;
    },

    initialize: function initialize() {
        this.start_table = {};
        this.colours = "blue red green yellow pink purple".split(/\s+/);
        for (var row = 0; row < this.rows; row++) {
            this.start_table[row] = {};
        }

        this.game_table = {};
        for (var row = 0; row < this.rows; row++) {
            this.game_table[row] = {};
            for (var col = 0; col < this.rows; col++) {
                this.game_table[row][col] = "";
            }
        }
    },

    random_colour: function random_colour() {
        var colour_no = Math.floor(Math.random() * 6);
        cc.log(this.colours[colour_no]);
        return this.colours[colour_no];
    },

    create_table: function create_table() {
        this.moves = -1;
        this.finished = false;
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.rows; col++) {

                // game_table[row][col].colour = colour;
                this.start_table[row][col] = this.random_colour();
                // game_table[row][col].element = td;
                // game_table[row][col].flooded = false;
            }
        }
        // game_table[0][0].flooded = true;
        // flood (game_table[0][0].colour, true);
        // append_text (get_by_id("max-moves"), max_moves);
    },

    spawnAllStars: function spawnAllStars() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j <= i; j++) {
                var inum = i - j + 1;
            }
        }for (var i = 1; i < this.rows; i++) {
            for (var j = i; j < this.rows; j++) {
                var inum = this.rows - j + i;
            }
        }
    },

    spawnNewStarByNum: function spawnNewStarByNum(i, j, inum) {

        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        var starWidth = newStar.width;

        var marginX = (this.canvas.width - starWidth * this.rows) / 2;
        var marginy = (this.canvas.height - starWidth * this.rows) / 2;

        var x = starWidth * inum - this.canvas.width / 2 + starWidth / 2 + marginX;
        var ynum = (this.spawnCount - this.spawnCount % this.rows) * this.rows;
        var y = this.canvas.height / 2 - starWidth * j - starWidth / 2 - marginy;
        var pos = cc.v2(x, y);
        newStar.setPosition(pos);

        newStar.getComponent('Star').game = this;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    spawnNewStar: function spawnNewStar() {

        if (this.spawnCount >= this.numberToSpawn) {
            return;
        }

        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);

        newStar.setPosition(this.getNewStarPosition(newStar.width));
        //newStar.setPosition(cc.v2(newStar.getPosition().x + newStar.node.width * i, 0));        
        newStar.getComponent('Star').game = this;
        this.starDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
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

    update: function update(dt) {

        // if (this.timer > this.starDuration) {
        //     this.gameOver();
        //     this.enabled = false;   // disable gameOver logic to avoid load scene repeatedly
        //     return;
        // }
        this.timer += dt;
    },

    gainScore: function gainScore() {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
    },

    gameOver: function gameOver() {
        this.player.stopAllActions();
        cc.director.loadScene('game');
    }
});

cc._RF.pop();
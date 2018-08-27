cc.Class({
    extends: cc.Component,
    
    properties: {        
       
        color: {
            default: null,
            type: cc.Color
        },
        canvas: {
            default: null,
            type: cc.Node
        },  
    },

    

    onLoad: function () {
        this.node.color = this.color;   
        this.game = this.canvas.getComponent('Game');
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            if(this.game.moves >= this.game.limit_moves)
                return;
            this.game.flood (this.color);
            this.game.updateMoves();
            cc.audioEngine.playEffect(this.scoreAudio, false);
        }, this);
    },

    // update: function (dt) {

    //     if (this.getPlayerDistance() < this.pickRadius) {                        
            
    //         return;
    //     }      
       
    // },
});

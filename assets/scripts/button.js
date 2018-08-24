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
            this.game.flood (this.color);
            this.game.updateMoves();
        }, this);     
    },

    // update: function (dt) {

    //     if (this.getPlayerDistance() < this.pickRadius) {                        
            
    //         return;
    //     }      
       
    // },
});

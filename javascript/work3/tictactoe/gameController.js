var game = require("./game");
var board, plays;

module.exports = class GameController{

	constructor(player1,player2){
		board = new game();
		plays = 0;

		console.log("Starting a match between:\n"+player1.name+" : X\n"+player2.name+" : O")
		console.log("First to play: "+this.turn)

		player1.socket.emit("setChar",{
			"player1":player1.name,
			"player2": player2.name,
			"char": "X"
		});

		player2.socket.emit("setChar",{
			"player1":player1.name,
			"player2": player2.name,
			"char": "O"
		});

		this.generateHandlers(player1,player2)	
	}

	generateHandlers(player,otherPlayer){
		this.generatePlayHandler(player,otherPlayer)
		this.generatePlayHandler(otherPlayer,player)
		this.generateDisconnectHandler(player,otherPlayer)
		this.generateDisconnectHandler(otherPlayer,player)
	}

	generatePlayHandler(player,otherPlayer){
		player.socket.on("play",function(data){
			console.log(player.name,this.turn)
			// if(player.name==this.turn){
				console.log("Receiving play ("+data.x+","+data.y+","+data.c+") from player "+player.name)
				try{
					var win = board.play(data.x,data.y,data.c);
					otherPlayer.socket.emit("play",data);
					plays++;
					if(win){
						var msg = {
							"msg": "Player "+player.name+" won the match!",
							"player": player.name
						}
						console.log(msg)
						setTimeout(function(){
							player.socket.emit("end",msg);
							otherPlayer.socket.emit("end",msg);
						},500)
						
						board = new game();
						plays = 0;
					}
					else if(plays==9){
						var msg = {
							"msg": "Game Over!"
						}
						player.socket.emit("end",msg);
						otherPlayer.socket.emit("end",msg);
					}
				}
				catch(err){
					console.log(err)
					player.socket.emit("err",err);
				}
			// }
			// else{
				// player.socket.emit("err","not your turn!");
			// }
		})
	}

	generateDisconnectHandler(player,otherPlayer){
		player.socket.on("disconnect",function(){
			if(otherPlayer.socket.connected)
				otherPlayer.socket.disconnect()
		})
	}

}
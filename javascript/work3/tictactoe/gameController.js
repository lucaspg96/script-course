var game = require("./game");
var board, plays;

module.exports = class GameController{
	//initiate a room
	constructor(player1,player2){
		//generate a board
		board = new game();
		plays = 0;

		console.log("Starting a match between:\n"+player1.name+" : X\n"+player2.name+" : O")
		console.log("First to play: "+this.turn)

		//send the match informations to the playerss
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

		//generate the socket handlers
		this.generateHandlers(player1,player2)	
	}

	generateHandlers(player,otherPlayer){
		this.generatePlayHandler(player,otherPlayer)
		this.generatePlayHandler(otherPlayer,player)

		this.generateDisconnectHandler(player,otherPlayer)
		this.generateDisconnectHandler(otherPlayer,player)
	}

	//generate the handler of a play
	generatePlayHandler(player,otherPlayer){
		//when a player play
		player.socket.on("play",function(data){
			console.log(player.name,this.turn)
			// if(player.name==this.turn){
				console.log("Receiving play ("+data.x+","+data.y+","+data.c+") from player "+player.name)
				try{
					//try make the play and chec if won
					var win = board.play(data.x,data.y,data.c);
					//if no error is trhow, tell the other player about the play
					otherPlayer.socket.emit("play",data);
					//increments the number of plays
					plays++;
					//if someone has won
					if(win){
						//generate a win's message
						var msg = {
							"msg": "Player "+player.name+" won the match!",
							"player": player.name
						}
						console.log(msg)
						//give a delay so that the "play" message can arrive
						setTimeout(function(){
							//send the end message to both players
							player.socket.emit("end",msg);
							otherPlayer.socket.emit("end",msg);
						},500)
						//reset the board and plays
						board = new game();
						plays = 0;
					}
					//if the board is full
					else if(plays==9){
						//game over
						var msg = {
							"msg": "Game Over!"
						}
						player.socket.emit("end",msg);
						otherPlayer.socket.emit("end",msg);
					}
				}
				catch(err){
					//if has an error, send it to the player
					console.log(err)
					player.socket.emit("err",err);
				}
			// }
			// else{
				// player.socket.emit("err","not your turn!");
			// }
		})
	}
	//generate the handler of a disconnect
	generateDisconnectHandler(player,otherPlayer){
		//when disconnect
		player.socket.on("disconnect",function(){
			//if the other player is connected
			if(otherPlayer.socket.connected){
				//disconnect the other player
				otherPlayer.socket.disconnect()
			}
		})
	}

}
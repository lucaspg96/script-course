var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

//get the game controller contructor
var controller = require('./gameController')

//define the front-end on a static path
app.use(express.static(__dirname + '/webapp')); 

//route to generate front
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/webapp/index.html');
});

//queue of players waiting
var queue = []
//list of running matches
var matches = []

//when a new player connect
io.on('connection', function(player) {  
    console.log('Client connected...');

    //when a player join the game (choosing a name)
    player.on('join', function(data) {
    	//filter bugs
    	if(data!="null" && data!=""){
	    	console.log("Player "+data+" joined")
	    	//generate simple object to the player
	    	var player1 = {
	    		name:data,
	    		socket:player
	    	}

	    	//if no one is waiting, get in the queue
	        if(queue.length==0){
	        	console.log(data+ " is in the queue...")
		    	queue.push(player1);
		    }
		    //there is a player waiting
		    else{
		    	//get the player
		    	var player2 = queue.shift();
		    	console.log("Removing "+player2.name+" from queue...")
		    	console.log("2 players found. Starting a match...")
		    	//creates a new match controller
		    	matches.push(new controller(player2,player1))
		    }
		}
    });

});

server.listen(3000); 
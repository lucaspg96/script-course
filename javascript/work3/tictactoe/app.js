var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

var controller = require('./gameController')

app.use(express.static(__dirname + '/webapp')); 

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/webapp/index.html');
});

var queue = []
var matches = []

io.on('connection', function(player) {  
    console.log('Client connected...');

    player.on('join', function(data) {
    	if(data!="null" && data!=""){
	    	console.log("Player "+data+" joined")
	    	var player1 = {
	    		name:data,
	    		socket:player
	    	}

	        if(queue.length==0){
	        	console.log(data+ " is in the queue...")
		    	queue.push(player1);
		    }
		    else{
		    	var player2 = queue.shift();
		    	console.log("Removing "+player2.name+" from queue...")
		    	console.log("2 players found. Starting a match...")
		    	matches.push(new controller(player2,player1))
		    }
		}
    });

});

server.listen(3000); 
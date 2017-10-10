$("#X").hide()
$("#O").hide()
var socket = io.connect('http://localhost:3000');

var isWaiting = true
var myChar
var oppontentChar
var name
var lastPlay
var tooglePlayer

//when try to make a move
$(".btn").click(function(){
	//if is your turn and is an empty house
	if(!isWaiting && $(this).text()==" "){
		console.log("botão clicado")

		//get the id of the house
		var id = $(this).attr("id")
		//put hte char in the house
		$(this).text(myChar)

		//get the coordinates of the house
		var x = +id[0];
		var y = +id[1];
		console.log("Jogada: "+x+","+y)

		//save it for possibly undo
		lastPlay = {x:x,y:y,c:myChar}
		//send the play
		socket.emit("play",lastPlay)
		//change the turn
		isWaiting = true
		//toogle player turn name
		tooglePlayer()
	}
	else{
		//if is not your turn
		if(isWaiting)
			alert("Not your turn!")

		//if the house isn't empty
		else
			alert("Invalid play!")
	}
})

//clear the board
function clearBoard(){
	$("#game li").text(" ")
}

//when connect
socket.on('connect', function(data) {
	//get the name and send it
	name = prompt("Your name:")
    socket.emit('join', name);
});

//when a match starts
socket.on('setChar',function(data){
	//get the char
	myChar = data.char
	//get opponents char
	oppontentChar = myChar=="X" ? "O":"X"
	console.log(myChar,oppontentChar)

	//prepare the score board
	$("#X").text(data.player1+"(X)")
	$("#O").text(data.player2+"(O)")

	//check if you start
	isWaiting = (name==data.player2)

	//show the board
	$("#X").show()
	$("#O").show()
	$("#player").text(data.player1)

	//define the toogle player function
	tooglePlayer = function(){
		console.log($("#player").text(),data)
		if($("#player").text()==data.player1)
			$("#player").text(data.player2)
		else
			$("#player").text(data.player1)
	}
});

//when receives a play
socket.on("play",function(data){
	console.log(data)
	//get the id of the house
	var id = "#"+data.x.toString()+data.y.toString()
	//set the content of the house
	$(id).text(data.c)
	//now it's your turn
	isWaiting = false
	//toogle the player turn name
	tooglePlayer()
})

//when receives an end
socket.on("end",function(data){
	alert(data.msg)
	//if has a player, is a win event
	if(data.player){
		//check who won an update score
		if(data.player == name){
			$("#"+myChar+"_win").text(+($("#"+myChar+"_win").text())+1)
		}
		else{
			$("#"+oppontentChar+"_win").text(+($("#"+oppontentChar+"_win").text())+1)
		}
	}
	//check if want to keep playing
	if(confirm("Keep playing?"))
		clearBoard()
	else{
		//disconnect, if not
		socket.disconnect()
		$("#player").hide()
	}
})

//when an error occurs
socket.on("err",function(msg){
	//alert the message
	alert(msg)
	console.log(msg)
	//change back the player
	tooglePlayer()
})

//when disconnect
socket.on("disconnect",function(){
	//alert the end of the room
	alert("Player disconnected!")
	//hide the board
	$("#game").hide()
})
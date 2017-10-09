$("#X").hide()
$("#O").hide()
var socket = io.connect('http://localhost:3000');

var isWaiting = true
var myChar
var oppontentChar
var name
var lastPlay
var tooglePlayer

$(".btn").click(function(){
	if(!isWaiting && $(this).text()==" "){
		console.log("botão clicado")

		var id = $(this).attr("id")
		$(this).text(myChar)
		var x = +id[0];
		var y = +id[1];
		console.log("Jogada: "+x+","+y)

		lastPlay = {x:x,y:y,c:myChar}
		socket.emit("play",lastPlay)
		isWaiting = true
		tooglePlayer()
	}
	else{
		if(isWaiting)
			alert("Not your turn!")
		else
			alert("Invalid play!")
	}
})

function clearBoard(){
	$("#game li").text(" ")
}

socket.on('connect', function(data) {
	name = prompt("Your name:")
    socket.emit('join', name);
});

socket.on('setChar',function(data){
	myChar = data.char
	oppontentChar = myChar=="X" ? "O":"X"
	console.log(myChar,oppontentChar)

	$("#X").text(data.player1+"(X)")
	$("#O").text(data.player2+"(O)")

	isWaiting = (name==data.player2)

	$("#X").show()
	$("#O").show()
	$("#player").text(data.player1)

	tooglePlayer = function(){
		console.log($("#player").text(),data)
		if($("#player").text()==data.player1)
			$("#player").text(data.player2)
		else
			$("#player").text(data.player1)
	}
});

socket.on("play",function(data){
	console.log(data)
	var id = "#"+data.x.toString()+data.y.toString()
	$(id).text(data.c)
	isWaiting = false
	tooglePlayer()
})

socket.on("end",function(data){
	alert(data.msg)
	if(data.player){
		if(data.player == name){
			$("#"+myChar+"_win").text(+($("#"+myChar+"_win").text())+1)
		}
		else{
			$("#"+oppontentChar+"_win").text(+($("#"+oppontentChar+"_win").text())+1)
		}
	}
	
	if(confirm("Keep playing?"))
		clearBoard()
	else{
		socket.disconnect()
		$("#player").hide()
	}
})

socket.on("err",function(msg){
	alert(msg)
	console.log(msg)
	tooglePlayer()
})

socket.on("disconnect",function(){
	alert("Player disconnected!")
	$("#game").hide()
})
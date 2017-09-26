function Test() {

	var privateFunction = function(){console.log("I'm a private function!")}

	this.callPrivateFunction = function(){
		console.log("Calling private function...")
		privateFunction()
	}

}

var t = new Test

if(t.privateFunction){
	console.log("We can access the private function!")
	t.privateFunction()
}
else{
	console.log("We cannot access the private funcyion :(")
	t.callPrivateFunction()
}

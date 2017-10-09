module.exports = class TicTacToe {
	constructor(){
		this.board = [
			[undefined,undefined,undefined],
			[undefined,undefined,undefined],
			[undefined,undefined,undefined]
			];
	}

	play(posX,posY,c){
		if(posX > 2 || posY > 2 || this.board[posX][posY]){
			console.log("Invalid play: ")
			console.log(posX,posY,c,this.board[posX][posY])
			throw "Invalid play";
		}
		else{
			this.board[posX][posY] = c
			return this.checkWin()
		}

	}

	checkWin(){
		return this.__checkRows() || this.__checkColumns() || this.__checkDiagonals();
	}

	__checkRows(){
		for (var i = 0; i < 3; i++) {
			if(this.board[i][0] == this.board[i][1] && this.board[i][1] == this.board[i][2] && this.board[i][0])
				return true
		}

		return false
	}

	__checkColumns(){
		for (var i = 0; i < 3; i++) {
			if(this.board[0][i] == this.board[1][i] && this.board[1][i] == this.board[2][i] && this.board[0][i])
				return true
		}

		return false
	}

	__checkDiagonals(){
		return (this.board[0][0] == this.board[1][1] && this.board[1][1] == this.board[2][2] && this.board[0][0]) ||
				(this.board[0][2] == this.board[1][1] && this.board[1][1] == this.board[2][0] && this.board[0][2])
	}
}
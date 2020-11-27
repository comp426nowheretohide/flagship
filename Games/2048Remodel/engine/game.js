/*
Add your code for Game here
 */
export default class Game {
// let Game = class {

    constructor(num) {
        this.height = num
        this.width = num
        this.moves = new Array()
        this.wins = new Array()
        this.losses = new Array()
        this.gameState = {
            board: new Array(num*num),
            score: 0,
            won: false,
            over: false
        }
        this.officialBoard = new Array(num)
        for(let i = 0; i < this.officialBoard.length; i++) {
            this.officialBoard[i] = new Array(num)
        }
        this.setupNewGame()
    }

    setupNewGame = function() {

        this.gameState = {
            board: new Array(this.height*this.width),
            score: 0,
            won: false,
            over: false
        }
        for(let i = 0; i < this.officialBoard.length; i++) {
            for(let j = 0; j < this.officialBoard[0].length; j++) {
                this.officialBoard[i][j] = 0
            }
        }

        this.randomNumberSetup()
        this.randomNumberSetup()

        this.convertBoard()

    }

    convertBoard = function() {
        this.gameState.board = [].concat(...this.officialBoard)
    }

    makeOfficialBoard = function(loadedBoard) {
        for(let i = 0; i < Math.sqrt(loadedBoard.length); i++) {
            for(let j = 0; j < Math.sqrt(loadedBoard.length); j++) {
                this.officialBoard[i][j] = loadedBoard[(Math.sqrt(loadedBoard.length) * i) + j]
            }
        }
    }

    randomNumberSetup = function() {
        let emptyBoard = new Array()

        for(let i = 0; i < this.officialBoard.length; i++) {
            for(let j = 0; j < this.officialBoard[0].length; j++) {
                if(this.officialBoard[i][j] == 0) {
                    emptyBoard.push({
                        x: i,
                        y: j
                    })
                }
            }
        }

        if (emptyBoard.length > 0) {
            let position = emptyBoard[Math.floor(Math.random() * emptyBoard.length)]
            let rand_num = Math.random()
            if(rand_num > 0.9) {
                this.officialBoard[position.x][position.y] = 4
            } else {
               this.officialBoard[position.x][position.y] = 2
            }
        }
    }

    createBlankBoard = function() {
        let ret_arr = []
        for(let i = 0; i < this.height; i++) {
            ret_arr[i] = []
            for(let j = 0; j < this.width; j++) {
                ret_arr[i][j] = 0
            }
        }
        return ret_arr
    }

    loadGame = function(newState) {
        this.height = Math.sqrt(newState.board.length)
        this.width = Math.sqrt(newState.board.length)
        this.gameState = {
            board: newState.board,
            score: newState.score,
            won: newState.won,
            over: newState.over
        }
        this.gameState.score = newState.score
        this.gameState.won = newState.won
        this.gameState.over = newState.over
        this.officialBoard = this.createBlankBoard()
        for(let i = 0; i < this.height; i++) {
            for(let j = 0; j < this.width; j++) {
                this.officialBoard[i][j] = newState.board[i*this.height + j]
            }
        }
    }

    newCopy = function(board) {
        let ret_arr = board.map(function(arr) {
            return arr.slice()
        })
        return ret_arr
    }

    checkChanges = function(prev, off) {
        for(let i = 0; i < prev.length; i++) {
            for(let j = 0; j < prev[0].length; j++) {
                if(prev[i][j] != off[i][j]) {
                    return true
                }
            }
        }
        return false
    }

    flip = function(preFlip) {
        for(let i = 0; i < preFlip.length; i++) {
            preFlip[i].reverse()
        }
    }

    rotate = function(preRotate) {
        let newBoard = new Array(preRotate.length)
        for(let i = 0; i < this.officialBoard.length; i++) {
            newBoard[i] = new Array(preRotate.length)
        }
        for(let i = 0; i < newBoard.length; i++) {
            for(let j = 0; j < newBoard.length; j++) {
                newBoard[i][j] = 0
            }
        }
        for(let i = 0; i < preRotate.length; i++) {
            for(let j = 0; j < preRotate.length; j++) {
                newBoard[i][j] = preRotate[j][i]
            }
        } 
        return newBoard
    }

    move = function(direction) {
        let previousBoard = this.newCopy(this.officialBoard)
        let wasFlipped = false
        let wasRotated = false
        switch(direction) {
            case "up":
                this.officialBoard = this.rotate(this.officialBoard)
                this.flip(this.officialBoard)
                wasFlipped = true
                wasRotated = true
                break
            case "down":
                this.officialBoard = this.rotate(this.officialBoard)
                wasRotated = true
                break
            case "left":
                this.flip(this.officialBoard)
                wasFlipped = true
                break
            case "right":
                break
        }
        for(let i = 0; i < this.officialBoard.length; i++) {
            this.officialBoard[i] = this.shift(this.officialBoard[i])
            this.addNumbers(this.officialBoard[i])
            this.officialBoard[i] = this.shift(this.officialBoard[i])
        }

        if(wasFlipped) {
            this.flip(this.officialBoard)
        }

        if(wasRotated) {
            this.officialBoard = this.rotate(this.officialBoard)
            this.officialBoard = this.rotate(this.officialBoard)
            this.officialBoard = this.rotate(this.officialBoard)
        }

        let didChange = this.checkChanges(previousBoard, this.officialBoard)

        if(didChange) {
            this.randomNumberSetup()
        }
        this.convertBoard()

        if(this.moves.length > 0) {
            for(let i = 0; i < this.moves.length; i++) {
                this.moves[i](this.getGameState())
            }
        }

        let gameOver = this.checkOver()
        if(gameOver) {
            this.gameState.over = true;
            if(this.losses.length > 0) {
                for(let i = 0; i < this.losses.length; i++) {
                    this.losses[i](this.getGameState())
                }
            }
        }

    }

    checkOver = function() {
        for(let i = 0; i < this.officialBoard.length; i++) {
            for(let j = 0; j < this.officialBoard.length; j++) {
                if(this.officialBoard[i][j] == 0) {
                    return false
                }
                if(j != this.officialBoard.length - 1 && this.officialBoard[i][j] == this.officialBoard[i][j+1]) {
                    return false;
                }
                if(i != this.officialBoard.length - 1 && this.officialBoard[i][j] == this.officialBoard[i+1][j]) {
                    return false
                }
            }
        }
        return true
    }

    shift = function(row) {
        let ret_arr = row.filter(x => x);
        let zero = this.width - ret_arr.length
        let zeroes = Array(zero).fill(0)
        ret_arr = zeroes.concat(ret_arr)
        return ret_arr
    }

    addNumbers = function(row) {
        for(let i = this.width - 1; i >= 1; i--) {
            let a = row[i]
            let b = row[i - 1]
            if(a == b) {
                row[i] = a + b
                this.gameState.score += (a + b)
                row[i-1] = 0
                if(a + b == 256) {
                    this.gameState.won = true
                    if(this.wins.length > 0) {
                        for(let i = 0; i < this.wins.length; i++) {
                            this.wins[i](this.getGameState())
                        }
                    }
                }
            }
        }
    }

    toString = function() {

        let num = this.width

        let ret_str = ""

        for(let i = 0; i < num; i++) {
            for(let j = 0; j < num; j++) {
                if(this.gameState.board[(num*i) + j] == "0") {
                    ret_str += "[ ] "
                } else {
                    ret_str += "[" + this.gameState.board[(num*i) + j] + "] " 
                }
            }
            ret_str += ("\n")
        }
        return ret_str

    }

    onMove = function(callback) {
        this.moves.push(callback)
    }

    onWin = function(callback) {
        this.wins.push(callback)
    }

    onLose = function(callback) {
        this.losses.push(callback)
    }

    getGameState = function() {
        return this.gameState
    }

}
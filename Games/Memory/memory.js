export default class memoryGame { 

    //board represents an array of sets of matching id's that are randomized on each new game --> id's will correspond to a photo 

    constructor() { 
        this.board = [];
        this.matched = [];
        this.won = false; 
        this.score = 0; 
        this.setUpNewGame(); 
    }


    setUpNewGame() { 
        //randomize the board 
        for (let i = 0; i < 6; i++) { 
            //pick a number 0 - 5: place that number randomly in the array twice 
            let randNumber = Math.floor(Math.random() * 6);

            while (this.board.includes(randNumber)) {
                //keep re-drawing until you find a number that's not in the board already 
                randNumber = Math.floor(Math.random() * 6); 
            }

            let ind1 = Math.floor(Math.random() * 12); 

            while (this.board[ind1] != null) {
                ind1 = Math.floor(Math.random() * 12); 
            }

            this.board[ind1] = randNumber;

            let ind2 = Math.floor(Math.random() * 12); 

            while (this.board[ind2] != null) {
                ind2 = Math.floor(Math.random() * 12); 
            }

            this.board[ind2] = randNumber;
        }

        for (let i = 0; i < 12; i++) {
            this.matched[i] = false;
        }
    }



    //you've won if you match all the cards --> 6 matches total 
    move(id1, id2) {
        //move takes in two indexes: these represent the cards you clicked on 
        if (this.board[id1] == this.board[id2]) {
            this.score += 1; 
            this.matched[id1] = true;
            this.matched[id2] = true;
        }

        //check if the user won after a move 
        if (this.score == 6) {
            this.won = true; 
        }
    }

    checkIfWon() {
        if (this.won == true) {
            return true;
        } else {
            return false;
        }
    }
}
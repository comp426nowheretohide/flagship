import memoryGame from './memory.js';

let game = new memoryGame();
let clicks = 0;
var firstMove;
let canClick = false;
let flips = 10;
let pString = `<p class="has-text-danger is-size-4">You've got ${flips} flips left.</p>`;
let idToken = sessionStorage.authToken;
let gameID = sessionStorage.gameId;
let currUser = sessionStorage.currentUser;
let base = sessionStorage.base;
let taskCompleted = false;

export const renderGameBoard = function (game) {
    return `
    <span id=board>
    ${pString}
    <div class=card-grid>
        <div class=card id=0>
            <div class=card-front id=${game.board[0]} value=0>
            </div>
            <div class=card-back id=${game.board[0]} index=0>
            </div>
        </div>
        <div class=card id=1>
            <div class=card-front id=${game.board[1]}>
            </div>
            <div class=card-back id=${game.board[1]}>
            </div>
        </div>
        <div class=card id=2>
            <div class=card-front id=${game.board[2]} index = 2>
            </div>
            <div class=card-back id=${game.board[2]} index = 2>
            </div>
        </div>
        <div class=card id=3>
            <div class=card-front id=${game.board[3]} index = 3>
            </div>
            <div class=card-back id=${game.board[3]} index = 3>
            </div>
        </div>
        <div class=card id=4>
            <div class=card-front id=${game.board[4]} index = 4>
            </div>
            <div class=card-back id=${game.board[4]} index = 4>
            </div>
        </div>
        <div class=card id=5>
            <div class=card-front id=${game.board[5]} index = 5>
            </div>
            <div class=card-back id=${game.board[5]} index = 5>
            </div>
        </div>
        <div class=card id=6>
            <div class=card-front id=${game.board[6]} index = 6>
            </div>
            <div class=card-back id=${game.board[6]} index = 6>
            </div>
        </div>
        <div class=card id=7>
            <div class=card-front id=${game.board[7]} index = 7>
            </div>
            <div class=card-back id=${game.board[7]} index = 7>
            </div>
        </div>
        <div class=card id=8>
            <div class=card-front id=${game.board[8]} index = 8 >
            </div>
            <div class=card-back id=${game.board[8]} index = 8>
            </div>
        </div>
        <div class=card id=9>
            <div class=card-front id=${game.board[9]}>
            </div>
            <div class=card-back id=${game.board[9]}>
            </div>
        </div>
        <div class=card id=10>
            <div class=card-front id=${game.board[10]}>
            </div>
            <div class=card-back id=${game.board[10]}>
            </div>
        </div>
        <div class=card id=11>
            <div class=card-front id=${game.board[11]}>
            </div>
            <div class=card-back id=${game.board[11]}>
            </div>
        </div>
    </div>
    </span>
    `
}

export const loadImages = function () {
    let im0 = `<img src="im0.jpg"></img>`;
    let im1 = `<img src="im1.jpg"></img>`;
    let im2 = `<img src="im2.gif"></img>`;
    let im3 = `<img src="im3.jpg"></img>`;
    let im4 = `<img src="im4.jpg"></img>`;
    let im5 = `<img src="im5.jpg"></img>`;

    var cards = document.getElementsByClassName("card-back");

    for (let i = 0; i < 12; i++) {
        if (cards[i].id == 0) {
            $(im0).appendTo(cards[i]);
        }
        if (cards[i].id == 1) {
            $(im1).appendTo(cards[i]);
        }
        if (cards[i].id == 2) {
            $(im2).appendTo(cards[i]);
        }
        if (cards[i].id == 3) {
            $(im3).appendTo(cards[i]);
        }
        if (cards[i].id == 4) {
            $(im4).appendTo(cards[i]);
        }
        if (cards[i].id == 5) {
            $(im5).appendTo(cards[i]);
        }
    }
}

export const showImages = function () {
    var cardFronts = document.getElementsByClassName("card-front");
    var cardBacks = document.getElementsByClassName("card-back");
    for (let i = 0; i < 12; i++) {
        cardFronts[i].innerHTML = cardBacks[i].innerHTML;
    }
}

export const showMatched = function () {
    var cardFronts = document.getElementsByClassName("card-front");
    var cardBacks = document.getElementsByClassName("card-back");

    for (let i = 0; i < 12; i++) {
        if (game.matched[i] == true) {
            cardFronts[i].innerHTML = cardBacks[i].innerHTML;
        }
    }
}

export const loadIntoDOM = function () {
    const $root = $('#root');

    let gameBoard = renderGameBoard(game);
    $(gameBoard).appendTo($root);

    loadImages();

    showImages();

    setTimeout(function onTick() {
        $("#board").replaceWith(renderGameBoard(game));
        loadImages();
        canClick = true;
    }, 8000)

    document.addEventListener('click', function (event) {
        var card = event.target.parentElement;
        let id = parseInt(card.id);

        if (!canClick || isNaN(id) || card.children[1] == undefined) {
            return;
        }

        //console.log('clicked');

        var cardFront = card.children[0];
        var cardBack = card.children[1];

        clicks++;

        if (clicks == 1) {
            firstMove = card;
            cardFront.innerHTML = cardBack.innerHTML;
        } else if (clicks == 2) {
            cardFront.innerHTML = cardBack.innerHTML;
            game.move(firstMove.id, card.id);
            clicks = 0;
            flips--;
            canClick = false;

            if (!game.checkIfWon()) {
                if (flips <= 0) {
                    pString = `<p class="has-text-danger is-size-4">You have no idea where you are. Task failed. </p>`;
                    //Send task failure to backend
                    sendTaskResult(currUser, gameID, 0);
                }
                else {
                    pString = `<p class="has-text-danger is-size-4">You've got ${flips} flips left.</p>`;
                }
            }

            setTimeout(function afterShowCard() {
                $("#board").replaceWith(renderGameBoard(game));
                loadImages();
                showMatched();
                canClick = true;
            }, 1000)

            setTimeout(function checkWin() {
                if (game.checkIfWon()) {
                    pString = `<p class="has-text-success is-size-4">You're on the right path! Task Completed!</p>`;
                    $("#board").replaceWith(renderGameBoard(game));
                    loadImages();
                    showMatched();
                    //Send successful result to backend
                    if(!taskCompleted){
                        sendTaskResult(currUser, gameID, 1);
                    }
                    taskCompleted = true;
                }
            }, 3000)
        }
    })
}


$(function () {
    loadIntoDOM();
});

let isPlayerAlive = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/alive/${gameID}/${currUser}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

let getAliveCrew = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameID}/aliveC`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

let getImposter = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameID}/aliveI`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

export async function sendTaskResult(name, gameID, score) {
    //score is 1 for success, 0 for failure
    const result = await axios({
        method: 'post',
        url: `${base}/minigame/${gameID}/${name}/${score}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
}

let time = 59;

let timerInterval = setInterval(function () {
    document.getElementById("time").innerHTML = time--;
}, 1000)

let getLastPlayerKilled = async function (id) {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameID}/lastKilled`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

setTimeout(async function () {
    clearInterval(timerInterval);
    setTimeout(() => {
        location.replace("../../VotingAndChat/index.html");
    }, 10000);
    let isAlive = await isPlayerAlive();
    $('body').empty();
    let message = $('<p style = "margin-top: 300px" class= "is-size-4"></p>');
    let imposterResult = await getImposter();
    let isLastKilled = await getLastPlayerKilled();
    if (!isAlive) {
        if(isLastKilled == currUser){
            message.addClass('has-text-danger');
            message.html(`You were stabbed to death by ${imposterResult}.`);
        }
    }
    else if(taskCompleted) {
        let random = Math.random();
        if (random > .5) {
            message.addClass('has-text-success');
            let alivePlayers = await getAliveCrew();
            let player1, player2;
            let random = Math.floor(Math.random() * alivePlayers.length);
            let random2 = random + 1;
            if (random == alivePlayers.length - 1) {
                random2 = alivePlayers.length - 2;
            }
            player1 = alivePlayers[random];
            player2 = alivePlayers[random2];
            let random3 = Math.random();
            if(random3 > .7){
                message.html(`The imposter is either ${imposterResult}, ${player1}, or ${player2}.`);
            }
            else if(random3 > .3){
                message.html(`The imposter is either ${player1}, ${imposterResult}, or ${player2}.`);
            }
            else {
                message.html(`The imposter is either ${player2}, ${player1}, or ${imposterResult}.`);
            }
        }
        else {
            message.html('No clues discovered.');
        }
    }
    else {
        message.addClass('has-text-danger');
        message.html('You failed your task.');
    }
    $('body').append(message);
}, 60000);


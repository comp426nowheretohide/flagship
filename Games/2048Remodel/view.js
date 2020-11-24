import Game from './engine/game.js'

let game = new Game(4)
let idToken = sessionStorage.authToken;
let gameID = sessionStorage.gameId;
let currUser = sessionStorage.currentUser;
let base = sessionStorage.base;

let taskCompleted = false;

const renderBoard = function () {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    let html = startNewGame()

    $root.append(html)

    fillBoard()

    $(document).keydown(function (event) {
        var key = event.keyCode
        if (key == '37') {
            game.move('left')
            fillBoard()
        } else if (key == '38') {
            game.move('up')
            fillBoard()
        } else if (key == '39') {
            game.move('right')
            fillBoard()
        } else if (key == '40') {
            game.move('down')
            fillBoard()
        }
    })

    game.onWin(function () {
        //  document.querySelector('.checker').style.color = "green";
        //  document.querySelector('.checker').innerHTML = "YOU WIN!!! YOU FOUND THE 256 TILE!"
        let checker = $('#checker');
        checker.empty();
        if (checker.hasClass('victory')) {
            checker.append(`<p class="is-size-4 has-text-success">Even more power!! Nice job!</p>`);
            return;
        }
        else {
            checker.addClass('victory');
            checker.append(`<p class="is-size-4 has-text-success">You've generated enough power for the engine! Task completed.</p>`);
            //send completed task to backend;
            taskCompleted = true;
            sendTaskResult(currUser, gameID, 1);
        }
    })

    game.onLose(function () {
        let checker = $('#checker');
        checker.empty();
        if (checker.hasClass('victory')) {
            checker.append(`<p class="is-size-4 has-text-danger">Sorry! You can reset for fun while you wait for the other crewmates.</p>`);
        }
        else {
            checker.append(`<p class="is-size-4 has-text-danger">Engine Failure. Manual Reboot (by reset) Required.</p>`);
        }
    })

    $root.on("click", ".reset", resetGame)

};

$(function () {
    renderBoard();
});

const resetGame = function () {
    game.setupNewGame()
    fillBoard()
    $('#checker').empty();
}

let time = 59;

const startNewGame = function () {
    let html = `<div class="container">
                    <h1 class="hero is-size-1">Engine</h1>
                    <h2 class="hero is-size-3">Power the ship by combining tiles and get the 256 tile to complete the task!</h2>
                    <p class="subtitle is-5">By using the arrow keys, you can move the tiles around the board. Numbers will combine when two numbers with the same value collide with each other!</p>
                    <h3 id="scoreCounter" class= "is-size-3 mb-3">0</h3>
                    <h5 id="time">59</h5>
                    </div>

                <div id="checker"></div>

                <div class="grid">
                    <div class="row">
                        <div class= "mt-2" id="zero"></div>
                        <div id="four"></div>
                        <div id="eight"></div>
                        <div id="twelve"></div>
                    </div>
                    <div class="row">
                        <div class= "mt-2" id="one"></div>
                        <div id="five"></div>
                        <div id="nine"></div>
                        <div id="thirteen"></div>
                    </div>
                    <div class="row">
                        <div class= "mt-2" id="two"></div>
                        <div id="six"></div>
                        <div id="ten"></div>
                        <div id="fourteen"></div>
                    </div>
                    <div class="row">
                        <div class= "mt-2" id="three"></div>
                        <div id="seven"></div>
                        <div id="eleven"></div>
                        <div id="fifteen"></div>
                    </div>
                </div>

                <div class="buttonContainer">
                    <button class="reset button">Reset Game</button>
                </div>`

    return html

}

const fillBoard = function () {

    let nums = [['zero', 'one', 'two', 'three'],
    ['four', 'five', 'six', 'seven'],
    ['eight', 'nine', 'ten', 'eleven'],
    ['twelve', 'thirteen', 'fourteen', 'fifteen']];

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            let associatedWord = nums[i][j]
            if (game.officialBoard[i][j] == 0) {
                document.getElementById(associatedWord).innerHTML = ''
            } else {
                document.getElementById(associatedWord).innerHTML = game.officialBoard[i][j]
            }
            document.getElementById('scoreCounter').innerHTML = `Power : ${game.gameState.score}`;
        }
    }
}

let sendTaskResult = async function (name, id, score) {
    //score is 1 for success, 0 for failure
    const result = await axios({
        method: 'post',
        url: `${base}/minigame/${id}/${name}/${score}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
}

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

let getMinigame = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameID}/minigame`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

let getPlayer = async function (id) {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameID}/user${id}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

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

let timerInterval = setInterval(function () {
    document.getElementById("time").innerHTML = time--;
}, 1000)

setTimeout(async function () {
    clearInterval(timerInterval);
    setTimeout(()=>{
        location.replace("../../VotingAndChat/index.html");
    }, 10000);
    let isAlive = await isPlayerAlive();
    let isLastKilled = await getLastPlayerKilled();
    $('body').empty();
    let message = $('<p style = "margin-top: 300px" class= "is-size-4"></p>');
    if (!isAlive) {
        if(isLastKilled == currUser){
            let imposterResult = await getImposter();
            message.addClass('has-text-danger');
            message.html(`You were stabbed to death by ${imposterResult}.`);
        }
    }
    else if(taskCompleted) {
        let random = Math.random();
        if (random > .5) {
            message.addClass('has-text-success');
            let playersMinigamesCompleted = await getMinigame();
            let randomIndex = Math.floor(Math.random() * playersMinigamesCompleted.length);
            let player = await getPlayer(randomIndex + 1);
            if (playersMinigamesCompleted[randomIndex] == 1) {
                message.html(`Clue: ${player} completed their task.`);
            }
            else {
                message.html(`Clue: ${player} did not complete a task.`);
            }
        }
        else{
            message.html('No clues discovered.');
        }
    }
    else {
        message.addClass('has-text-danger');
        message.html('You failed your task.');
    }
    $('body').append(message);

}, 60000);
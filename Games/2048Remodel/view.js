import Game from './engine/game.js'

let game = new Game(4)

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
        }
    })

    game.onLose(function () {
        // document.querySelector('.checker').style.color = "red";
        // document.querySelector('.checker').innerHTML = "You Lose! You should try again by hitting the 'Reset Game' button."
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

const startNewGame = function () {

    let html = `<div class="container">
                    <h1 class="hero is-size-1">Engine</h1>
                    <h2 class="hero is-size-3">Power the ship by combining tiles and get the 256 tile to complete the task!</h2>
                    <p class="subtitle is-5">By using the arrow keys, you can move the tiles around the board. Numbers will combine when two numbers with the same value collide with each other!</p>
                    <h3 id="scoreCounter" class= "is-size-3 mb-3">0</h3>
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
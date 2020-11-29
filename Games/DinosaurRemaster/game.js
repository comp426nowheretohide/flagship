const ship = $('#spaceship');
const asteroids = $('#asteroids');

let timeInterval = 1000;
let speed = 950;

let lives = 5;

let time = 59;

let taskCompleted = false;

let animate = (animation) => {
    if (document.getElementById('spaceship').classList.length === 0) {
        ship.addClass(animation);
        setTimeout(() => {
            ship.removeClass(animation);
        }, 500);
    }
}

const generateAsteroid = (num)=>{
    let asteroid = $(`<div id = "asteroid"></div>`);
    let randomHeight = Math.random();
    if(randomHeight > .8){
        asteroid.css('top','-40px');
    }
    else if(randomHeight > .6){
        asteroid.css('top','225px');
    }
    let randomSize = 100 + Math.random() * 25;
    asteroid.css({"width":`${randomSize}px`, "height":`${randomSize}px`,"background-size":`${randomSize}px ${randomSize}px`});
    let randomRot = 360 * Math.random();
    asteroid.css('transform',`rotate(${randomRot}deg)`);
    asteroids.append(asteroid);
    setTimeout(()=>{
        asteroid.remove();
    }, speed);

    if(num === 2){
        let newAsteroid = $(`<div id = "asteroid2"></div>`);
        if(randomHeight > .8){
            newAsteroid.css('top',`${ship.position().top + 125}`);
        }
        else if(randomHeight > .6){
            newAsteroid.css('top', `${ship.position().top}`);
        }
        else {
            newAsteroid.css('top', `${ship.position().top - 125}`);
        }
        newAsteroid.css('left', `1200px`);
        randomSize = 100 + Math.random() * 15;
        newAsteroid.css({"width":`${randomSize}px`, "height":`${randomSize}px`,"background-size":`${randomSize}px ${randomSize}px`});
        randomRot = 360 * Math.random();
        newAsteroid.css('transform',`rotate(${randomRot}deg)`);
        asteroids.append(newAsteroid);
        setTimeout(()=>{
            newAsteroid.remove();
        }, speed);
    }
};

let generateAsteroids = () =>{
    asteroids.empty();
    let numAsteroids = Math.random();
    if(numAsteroids > .75){
        generateAsteroid(2);
    }
    else{
        generateAsteroid(1);
    }
}

let runGame = setInterval(generateAsteroids, timeInterval);

let isAlive = setInterval(()=>{
    let asteroid = $('#asteroid');
    let shipTop = parseInt(ship.css('top'));
    let asteroidLeft = parseInt(asteroid.css('left'));
    let asteroidTop = parseInt(asteroid.css('top'));
    let asteroidBottom = parseInt(asteroid.css('top')) + parseInt(asteroid.css('height'));

    let asteroidCollision = asteroidLeft < 125 && asteroidLeft > 10 && shipTop < asteroidBottom && shipTop + 50 > asteroidTop;

    let asteroid2collision = false;
    if($('#asteroid2') != null){
        let asteroid2 = $('#asteroid2');
        shipTop = ship.position().top;
        let asteroid2Left = parseInt(asteroid2.css('left'));
        let asteroid2Top = parseInt(asteroid2.css('top'));
        let asteroid2Bottom = parseInt(asteroid2.css('top')) + parseInt(asteroid2.css('height'));
        asteroid2collision = asteroid2Left < 425 && asteroid2Left > 10 && shipTop < asteroid2Bottom && shipTop + 50> asteroid2Top;
    }

    if(asteroidCollision || (asteroid2collision)){
        lives --;
        if(lives <= 0){
            $('p').html('Ship critically damaged! Task Failed.');
        }
        else{
            $('p').html(`You crashed the ship into an asteroid! ${lives} lives left.`);
            setTimeout(restart, 2000);
        }
        $('#asteroid').remove();
        $('#asteroid2').remove();
        clearInterval(runGame);
    }
}, 10);

let restart = () =>{
    runGame = setInterval(generateAsteroids, timeInterval);
}

document.addEventListener('keydown', (evt) => {
    if(evt.key === 'ArrowDown'){
        animate('down');
    }
    else if (evt.key === 'ArrowUp'){
        animate('up');
    }
});

let idToken = sessionStorage.authToken;
let gameID = sessionStorage.gameId;
let currUser = sessionStorage.currentUser;
let base = sessionStorage.base;

let sendTaskResult = async function(name, gameID, score){
    //score is 1 for success, 0 for failure
    const result = await axios({
        method: 'post', 
        url:`${base}/minigame/${gameID}/${name}/${score}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result;

}

const returnToLobby = function() {
    location.replace("../../SpaceshipRooms/index.html")
}

setTimeout(function(){
    if(lives > 0){
        taskCompleted = true;
        sendTaskResult(currUser, gameID, 1);
        $('p').removeClass('has-text-danger');
        $('p').addClass('has-text-success');
        $('p').html('Task Completed');
    }
}, 59000)

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

let getRooms = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameID}/rooms`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

let timerInterval = setInterval(function() {
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

setTimeout(async function() {
    clearInterval(timerInterval);
    setTimeout(()=>{
        location.replace("../../VotingAndChat/index.html");
    }, 10000);
    let isAlive = await isPlayerAlive();
    $('body').empty();
    let message = $('<p style = "margin-top: 300px" class= "is-size-4"></p>');
    let imposterResult = await getImposter();
    let isLastKilled = await getLastPlayerKilled();
    $('body').empty();
    message = $('<p style = "margin-top: 300px" class= "is-size-4"></p>');
    if (!isAlive) {
        if(isLastKilled == currUser){
            message.addClass('has-text-danger');
            message.html(`You were stabbed to death by ${imposterResult}.`);
        }
    }
    else if(taskCompleted) {
        let random = Math.random();
        if (random > .3) {
            message.addClass('has-text-success');
            let playersRooms = await getRooms();
            for(let i = 0; i < 6; i++){
                let player = await getPlayer(i+1);
                if(player == imposterResult){
                    message.html(`Clue: The imposter was in the ${playersRooms[i]}`);
                }
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


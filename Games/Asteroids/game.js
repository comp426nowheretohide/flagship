const asteroids = $('#asteroids');

let speed = 1500;
let count = 0;

let idToken = sessionStorage.authToken;
let gameID = sessionStorage.gameId;
let currUser = sessionStorage.currentUser;
let base = sessionStorage.base;

let taskCompleted = false;

$(document).ready(() => {
    asteroids.on('click', () => {
        count++;
        if (count >= 20 && !taskCompleted){
            $('p').removeClass('has-text-danger');
            $('p').addClass('has-text-success');
            $('p').html('Task completed successfully');

            //send task completed to backend
            taskCompleted = true;
            sendTaskResult(currUser, gameID, 1);
        }
        else {
            $('#count').html(`${count} out of 20 asteroids shot.`);
        }
        $('.asteroid').remove();
    })
})

const returnToLobby = function() {
    location.replace("../../SpaceshipRooms/index.html")
}

const generateAsteroid = (num) => {
    let asteroid = $(`<div class = "asteroid"></div>`);
    let random = Math.random();
    if (random > .5) {
        if(random > .75){
            asteroid.addClass('right');
        }
        else{
            asteroid.addClass('left');
        }
        speed = 1500;
        if (random > .8) {
            asteroid.css('top', '0px');
        }
        else if (random > .6) {
            asteroid.css('top', '225px');
        }
    }
    else {
        if(random > .25){
            asteroid.addClass('down');
        }
        else{
            asteroid.addClass('up');
        }
        asteroid.css('left', `${random * 1400}px`);
        speed = 1250;
    }
    let randomSize = 115 + Math.random() * 25;
    asteroid.css({ "width": `${randomSize}px`, "height": `${randomSize}px`, "background-size": `${randomSize}px ${randomSize}px` });
    let randomRot = 360 * Math.random();
    asteroid.css('transform', `rotate(${randomRot}deg)`);
    asteroids.append(asteroid);
    setTimeout(() => {
        asteroid.remove();
    }, speed);

};

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


let runGame = setInterval(generateAsteroid, speed + 50);

let time = 59

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
        if(random > .7){
            let playersRooms = await getRooms();
            let randomIndex = Math.floor(Math.random() * playersRooms.length);
            let player = await getPlayer(randomIndex + 1);
            let room = playersRooms[randomIndex];
            message.addClass('has-text-success');
            message.html(`Clue: ${player} went in the ${room}.`);
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

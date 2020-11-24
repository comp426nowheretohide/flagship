const asteroids = $('#asteroids');

document.body.style.cursor = 'Asteroid.png';

let speed = 1500;
let count = 0;
let idToken = sessionStorage.authToken;
let currUser = sessionStorage.currentUser;

$(document).ready(() => {
    asteroids.on('click', () => {
        count++;
        if (count >= 20){
            $('p').removeClass('has-text-danger');
            $('p').addClass('has-text-success');
            $('p').html('Task completed successfully');

            //send task completed to backend
            sendTaskResult(currUser, idToken, 1);
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

let base = '';

let sendTaskResult = async function(name, gameID, score){
    //score is 1 for success, 0 for failure
    const result = await axios({
        method: 'post', 
        url:`${base}/minigame/${gameID}/${name}/${score}`,
        headers: {
            authorization: `bearer ${gameID}`,
        }, 
        withCredentials: true
    })
}

let runGame = setInterval(generateAsteroid, speed + 50);

let time = 59

setTimeout(function() {
    location.replace("../../VotingAndChat/index.html")
}, 60000);

setInterval(function() {
    document.getElementById("time").innerHTML = time--;
}, 1000)

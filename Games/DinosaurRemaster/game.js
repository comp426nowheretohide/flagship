const ship = $('#spaceship');
const asteroids = $('#asteroids');

let timeInterval = 1000;
let speed = 950;

let lives = 3;

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
    if(numAsteroids > .7){
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
        }
        $('#asteroid').remove();
        $('#asteroid2').remove();
        clearInterval(runGame);
        setTimeout(restart, 2000);
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


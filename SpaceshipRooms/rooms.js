let display = $('#display');
let columns = $('<div class = "columns is-multiline justify-center"></div>');

let idToken = sessionStorage.authToken;
let gameID = sessionStorage.gameId;
let currUser = sessionStorage.currentUser;
let gameBase = sessionStorage.base;
let time = 29;

let chosenRoom = ''


let createRoom = (name) => {
    let box = $(`<div class = "box has-text-centered"></box>`);
    box.css('height', '250px');
    box.css('margin-top', '40px');
    let roomName = $(`<h1 class= "hero is-centered">${name}</name>`);
    box.append(roomName);
    //This is where we would display how many players are in the room
    //box.append(`<h4 style = "font-size: 75px" class= "mb-4" id="${name}Count">0</h4>`);
    let enterButton = $(`<button class = "button is-dark enter" id="${name}">Enter</button>`);
    enterButton.on('click', (event) => {
        //send choice to backend and update the number with new total of players from backend;
        $('.enter').remove();
        if (event.currentTarget.id == "Electrical") {
            chosenRoom = "Electrical"
            chooseRoom("Electrical");
            // location.replace("../Games/TriviaGame/index.html");
        } else if (event.currentTarget.id == "Engine") {
            chosenRoom = "Engine"
            chooseRoom("Engine");
            // location.replace("../Games/2048Remodel/index.html");
        } else if (event.currentTarget.id == "Cafeteria") {
            chosenRoom = "Cafeteria"
            chooseRoom("Cafeteria");
            // location.replace("../Games/Snake/index.html");
        } else if (event.currentTarget.id == "Observatory") {
            chosenRoom = "Observatory"
            chooseRoom("Observatory");
            // location.replace("../Games/Memory/index.html");
        } else if (event.currentTarget.id == "Cockpit") {
            chosenRoom = "Cockpit"
            chooseRoom("Cockpit");
            // location.replace("../Games/DinosaurRemaster/index.html");
        } else if (event.currentTarget.id == "Defense") {
            chosenRoom = "Defense"
            chooseRoom("Defense");
            // location.replace("../Games/Asteroids/index.html");
        }
    });
    box.append(enterButton);

    return box;
}

let createColumn = (name1, name2) => {
    let column = $(`<div class = "column content"></div>`);
    column.append(createRoom(name1));
    column.append(createRoom(name2));
    return column;
}

let chooseRoom = async function (roomName) {
    const result = await axios({
        method: 'put',
        url: `${gameBase}/room/${gameID}/${currUser}/${roomName}`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true,
    })
    console.log(result.data)
    return result;
}

let getRooms = async function () {
    const result = await axios({
        method: 'get',
        url: `${gameBase}/games/${gameID}/rooms`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}
/*
let getTotals = async function() {
    let rooms = await getRooms();
    let countedRooms = rooms.reduce(function (allRooms, room) { 
        if (room in allRooms) {
          allRooms[room]++;
        }
        else {
          allRooms[room] = 0;
        }
        return allRooms;
    });

    $('#ElectricalCount').html(`${countedRooms['Electrical']}`);
    $('#EngineCount').html(`${countedRooms['Engine']}`);
    $('#CafeteriaCount').html(`${countedRooms['Cafeteria']}`);
    $('#ObservatoryCount').html(`${countedRooms['Observatory']}`);
    $('#CockpitCount').html(`${countedRooms['Cockpit']}`);
    $('#DefenseCount').html(`${countedRooms['Defense']}`);

}

setInterval(async ()=>{
    await getTotals();
}, 2000);*/

//I'm thinking :
//Observatory: Memory
//Cafeteria: Snake Game
//Cockpit: "DinosaurRemaster" - Piloting the Ship
//Defense: Asteroids
//Electrical: Math Trivia
//Engine: 2048 
columns.append(createColumn('Electrical', 'Engine'));
columns.append(createColumn('Cafeteria', 'Observatory'));
columns.append(createColumn('Cockpit', 'Defense'));
display.append(columns);

let getImposter = async function () {
    const result = await axios({
        method: 'get',
        url: `${gameBase}/games/${gameID}/aliveI`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

let isPlayerAlive = async function () {
    const result = await axios({
        method: 'get',
        url: `${gameBase}/alive/${gameID}/${currUser}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

async function getWinner() {
    try{
        const result = await axios({
            method: 'get',
            url: `${gameBase}/games/${gameID}/won`,
            headers: {
                authorization: `bearer ${idToken}`
            },
            withCredentials: true,
        })
        console.log(result.data)
        if(result.data != "false") {
            location.replace('../Victory/index.html')
        }
    }
    catch(e){
        //show error
    }
}

getWinner()

setTimeout(async function () {
    let imposter = await getImposter();
    let isAlive = await isPlayerAlive();
    if(!isAlive){
        location.replace("../Dead/index.html");
    } else if (imposter == currUser) {
        location.replace("../ImposterRoom/index.html");
    } else if (chosenRoom == "Electrical") {
        location.replace("../Games/TriviaGame/index.html");
    } else if (chosenRoom == "Engine") {
        location.replace("../Games/2048Remodel/index.html");
    } else if (chosenRoom == "Cafeteria") {
        location.replace("../Games/Snake/index.html");
    } else if (chosenRoom == "Observatory") {
        location.replace("../Games/Memory/index.html");
    } else if (chosenRoom == "Cockpit") {
        location.replace("../Games/DinosaurRemaster/index.html");
    } else if (chosenRoom == "Defense") {
        location.replace("../Games/Asteroids/index.html");
    } else {
        let random = Math.floor(Math.random() * 6);
        switch (random) {
            case 0:
                location.replace("../Games/DinosaurRemaster/index.html");
                break;
            case 1:
                location.replace("../Games/TriviaGame/index.html");
                break;
            case 2: 
                location.replace("../Games/2048Remodel/index.html");
                break;
            case 3: 
                location.replace("../Games/Snake/index.html");
                break;
            case 4: 
                location.replace("../Games/Memory/index.html");
                break;
            case 5:
                location.replace("../Games/Asteroids/index.html");
                break;
        }
    }
}, 30000)

setInterval(function () {
    document.getElementById("time").innerHTML = time--;
}, 1000)
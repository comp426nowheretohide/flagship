let display = $('#display');
let columns = $('<div class = "columns is-multiline justify-center"></div>');

let idToken = sessionStorage.authToken;
let gameID = sessionStorage.gameID;
let currUser = sessionStorage.currentUser;
let gameBase = sessionStorage.base;

let createRoom = (name) => {
    let box = $(`<div class = "box has-text-centered"></box>`);
    box.css('height', '250px');
    box.css('margin-top', '40px');
    let roomName = $(`<h1 class= "hero is-centered">${name}</name>`);
    box.append(roomName);
    //This is where we would display how many players are in the room
    box.append(`<h4 style = "font-size: 75px" class= "mb-4" id="${name}">0</h6>`);
    let enterButton = $(`<button class = "button is-dark enter" id="${name}">Enter</button>`);
    enterButton.on('click', (event) => {
        //send choice to backend and update the number with new total of players from backend;
        $('.enter').remove();
        if(event.currentTarget.id == "Electrical") {
            chooseRoom("Electrical");
            //location.replace("../Games/TriviaGame/index.html");
        } else if(event.currentTarget.id == "Engine") {
            chooseRoom("Engine");
            //location.replace("../Games/2048Remodel/index.html");
        } else if(event.currentTarget.id == "Cafeteria") {
            chooseRoom("Cafeteria");
            //location.replace("../Games/Snake/index.html");
        } else if(event.currentTarget.id == "Observatory") {
            chooseRoom("Observatory");
            //location.replace("../Games/Memory/index.html");
        } else if(event.currentTarget.id == "Cockpit") {
            chooseRoom("Cockpit");
            //location.replace("../Games/DinosaurRemaster/index.html");
        } else if(event.currentTarget.id == "Defense") {
            chooseRoom("Defense");
            //location.replace("../Games/Asteroids/index.html");
        }
    });
    box.append(enterButton);
    
    return box;
}

let createColumn = (name1, name2) =>{
    let column = $(`<div class = "column content"></div>`);
    column.append(createRoom(name1));
    column.append(createRoom(name2));
    return column;
}

let base = '';

let chooseRoom = async function(roomName){
    const result = await axios({
        method: 'put',
        url: `${gameBase}/room/${gameId}/${currUser}/${roomName}`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true,
    })
    console.log(result.data);
    return result;
}

//I'm thinking :
//Observatory: Memory
//Cafeteria: Snake Game
//Cockpit: "DinosaurRemaster" - Piloting the Ship
//Defense: Asteroids
//Electrical: Math Trivia
//Engine: 2048 
columns.append(createColumn('Electrical','Engine'));
columns.append(createColumn('Cafeteria', 'Observatory'));
columns.append(createColumn('Cockpit','Defense'));
display.append(columns);
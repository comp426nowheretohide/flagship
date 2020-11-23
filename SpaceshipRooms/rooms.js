let display = $('#display');
let columns = $('<div class = "columns is-multiline justify-center"></div>');

let createRoom = (name) => {
    let box = $(`<div class = "box has-text-centered"></box>`);
    box.css('height', '250px');
    box.css('margin-top', '40px');
    let roomName = $(`<h1 class= "hero is-centered">${name}</name>`);
    box.append(roomName);
    //This is where we would display how many players are in the room
    box.append(`<h4 style = "font-size: 75px" class= "mb-4" id="${name}">0</h6>`);
    let enterButton = $(`<button class = "button is-dark enter" id="${name}">Enter</button>`);
    enterButton.on('click', (event)=>{
        //send choice to backend and update the number with new total of players from backend;
        $('.enter').remove();
        if(event.currentTarget.id == "Electrical") {
            console.log("Electrical")
            location.replace("../Games/TriviaGame/index.html")
        } else if(event.currentTarget.id == "Engine") {
            console.log("Engine")
            location.replace("../Games/2048Remodel/index.html")
        } else if(event.currentTarget.id == "Cafeteria") {
            console.log("Cafeteria")
            location.replace("../Games/Snake/index.html")
        } else if(event.currentTarget.id == "Observatory") {
            console.log("Observatory")
            location.replace("../Games/Memory/index.html")
        } else if(event.currentTarget.id == "Cockpit") {
            console.log("Cockpit")
            location.replace("../Games/DinosaurRemaster/index.html")
        } else if(event.currentTarget.id == "Defense") {
            console.log("Defense")
            location.replace("../Games/Asteroids/index.html")
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

let chooseRoom = async function(player, gameID, roomName){
    const result = await axios({
        method: 'put', 
        url:`${base}/room/${gameID}/${player}/${roomName}`
    })
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
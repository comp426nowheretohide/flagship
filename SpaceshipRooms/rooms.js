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
    let enterButton = $(`<button class = "button is-dark enter">Enter</button>`);
    enterButton.on('click', ()=>{
        //send choice to backend and update the number with new total of players from backend;
        $('.enter').remove();
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

let voteButtonsActive = false;

$('.container').prepend('<h2 class="hero is-size-3 has-text-danger">But you have more sinister plans...</h2>');

let room = 'test-room'; //Get the room the imposter is in from the backend
$('.container').prepend(`<h1 class="hero is-size-1 mb-2">${room}</h1>`);

$('#square').append('<p class = "is-size-4 has-text-danger mb-3">You may choose someone in the room with you to kill.</p>');


let createPeopleBox = (name) =>{
    let box = $(`<div class = "box player" id= "${name}"></div>`);
    let field = $(`<div class = "field level"></div>`);
    let p = $(`<p id = "#p${name}">${name}</p>`);
    let btns = $('<div class = "buttons level-right"></div>');
    field.append(p);
    field.append($(`<button class = "button is-small" style = "visibility:hidden"></button>`));
    field.append($(`<button class = "button is-small" style = "visibility:hidden"></button>`));
    box.append(field);
    field.append(btns);
    box.on('click', ()=>{
        if(!voteButtonsActive){
            let voteBtn = $('<button class="button is-success is-inline is-small level-item">✔</button>');
            let cancelBtn = $('<button class="button is-danger is-inline is-small level-item">✘</button>');
            voteBtn.on('click',()=>{
                //kill the player
                btns.empty();
            })
            cancelBtn.on('click',()=>{
                btns.empty();
                setTimeout(()=> voteButtonsActive = false, 10);
            })
            btns.append(voteBtn);
            btns.append(cancelBtn);
            voteButtonsActive = true;
        }
    })
    return box;
}

let createPeopleBoxes = () =>{
    let column = $('<div class = "column">');
    //access the backend and get the names of the players is in the room 
    //EXAMPLE: 
    column.append(createPeopleBox("Shane"));
    return column;
}

$('.columns').append(createPeopleBoxes());
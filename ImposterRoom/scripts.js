
let voteButtonsActive = false;

let idToken = sessionStorage.authToken;
let gameID = sessionStorage.gameId;
let currUser = sessionStorage.currentUser;
let base = sessionStorage.base;

$('.container').prepend('<h2 class="hero is-size-3 has-text-danger">But you have more sinister plans...</h2>');

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

let playersRooms = null; 
let imposterRoom = null;

let getImposterRoom = async () => {
    playersRooms = await getRooms();
    for (let i = 0; i < 6; i++) {
        let player = await getPlayer(i + 1);
        if (player == currUser) {
            imposterRoom = playersRooms[i];
        }
    }
}

let createHeader = async ()=>{
    await getImposterRoom();
    $('.container').prepend(`<h1 class="hero is-size-1 mb-2">${imposterRoom}</h1>`);
}

$('#square').append('<p class = "is-size-4 has-text-danger mb-3">You may choose someone in the room with you to kill.</p>');

let createPeopleBox = (name) => {
    let box = $(`<div class = "box player" id= "${name}"></div>`);
    let field = $(`<div class = "field level"></div>`);
    let p = $(`<p id = "#p${name}">${name}</p>`);
    let btns = $('<div class = "buttons level-right"></div>');
    field.append(p);
    field.append($(`<button class = "button is-small" style = "visibility:hidden"></button>`));
    field.append($(`<button class = "button is-small" style = "visibility:hidden"></button>`));
    box.append(field);
    field.append(btns);
    box.on('click', () => {
        if (!voteButtonsActive) {
            let voteBtn = $('<button class="button is-success is-inline is-small level-item">✔</button>');
            let cancelBtn = $('<button class="button is-danger is-inline is-small level-item">✘</button>');
            voteBtn.on('click', () => {
                //kill the player
                killPlayer(name);
                btns.empty();
            })
            cancelBtn.on('click', () => {
                btns.empty();
                setTimeout(() => voteButtonsActive = false, 10);
            }) 
            btns.append(voteBtn);
            btns.append(cancelBtn);
            voteButtonsActive = true;
        }
    })
    return box;
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

let createPeopleBoxes = async () => {
    let column = $('<div class = "column">');
    //access the backend and get the names of the players is in the room 
    //EXAMPLE: 
    //column.append(createPeopleBox("Shane"));
    for(let i = 0; i < playersRooms.length; i++){
        if(playersRooms[i] == imposterRoom){
            let name = await getPlayer(i);
            column.append(createPeopleBox(name));
        }
    }
    return column;
}

let killPlayer = async function (player, gameID) {
    const result = await axios({
        method: 'post',
        url: `${base}/kill/${gameID}/${player}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result;
}

let time = 69;
let timerInterval = setInterval(function () {
    document.getElementById("time").innerHTML = time--;
}, 1000)

setTimeout(()=>{
    location.replace("../../VotingAndChat/index.html");
}, 70000)

$('.columns').append(createPeopleBoxes());
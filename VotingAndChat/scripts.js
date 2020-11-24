let gameId = sessionStorage.gameId;
let idToken = sessionStorage.authToken;
let base = sessionStorage.base;
let currUser = sessionStorage.currUser;

let voteButtonsActive = false;

let createPeopleBox = (vote) =>{
    let box = $(`<div class = "box player" id= "${vote}"></div>`);
    let field = $(`<div class = "field level"></div>`);
    let p = $(`<p id = "#p${vote}">${vote}</p>`);
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
                //send vote to backend                

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

let base = '';

let votePlayer = async function(votedFor){
    const result = await axios({
        method: 'put',
        url: `${base}/vote/${gameId}/${currUser}/${votedFor}`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true,
    })
    return result;
}

//should return an array of living players (to be added to the boxes)
let getAlivePlayers = async function() {
    const result = await axios({
        method: 'get',
        url: `${base}/alive/${gameId}`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true,
    })
    return result;
}

//initiates ejection process
let ejectPlayer = async function() {
    const result = await axios ({
        method: 'post', 
        url: `${base}/eject/${gameId}`,
        headers: {
            authorization: `bearer ${idToken}`
        }, 
        withCredentials: true,
    })
    return result;
}

//should return 'false' for no winner, 'crew' if crew won, and 'imposter' if imposter won
let checkIfWon = async function() {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameId}/vote`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true,
    })
    return result.data.won; 
}

let createPeopleBoxes = (x) =>{
    let column = $('<div class = "column">');
    column.append(createPeopleBox(1+x));
    column.append(createPeopleBox(3+x));
    column.append(createPeopleBox(5+x));
    return column;
}

$('.columns').append(createPeopleBoxes(0));
$('.columns').append(createPeopleBoxes(1));



let createChatBox = (name, text) =>{
    let box = $(`<div class = "box message mb-4"></div>`);
    let user = $(`<p><strong>${name}</strong></p>`);
    let message = $(`<p>${text}</p>`);
    box.append(user);
    box.append(message);
    return box;
}

let chat = $(`<div class = "level" id = "chat"><div>`);
let textBox = $("<textarea style = 'width: 775px' class = 'textarea column level-item' rows = '2'></textarea>");
let sendButton = $(`<button class = "button column level-item ml-2 is-info">></button>`);
chat.append(textBox);
chat.append(sendButton);
$('#square').append(chat);

//Max chats onscreen at one time = 4
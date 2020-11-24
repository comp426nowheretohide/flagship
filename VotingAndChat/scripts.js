let gameId = sessionStorage.gameId;
let idToken = sessionStorage.authToken;
let base = sessionStorage.base;
let currUser = sessionStorage.currUser;

let voteButtonsActive = false;

let createPeopleBox = async (vote) => {
    console.log('peopleBox called');
    let box = $(`<div class = "box player" id= "${vote}"></div>`);
    let field = $(`<div class = "field level"></div>`);
    let p = $(`<p id = "#p${vote}">${vote}</p>`);
    let btns = $('<div class = "buttons level-right"></div>');
    let isAlive = await isPlayerAlive(vote);
    field.append(p);
    box.append(field);
    if (!isAlive) {
        p.addClass('has-text-danger');
    }
    else {
        field.append($(`<button class = "button is-small" style = "visibility:hidden"></button>`));
        field.append($(`<button class = "button is-small" style = "visibility:hidden"></button>`));
        field.append(btns);
        box.on('click', () => {
            if (!voteButtonsActive) {
                let voteBtn = $('<button class="button is-success is-inline is-small level-item">✔</button>');
                let cancelBtn = $('<button class="button is-danger is-inline is-small level-item">✘</button>');
                voteBtn.on('click', () => {
                    //send vote to backend                
                    votePlayer(vote);
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
    }
    return box;
}

let votePlayer = async function (votedFor) {
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
/*
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
}*/

let beginEjection = async function () {
    let theHost = await host();
    setTimeout(async () => {
        $('body').empty();
        let message = $('<p style = "margin-top: 300px" class= "is-size-4"></p>');
        let ejectedPlayer = await lastEjected();
        if (ejectedPlayer == '') {
            message.html('No one was ejected.');
        }
        else {
            message.html(`${ejectedPlayer} was ejected.`);
        }
        $('body').append(message);
        let gameWon = await checkIfWon();
        setTimeout(() => {
            if (gameWon == "false") {
                location.replace('../SpaceshipRooms/index.html');
            }
            else {
                location.replace('../Victory/index.html');
            }
        }, 5000);
    }, 2000)
    if (theHost == currUser) {
        await ejectPlayer();
    }
}

//initiates ejection process
let ejectPlayer = async function () {
    const result = await axios({
        method: 'post',
        url: `${base}/eject/${gameId}`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true,
    })
    return result;
}

let lastEjected = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameId}/lastEjected`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true
    })
    return result.data;
}

let host = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameId}/user1`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true
    })
    return result.data;
}

//should return 'false' for no winner, 'crew' if crew won, and 'imposter' if imposter won
let checkIfWon = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameId}/won`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true,
    })
    return result.data;
}

let getPlayer = async function (id) {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameId}/user${id}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    console.log(result.data);
    return result.data;
}

let createPeopleBoxes = async (x1, x2, x3) => {
    let column = $('<div class = "column">');
    column.append(await createPeopleBox(x1));
    column.append(await createPeopleBox(x2));
    column.append(await createPeopleBox(x3));
    return column;
}

let createPlayerBoxes = async () => {
    console.log('before');
    let column1 = createPeopleBoxes(await getPlayer(1), await getPlayer(2), await getPlayer(3));
    let column2 = createPeopleBoxes(await getPlayer(4), await getPlayer(5), await getPlayer(6));
    console.log('after');
    $('.columns').append(column1);
    $('.columns').append(column2);
}

createPlayerBoxes();

let getVotes = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameId}/vote`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true
    })
    return result.data;
}

let isPlayerAlive = async function (name) {
    const result = await axios({
        method: 'get',
        url: `${base}/alive/${gameId}/${name}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

let time = 60;

let timerInterval = setInterval(function () {
    time--;
    $('#time').html(`${time}`);
}, 1000);

setTimeout(async () => {
    voteButtonsActive = false;
    clearInterval(timerInterval);
    let votes = await getVotes();
    for (let i = 0; i < votes.length; i++) {
        let player = await getPlayer(i);
        $(`#p${player}`).html(`${player} voted for ${votes[i]}.`);
    }
    setTimeout(() => {
        beginEjection();
    }, 3000);
}, 60000);


/*

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

//Max chats onscreen at one time = 4*/
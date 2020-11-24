let gameId = sessionStorage.gameId;
let idToken = sessionStorage.authToken;
let base = sessionStorage.base;
let currUser = sessionStorage.currentUser;

let voteButtonsActive = false;

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

let currUserAlive = null;
let setCurrUserAlive = async () => {
    currUserAlive = await isPlayerAlive(currUser);
}
setCurrUserAlive();

let createPeopleBox = async (vote) => {
    let box = $(`<div class = "box player" id= "${vote}"></div>`);
    let field = $(`<div class = "field level"></div>`);
    let p = $(`<p id = "p${vote}">${vote}</p>`);
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
            if (!voteButtonsActive && currUserAlive) {
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
    if (theHost == currUser) {
        await ejectPlayer();
    }
    setTimeout(async () => {
        $('body').empty();
        let message = $('<p style = "margin-top: 300px" class= "is-size-4"></p>');
        //let ejectedPlayer = await lastEjected();
        //if (ejectedPlayer == '') {
        //    message.html('No one was ejected.');
        //}
        //else {
        //    message.html(`${ejectedPlayer} was ejected.`);
        //}
        //$('body').append(message);
        let res = await generateNewRound();
        $('body').append(message);
        setTimeout(async () => {
            location.replace('../SpaceshipRooms/index.html');
        }, 2000);
    }, 3000)
}

let generateNewRound = async function () {
    const result = await axios({
        method: "POST",
        url: `${base}/newRound/${gameId}/${currUser}`,
        headers: {
            authorization: `bearer ${idToken}`
        },
        withCredentials: true,
    })
    return result;
}

//initiates ejection process
let ejectPlayer = async function () {
    const result = await axios({
        method: 'post',
        url: `${base}/eject/${gameId}/${currUser}`,
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
    let player1 = await getPlayer(1);
    let player2 = await getPlayer(2);
    let player3 = await getPlayer(3);
    let player4 = await getPlayer(4);
    let player5 = await getPlayer(5);
    let player6 = await getPlayer(6);
    let column1 = await createPeopleBoxes(player1, player2, player3);
    let column2 = await createPeopleBoxes(player4, player5, player6);
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
        let player = await getPlayer(i+1);
        $(`#p${player}`).html(`${player} voted for ${votes[i]}.`);
    }
    setTimeout(async () => {
        await beginEjection();
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
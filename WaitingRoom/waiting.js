async function renderPlayers() {
    let html = `<section class = "container">
                    <div class="columns is-centered">

                        <div class="column">
                            <h1 class="title has-text-white">Current Players</h1>
                            <div class="box user1">Player 1: </div>
                            <div class="box user2">Player 2: </div>
                            <div class="box user3">Player 3: </div>
                            <div class="box user4">Player 4: </div>
                            <div class="box user5">Player 5: </div>
                            <div class="box user6">Player 6: </div>
                        </div>
                    </div>
                    </div>
            </section>`

            let $root = $(`#root`);
            $root.append(html)

            try{
                const result = await axios({
                    method: 'get',
                    url: `${base}/lobby/${gameId}`,
                    headers: {
                        authorization: `bearer ${idToken}`
                    },
                    withCredentials: true,
                })
                let users = new Array(6)
                for(let i = 0; i < 6; i++) {
                    users[i] = result.data[i];
                }
                for(let i = 0; i < 6; i++) {
                    if(users[i] === undefined) {
                        break
                    } else {
                        document.querySelector(`.user${i+1}`).innerHTML = `Player ${i + 1}: ` + users[i]
                    }
                }
                if(users[5] !== undefined) {
                    try {
                        const res = await axios({
                            method: 'post',
                            url: `${base}/newRound/${gameId}`,
                            headers: {
                                authorization: `bearer ${idToken}`
                            },
                            withCredentials: true,
                        })
                        console.log(res.data);
                    } catch(error) {
                        console.log("ERROR")
                    }
        
                    location.replace('../SpaceshipRooms/index.html')
                }
                return result;
            } catch(error) {
                console.log("ERROR")
            }
}

function renderHeader() {
    document.querySelector('.is-size-4').innerHTML = "Game ID: " + gameId
}

function renderPages() {
    renderHeader();
    renderPlayers();
}


$(function() {
    renderPages();
    findPlayers();
})

async function findPlayers() {
    try{
        const result = await axios({
            method: 'get',
            url: `${base}/lobby/${gameId}`,
            headers: {
                authorization: `bearer ${idToken}`
            },
            withCredentials: true,
        })
        return result;
    } catch(error) {
        document.querySelector('.user1').innerHTML = "Well, this sucks"
    }
}

let gameId = sessionStorage.gameId;
let idToken = sessionStorage.authToken;
let base = sessionStorage.base;

setInterval(async function() {
    try{
        const result = await axios({
            method: 'get',
            url: `${base}/lobby/${gameId}`,
            headers: {
                authorization: `bearer ${idToken}`
            },
            withCredentials: true,
        })
        let users = new Array(6)
        for(let i = 0; i < 6; i++) {
            users[i] = result.data[i];
        }
        for(let i = 0; i < 6; i++) {
            if(users[i] === undefined) {
                break
            } else {
                document.querySelector(`.user${i+1}`).innerHTML = `Player ${i + 1}: ` + users[i]
            }
        }
        if(users[5] !== undefined) {
            try {
                const res = await axios({
                    method: 'post',
                    url: `${base}/newRound/${gameId}`,
                    headers: {
                        authorization: `bearer ${idToken}`
                    },
                    withCredentials: true,
                })
                console.log(res.data);
            } catch(error) {
                console.log("ERROR")
            }

            location.replace('../SpaceshipRooms/index.html')
        }
        return result;
    } catch(error) {
        console.log("ERROR")
    }
}, 3000)
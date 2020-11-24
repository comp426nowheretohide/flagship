function renderPlayers() {
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
}

function renderPages() {
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
            url: `${base}/loby/${gameId}`,
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

})
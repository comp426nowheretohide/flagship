const joinForm = document.querySelector('#join-form');

joinForm.addEventListener('submit', async (e) => {
    //prevent auto-refreshing
    e.preventDefault();
    //get user info
    const name = joinForm['joinName'].value;
    const gameID = joinForm['joinID'].value;
    
    joinGame(name, gameID);

})

const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (e) => {
    //prevent page from refreshing
    e.preventDefault();

    //get user info
    const name = createForm['createName'].value;
    const id = createForm['createID'].value;

    createGame(name, id);
})

let base = 'https://aq95xg6owc.execute-api.us-east-2.amazonaws.com/prod';

sessionStorage.setItem("base", base);

let idToken = sessionStorage.authToken;

let createGame = async function(name, id){
    let lowerId = id.toLowerCase();
    try {
        const result = await axios({
            method: 'put', 
            url:`${base}/newGame/${lowerId}/${name}`,
            headers: {
                authorization: `bearer ${idToken}`,
            }, 
            withCredentials: true
        })
        sessionStorage.setItem("gameId", result.data.gameId)
        sessionStorage.setItem("currentUser", result.data.user1)
        console.log("Registered game ID: " + sessionStorage.gameId + " as user: " + sessionStorage.currentUser)
        location.replace('../WaitingRoom/index.html')
        return result;
    }
    catch(error){
       // $('#create-form').append('<p class = "is-size-4 has-text-danger">Game ID already taken.</p>');
       $('#createError').html('Game ID already taken.');
    }
}

console.log(sessionStorage.authToken)

let joinGame = async function(name, id){
    let lowerId = id.toLowerCase();
    try{
        const result = await axios({
            method: 'post', 
            url:`${base}/games/addPlayer/${lowerId}/${name}`,
            headers: {
                authorization: `bearer ${idToken}`
            },
            withCredentials: true,
        })
        console.log(result.data)
        sessionStorage.setItem("gameId", result.data.gameId)
        sessionStorage.setItem("currentUser", name)
        location.replace('../WaitingRoom/index.html')
        return result;
    }
    catch(error){
        //$('#join-form').append('<p class = "is-size-4 has-text-danger">No game ID found.</p>');
        $('#joinError').html('No game ID found.');
    }
}

let enterGameLobby = async function(){
    
}
const joinForm = document.querySelector('#join-form');

joinForm.addEventListener('submit', (e) => {
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

let base = 'https://k01kns80c4.execute-api.us-east-2.amazonaws.com/prod';

let idToken = sessionStorage.authToken;

let createGame = async function(name, id){
    try{
        const result = await axios({
            method: 'put', 
            url:`${base}/newGame/${id}/${name}`,
            headers: {
                authorization: `bearer ${idToken}`,
            }, 
            withCredentials: true
        })
        console.log("Registered game ID: " + result.gameId + " as user: " + result.user1)
        return result;
    }
    catch(error){
        $('#create-form').append('<p class = "is-size-4 has-text-danger">Game ID already taken.</p>');
    }
}

let joinGame = async function(name, id){
    try{
        const result = await axios({
            method: 'post', 
            url:`${base}/games/addPlayer/${id}/${name}`,
            headers: {
                authorization: `bearer ${idToken}`
            },
            withCredentials: true,
        })
        return result;
    }
    catch(error){
        $('#join-form').append('<p class = "is-size-4 has-text-danger">No game ID found.</p>');
    }
}
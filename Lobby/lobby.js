const joinForm = document.querySelector('#join-form');

joinForm.addEventListener('submit', (e) => {
    //prevent auto-refreshing
    e.preventDefault();
    //get user info
    const name = joinForm['joinName'].value;
    const gameID = joinForm['joinID'].value;
    
    joinGame(name, gameID);

})

const logInForm = document.querySelector('#create-form');

logInForm.addEventListener('submit', (e) => {
    //prevent page from refreshing
    e.preventDefault();

    //get user info
    const name = logInForm['createName'].value;
    const id = logInForm['createID'].value;

    createGame(name, id);

})

let base = 'https://1tlkebtmc7.execute-api.us-east-2.amazonaws.com/prod';

export async function createGame(name, id){
    try{
        const result = await axios({
            method: 'put', 
            url:`${base}/newGame/${id}/${name}`
        })
        return result;
    }
    catch(error){
        $('#create-form').append('<p class = "is-size-4 has-text-danger">Game ID already taken.</p>');
    }
}

export async function joinGame(name, id){
    try{
        const result = await axios({
            method: 'post', 
            url:`${base}/games/addPlayer/${id}/${name}`
        })
        return result;
    }
    catch(error){
        $('#join-form').append('<p class = "is-size-4 has-text-danger">No game ID found.</p>');
    }
}
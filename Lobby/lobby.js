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

let createGame = async function(name, id){
    try{
        const result = await axios({
            method: 'put', 
            url:`${base}/newGame/${id}/${name}`,
            headers: {
                authorization: `bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjNlNTQyN2NkMzUxMDhiNDc2NjUyMDhlYTA0YjhjYTZjODZkMDljOTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmluYWwtYmFkNmYiLCJhdWQiOiJmaW5hbC1iYWQ2ZiIsImF1dGhfdGltZSI6MTYwNjE3NDczNiwidXNlcl9pZCI6InJWZnZXaTRmSUhoQXo4U3NYblJjSGltNEZIczEiLCJzdWIiOiJyVmZ2V2k0ZklIaEF6OFNzWG5SY0hpbTRGSHMxIiwiaWF0IjoxNjA2MTc0NzM2LCJleHAiOjE2MDYxNzgzMzYsImVtYWlsIjoic2JhaGFsaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2JhaGFsaUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.xch6HutfmmCpI9DoOD-xtJfAsLRdS4L10HwHk8Zyd-UKev5rg3blItKHL0A_dl5R5O6_qYotR5IMiFyJsaWSkhFQ5UkisaxCUc0ycXLzmWFLStmZOnnNiFCUW-raH5jHo7xz3NN3L-pnY5JaGcLuv-pDd18wyupg9e9u6UDWUEW5B0Bh0-NdvCthgHqMIDiOIi8ajL3QNSd3a7bAKOCODdCPOqWeaACp84Y2R_hufp9TUWuv2MQfNXvtVyqzuj1hj1ox_EXuItSs5GER_AsYvyMQzwe51oh1kFwSojGM53oGN54Ms7Y1cydjnO0KHT2W8mzLxHMX0og2cgAU9ZP58A`,
            }, 
            withCredentials: true
        })
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
            withCredentials: true,
        })
        return result;
    }
    catch(error){
        $('#join-form').append('<p class = "is-size-4 has-text-danger">No game ID found.</p>');
    }
}
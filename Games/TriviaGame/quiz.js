let idToken = sessionStorage.authToken;
let gameID = sessionStorage.gameId;
let currUser = sessionStorage.currentUser;
let base = sessionStorage.base;

let quizQuestions = [
    {
        question: "What is 2 + 2?",
        answers: {
            A: '3',
            B: '4',
            C: '5',
            D: '6',
        },
        correct: 'B',
    },
    {
        question: "What is 3 + 2?",
        answers: {
            A: '3',
            B: '4',
            C: '5',
            D: '6',
        },
        correct: 'C',
    },
    {
        question: "What is 3 + 3?",
        answers: {
            A: '3',
            B: '4',
            C: '5',
            D: '6',
        },
        correct: 'D',
    },
    {
        question: "What is 1 + 2?",
        answers: {
            A: '3',
            B: '4',
            C: '5',
            D: '6',
        },
        correct: 'A',
    },
    {
        question: "What is 5 + 6?",
        answers: {
            A: '13',
            B: '14',
            C: '11',
            D: '12',
        },
        correct: 'C',
    },
    {
        question: "What is 8 + 7?",
        answers: {
            A: '13',
            B: '14',
            C: '15',
            D: '16',
        },
        correct: 'C',
    },
    {
        question: "What is 0 + 2?",
        answers: {
            A: '2',
            B: '1',
            C: '0',
            D: '9',
        },
        correct: 'A',
    },
    {
        question: "What is 9 + 4?",
        answers: {
            A: '13',
            B: '14',
            C: '15',
            D: '16',
        },
        correct: 'A',
    },
    {
        question: "What is 4 + 3?",
        answers: {
            A: '7',
            B: '4',
            C: '9',
            D: '12',
        },
        correct: 'A',
    },
    {
        question: "What is 9 + 9?",
        answers: {
            A: '18',
            B: '12',
            C: '19',
            D: '61',
        },
        correct: 'A',
    },
    {
        question: "What is 6 - 2?",
        answers: {
            A: '3',
            B: '4',
            C: '5',
            D: '6',
        },
        correct: 'B',
    },
    {
        question: "What is 8 - 1?",
        answers: {
            A: '7',
            B: '3',
            C: '1',
            D: '12',
        },
        correct: 'A',
    },
    {
        question: "What is 6 - 8?",
        answers: {
            A: '-1',
            B: '0',
            C: '4',
            D: '-2',
        },
        correct: 'D',
    },
    {
        question: "What is 12 - 12?",
        answers: {
            A: '0',
            B: '4',
            C: '8',
            D: '12',
        },
        correct: 'A',
    },
    {
        question: "What is 5 - 6?",
        answers: {
            A: '-1',
            B: '-2',
            C: '-3',
            D: '-4',
        },
        correct: 'A',
    },
    {
        question: "What is 40 - 15?",
        answers: {
            A: '25',
            B: '15',
            C: '35',
            D: '16',
        },
        correct: 'A',
    },
    {
        question: "What is 0 - 9?",
        answers: {
            A: '-8',
            B: '-9',
            C: '1',
            D: '-2',
        },
        correct: 'B',
    },
    {
        question: "What is 9 - 4?",
        answers: {
            A: '4',
            B: '5',
            C: '9',
            D: '10',
        },
        correct: 'B',
    },
    {
        question: "What is 4 - 3?",
        answers: {
            A: '4',
            B: '1',
            C: '2',
            D: '0',
        },
        correct: 'B',
    },
    {
        question: "What is 2 - 8?",
        answers: {
            A: '5',
            B: '-8',
            C: '-2',
            D: '-6',
        },
        correct: 'D',
    },
    {
        question: "What is 8 * 4?",
        answers: {
            A: '32',
            B: '42',
            C: '52',
            D: '62',
        },
        correct: 'A',
    },
    {
        question: "What is 8 * 0?",
        answers: {
            A: '8',
            B: '1',
            C: '0',
            D: '2',
        },
        correct: 'C',
    },
    {
        question: "What is 11 * 11?",
        answers: {
            A: '121',
            B: '100',
            C: '99',
            D: '89',
        },
        correct: 'A',
    },
    {
        question: "What is 25 * 25?",
        answers: {
            A: '300',
            B: '485',
            C: '625',
            D: '1000',
        },
        correct: 'C',
    },
    {
        question: "What is 10 * 10?",
        answers: {
            A: '100',
            B: '20',
            C: '50',
            D: '25',
        },
        correct: 'A',
    },
    {
        question: "What is 38 * 2?",
        answers: {
            A: '76',
            B: '75',
            C: '85',
            D: '86',
        },
        correct: 'A',
    },
    {
        question: "What is 6 * 6?",
        answers: {
            A: '26',
            B: '36',
            C: '1',
            D: '12',
        },
        correct: 'B',
    },
    {
        question: "What is 9 * 4?",
        answers: {
            A: '45',
            B: '18',
            C: '36',
            D: '10',
        },
        correct: 'C',
    },
    {
        question: "What is 4 * 3?",
        answers: {
            A: '12',
            B: '24',
            C: '7',
            D: '8',
        },
        correct: 'A',
    },
    {
        question: "What is 12 * 12?",
        answers: {
            A: '144',
            B: '132',
            C: '156',
            D: '169',
        },
        correct: 'A',
    },
    {
        question: "What is 8 / 4?",
        answers: {
            A: '4',
            B: '16',
            C: '2',
            D: '12',
        },
        correct: 'C',
    },
    {
        question: "What is 8 / 0?",
        answers: {
            A: 'infinity',
            B: 'undefined',
        },
        correct: 'B',
    },
    {
        question: "What is 0 / 11?",
        answers: {
            A: '11',
            B: '12',
            C: '0',
            D: '2',
        },
        correct: 'C',
    },
    {
        question: "What is 169 / 13?",
        answers: {
            A: '13',
            B: '14',
            C: '15',
            D: '18',
        },
        correct: 'A',
    },
    {
        question: "What is 10 / 10?",
        answers: {
            A: '1',
            B: '2',
            C: '10',
            D: '20',
        },
        correct: 'A',
    },
    {
        question: "What is 36 / 2?",
        answers: {
            A: '76',
            B: '18',
            C: '85',
            D: '28',
        },
        correct: 'B',
    },
    {
        question: "What is 12 / 3?",
        answers: {
            A: '6',
            B: '12',
            C: '4',
            D: '9',
        },
        correct: 'C',
    },
    {
        question: "What is 9 / 2?",
        answers: {
            A: '13',
            B: '4.5',
            C: '2.25',
            D: '11',
        },
        correct: 'B',
    },
    {
        question: "What is 9 / 3?",
        answers: {
            A: '4',
            B: '3',
            C: '1',
            D: '2',
        },
        correct: 'B',
    },
    {
        question: "What is 576 / 24?",
        answers: {
            A: '26',
            B: '24',
            C: '34',
            D: '29',
        },
        correct: 'B',
    },
]

let taskCompleted = false;

let randQuiz = questionSelector();

let failed = false;

let time = 59

$(function() {
    renderQuiz();

    let quiz = document.getElementById('customQuiz')

    renderQuestions(randQuiz, quiz);

    const $root = $('#root')

    $root.on('click', '.submit', getAnswers)
});

function returnToLobby() {
    location.replace('../../SpaceshipRooms/index.html')
}

function questionSelector() {
    let ret_arr = new Array();

    for(let i = 0; i < 8; i++) {
        let randomNum = Math.floor(Math.random() * quizQuestions.length);
        ret_arr.push(quizQuestions[randomNum])
    }

    return ret_arr
}

function renderQuiz() {
    const $root = $('#root');

    $root.append(`<div id="customQuiz"></div>
                    <button class="submit button">Submit Answers</button>
                    <div class = "is-size-4" id="results"></div>`)
}

function getAnswers() {
    let quiz = document.getElementById('customQuiz')
    let results = document.getElementById('results');
    showResults(randQuiz, quiz, results);
}

function showResults(questions, quiz, result){
    let answerContainers = quiz.querySelectorAll('.answers');

    // keep track of user's answers
    let userAnswer = '';
    let numCorrect = 0;
    
    // for each question...
    for(let i=0; i<questions.length; i++){

        // find selected answer
        userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
        
        // if answer is correct
        if(userAnswer===questions[i].correct){
            // add to the number of correct answers
            numCorrect++;
            
            // color the answers green
            answerContainers[i].style.color = 'green';
        }
        // if answer is wrong or blank
        else{
            // color the answers red
            answerContainers[i].style.color = 'red';
        }

        if(numCorrect < questions.length) {
            result.style.color = 'red';
            result.innerHTML = "ERR: System Failure ! Task failed! ";
            failed = true;
            //send failure to backend
            sendTaskResult(currUser, gameID, 0);
        } 
        else {
            result.style.color = 'green';
            result.innerHTML = "System calibrated correctly! Task completed!";
            //send success to backend
            if(!taskCompleted){
                sendTaskResult(currUser, gameID, 1);
            }
            taskCompleted = true;
        }
    }
}

function renderQuestions(questions, quiz) {
    let question = [];
    let answers;

    for(let i=0; i<questions.length; i++){
        
        answers = [];

        for(letter in questions[i].answers){

            answers.push(
                '<label>'
                    + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                    + `<strong>`+ letter + `</strong>` + ': '
                    + questions[i].answers[letter]
                + '</label>'
                // '<input type="radio" name="question' + i + '"id="radio' + i +  '" value="' + letter + '">'
            );

            // answers.push(
            //     '<label for="radio' + i + '">'  + letter + ': ' + questions[i].answers[letter] + '</label>'
            // )

        }

        question.push(
            '<div class="question hero is-size-4 has-text-white">' + questions[i].question + '</div>'
            + '<div class="answers">' + answers.join('') + '</div>'
        );

        $('label:has(input="type=radio")').addClass('newColor');

    }
    
    $('#customQuiz').append(question.join(''))

}

let sendTaskResult = async function(name, gameID, score){
    //score is 1 for success, 0 for failure
    const result = await axios({
        method: 'post', 
        url:`${base}/minigame/${gameID}/${name}/${score}`,
        headers: {
            authorization: `bearer ${idToken}`,
        }, 
        withCredentials: true
    })
    return result;

}

let isPlayerAlive = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/alive/${gameID}/${currUser}`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

let getImposter = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameID}/aliveI`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

let getMinigame = async function () {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameID}/minigame`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
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

let timerInterval = setInterval(function() {
    document.getElementById("time").innerHTML = time--;
}, 1000)

let getLastPlayerKilled = async function (id) {
    const result = await axios({
        method: 'get',
        url: `${base}/games/${gameID}/lastKilled`,
        headers: {
            authorization: `bearer ${idToken}`,
        },
        withCredentials: true
    })
    return result.data;
}

setTimeout(async function() {
    clearInterval(timerInterval);
    setTimeout(()=>{
        location.replace("../../VotingAndChat/index.html");
    }, 10000);
    let isAlive = await isPlayerAlive();
    let isLastKilled = await getLastPlayerKilled();
    $('body').empty();
    let message = $('<p style = "margin-top: 300px" class= "is-size-4"></p>');
    if (!isAlive) {
        if(isLastKilled == currUser){
            let imposterResult = await getImposter();
            message.addClass('has-text-danger');
            message.html(`You were stabbed to death by ${imposterResult}.`);
        }
    }
    else if(taskCompleted) {
        let random = Math.random();
        if (random > .5) {
            message.addClass('has-text-success');
            let playersMinigamesCompleted = await getMinigame();
            let randomIndex = Math.floor(Math.random() * playersMinigamesCompleted.length);
            let player = await getPlayer(randomIndex + 1);
            if (playersMinigamesCompleted[randomIndex] == 1) {
                message.html(`Clue: ${player} completed their task.`);
            }
            else {
                message.html(`Clue: ${player} did not complete a task.`);
            }
        }
        else{
            message.html('No clues discovered.');
        }
    }
    else {
        message.addClass('has-text-danger');
        message.html('You failed your task.');
    }
    $('body').append(message);

}, 60000);
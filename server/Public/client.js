console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log("Let's do this!");
    $('.exponentBtn').on('click', saveButton);
    $('#equalBtn').on('click', onSubmit);
    // $('#clearBtn').on('click', clearHistory);
    // displayResult();
}

let buttonUserPress = '';

function saveButton(){
    let buttonPressed = $(this).data().id;
    console.log(buttonPressed);
    buttonUserPress = buttonPressed;
}

function onSubmit(){
    console.log('Submitted!');

    let userInputs = {
        n1: $('#numOne').val(),
        button: buttonUserPress,
        n2: $('#numTwo').val(),
        answer: 'answer'
    }

    console.log(userInputs.button);

    $.ajax({
        url: '/calculate',
        method: 'POST',
        data: userInputs
    }).then((response) => {
        console.log('POST success! client');
        getCalculation(userInputs);
        userInputs.answer = response;
    }).catch((err) => {
        console.log('POST error: client', err);
    });
}

function getCalculation(userInputs){
    $.ajax({
        url: '/calculate',
        method: 'GET',
    }).then((userInputs) => {
        console.log('GET success! Client', userInputs);
        displayResult(userInputs);
    }).catch((err) => {
        console.log('GET error: client', err);
    });
}

// function clearHistory(){

// }

function displayResult(userInputs){
    //answer from server server.js equationFunction
    console.log('in displayResult, client');
    for (let answer of userInputs){
        $('calculationHistory').append(`
            <li>${answer.n1}${answer.button}${answer.n2}=${answer.answer}</li>
        `);
    }
}
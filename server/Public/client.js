console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log("Let's do this!");
    $('.exponentBtn').on('click', saveButton);
    $('#equalBtn').on('click', onSubmit);
    $('#clearBtn').on('click', clearInputs);
    $('#resetBtn').on('click', clearHistory);
    // displayResult();
}

let buttonUserPress = [];

function saveButton(e){
    e.preventDefault();
    let buttonPressed = $(this).data().id;
    console.log(buttonPressed);
    buttonUserPress.push(buttonPressed);
}

function onSubmit(e){
    e.preventDefault();
    console.log('Submitted!');

    let userInputs = {
        n1: $('#numOne').val(),
        button: buttonUserPress,
        n2: $('#numTwo').val(),
        answer: ''
    }

    console.log(userInputs.button);

    $.ajax({
        url: '/calculate',
        method: 'POST',
        data: userInputs
    }).then(() => {
        console.log('POST success! client');
        getCalculation(userInputs);
    }).catch((err) => {
        console.log('POST error: client', err);
    });
}

function getCalculation(userInputs){
    $.ajax({
        url: '/calculate',
        method: 'GET',
        data: userInputs
    }).then((userInputs) => {
        console.log('GET success! Client', userInputs);
        displayResult(userInputs);
    }).catch((err) => {
        console.log('GET error: client', err);
    });
}

function clearInputs(){
    $('#numOne').text('');
    $('#numTwo').text('');
}

function clearHistory(){
    $('userForm').reset();
}

function displayResult(userInputs){
    //answer from server server.js equationFunction
    console.log('in displayResult, client', userInputs);
    $('#calculationHistory').empty();
    for (let answer of userInputs){
        $('#result') = answer.answer;
        if (answer.button == 'plusBtn'){
        $('#calculationHistory').append(`
            <li>${answer.n1}+${answer.n2}=${answer.answer}</li>
        `);
        }
        else if (answer.button == 'minusBtn'){
            $('#calculationHistory').append(`
                <li>${answer.n1}-${answer.n2}=${answer.answer}</li>
            `);
        }
        else if (answer.button == 'timesBtn'){
            $('#calculationHistory').append(`
                <li>${answer.n1}*${answer.n2}=${answer.answer}</li>
            `);
        }
        else if (answer.button == 'divideBtn'){
            $('#calculationHistory').append(`
                <li>${answer.n1}/${answer.n2}=${answer.answer}</li>
            `);
        }
    }
}
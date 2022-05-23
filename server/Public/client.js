console.log('js');

$(document).ready(onReady);

// starts ready function and logs that it's working
function onReady() {
    console.log("Let's do this!");
    // exponent button on click (user presses +, -, etc), runs savebutton function
    $('.exponentBtn').on('click', saveButton);
    // equal button on click runs on submit function
    $('#equalBtn').on('click', onSubmit);
    // user form on click of the clearbutton, runs clear inputs function
    $('#userForm').on('click', '#clearBtn', clearInputs);
    // user form on click of the reset button, clear history function runs
    $('#userForm').on('click', '#resetBtn', clearHistory);
}

// global variable to pass user exponent button press into
let buttonUserPress = '';

// function that takes in an event
function saveButton(e){
    // event is preventing user form from reloading
    e.preventDefault();
    // button pressed by user is saved to buttonPressed
    let buttonPressed = $(this).data().id;
    // log the button pressed so we can verify
    console.log(buttonPressed);
    // save the local variable to the global variable for use later
    buttonUserPress = buttonPressed;
}

// function that takes in an event
// prevents buttons pressed from reloading form
// log that it's submitted so we know to check server side
function onSubmit(e){
    e.preventDefault();
    console.log('Submitted!');

    // sets up an object variable to take in user inputs
    let userInputs = {
        n1: $('#numOne').val(),
        button: buttonUserPress,
        n2: $('#numTwo').val(),
        answer: 'answer'
    }

    // logs the button from the user inputs
    console.log(userInputs.button);

    // post request that passes userInputs object to server endpoint
    $.ajax({
        url: '/calculate',
        method: 'POST',
        data: userInputs
        // then logs that it successfully sent that to the server for verification
    }).then((response) => {
        console.log('POST success! client');
        //runs getCalculation that takes in the user inputs
        getCalculation(userInputs);
        // saves the respons to the userInputs.answer
        userInputs.answer = response;
    }).catch((err) => { // in case of error I know it's in my POST
        console.log('POST error: client', err);
    });
}

// get calculation function that is also our GET request - run above, takes in userInputs
function getCalculation(userInputs){
    $.ajax({
        url: '/calculate',
        method: 'GET',
    // logs that the GET request worked and logs out the object
    }).then((userInputs) => {
        console.log('GET success! Client', userInputs);
        // runs display result function below and passes the object to that function
        displayResult(userInputs);
    }).catch((err) => { // in case of error I know it's in the get client side
        console.log('GET error: client', err);
    });
}

// function that clears the user input fields
function clearInputs(){
    $('#numOne').text('');
    $('#numTwo').text('');
}

// function that clears the form and reloads the page
function clearHistory(){
    $('#userForm')[0].reset();
    location.reload();
}

// function that displays results/object to the DOM
function displayResult(userInputs){
    //answer from server server.js equationFunction
    console.log('in displayResult, client', userInputs);
    // empties the history field
    $('#calculationHistory').empty();
    // for of loop that loops through userInputs.answer
    for (let answer of userInputs){
        // appends the answer from the server.js function to the result H2
        $('#result').append(answer.answer);
        // if the button user press is plus button
        if (answer.button == 'plusBtn'){
        // append userinput number 1 + userinput number 2 = answer equated on server side
        // append that to the calculation history on DOM
        $('#calculationHistory').append(`
            <li>${answer.n1}+${answer.n2}=${answer.answer}</li>
        `);
        }
        // else if the user pressed the minus button
        else if (answer.button == 'minusBtn'){
            // append userinput number 1 - userinput number 2 = answer equated on server side
            // append that to the calculation history on DOM
            $('#calculationHistory').append(`
                <li>${answer.n1}-${answer.n2}=${answer.answer}</li>
            `);
        }
        // else if the user pressed the multiply button
        else if (answer.button == 'timesBtn'){
            // append userinput number 1 * userinput number 2 = answer equated on server side
            // append that to the calculation history on DOM
            $('#calculationHistory').append(`
                <li>${answer.n1}*${answer.n2}=${answer.answer}</li>
            `);
        }
        // else if the user pressed the divide button
        else if (answer.button == 'divideBtn'){
            // append userinput number 1 / userinput number 2 = answer equated on server side
            // append that to the calculation history on DOM
            $('#calculationHistory').append(`
                <li>${answer.n1}/${answer.n2}=${answer.answer}</li>
            `);
        }
        // results H2 is cleared
        $('#result').empty();
        // results H2 is then appended with the answer
        $('#result').append(`${answer.answer}`);
    }
}
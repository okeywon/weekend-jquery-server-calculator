const express = require('express');
// allow objects to be passed, etc
const bodyParser = require('body-parser');
const app = express();

// requires app to use urlencoded and json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// tells appt run a statis public server
app.use(express.static('server/public'));

// object to pass user inputs into = POST to server
let userInputs = [
    {
        n1: 'numOne',
        button: 'button',
        n2: 'numTwo',
        answer: 'result'
    }
];

// insert GET
// send inputs and calculations back to user
app.get('/calculate', (req, res) => {
    console.log('GET working server')
    res.send(userInputs);
});

// insert POST
// get user inputs and run the equation function below
// send 201 to client console
app.post('/calculate', (req, res) => {
    console.log('POST working! server');
    console.log('userInputs are:', req.body);
    userInputs.push(req.body);
    equationFunciton(req.body);
    res.sendStatus(201)
});

// insert the logic for calculator here
// function that takes in the obj from the POST above
// tells us we are in the function to verify the function works
// switch statement that compares user button pressed (+, -, etc)
// each case sets up a variable of the user number inputs and adds the correct exponent (+, - etc)
// each case then takes in the new variable as the object.answer
// we then console.log the answer in the server console and break.
// no default needed.
function equationFunciton(obj){
    console.log('in equationFunciton')
    switch(obj.button) {
        case 'plusBtn':
            let resultPlus = Number(obj.n1) + Number(obj.n2);
            obj.answer = resultPlus;
            console.log('Also the thing obj', obj);
            break;
        case 'minusBtn':
            let resultMinus = Number(obj.n1) - Number(obj.n2);
            obj.answer = resultMinus;
            break;
        case 'timesBtn':
            let resultTimes = Number(obj.n1) * Number(obj.n2);
            obj.answer = resultTimes;
            break;
        case 'divideBtn':
            let resultDivide = Number(obj.n1) / Number(obj.n2);
            obj.answer = resultDivide;
            break;
    }
    // ensres the obj passed back to object above and the answer is correct
    console.log('This is what you want:', userInputs);
}

// starts the server - automatically refreshed with nodemon
app.listen(5000, () => {
    console.log("I'm listening...");
});

console.log("look, ma, I'm a server.");
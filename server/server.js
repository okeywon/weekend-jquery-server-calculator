const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('server/public'));

let userInputs = [
    {
        n1: 'numOne',
        button: 'button',
        n2: 'numTwo',
        answer: 'result'
    }
]

// insert GET
app.get('/calculate', (req, res) => {
    console.log('GET working server')
    res.send(userInputs);
});

// insert POST
app.post('/calculate', (req, res) => {
    console.log('POST working! server');
    console.log('userInputs are:', req.body);
    userInputs.push(req.body);
    equationFunciton();
    res.sendStatus(201)
});

// insert the logic for calculator here

app.get('/answer', (req, res) => {
    console.log('in /answer')
    let calculatedAnswer = userInputs.answer;
    console.log('Your answer is:', calculatedAnswer);

    res.send(`Your answer is:', ${calculatedAnswer}`);
});

function equationFunciton(userInputs){
    console.log('in equationFunciton')
    let answer = '';
    switch(userInputs) {
        case 0:
            userInputs.button == "plusBtn";
            let resultPlus = n1 + n2;
            answer = resultPlus;
            console.log("Plus variable: ", answer);
            userInputs.answer.push(answer);
            break;
        case 1:
            userInputs.button == "minusBtn";
            let resultMinus = n1 - n2;
            answer = resultMinus;
            userInputs.answer.push(answer);
            break;
        case userInputs == 'timesBtn':
            let resultTimes = n1 * n2;
            userInputs.answer.push(resultTimes);
            break;
        case userInputs == 'divideBtn':
            let resultDivide = n1 / n2;
            userInputs.answer.push(resultDivide);
            break;
    }
}

app.listen(5000, () => {
    console.log("I'm listening...");
});

console.log("look, ma, I'm a server.");
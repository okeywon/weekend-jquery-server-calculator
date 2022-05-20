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
function equationFunciton(n1, n2){
    console.log('in equationFunciton')
    switch(n1, n2) {
        case '+':
            let resultPlus = n1 + n2;
            userInputs.answer.push(resultPlus);
            break;
        case '-':
            let resultMinus = n1 - n2;
            userInputs.answer.push(resultMinus);
            break;
        case '*':
            let resultTimes = n1 * n2;
            userInputs.answer.push(resultTimes);
            break;
        case '/':
            let resultDivide = n1 / n2;
            userInputs.answer.push(resultDivide);
            break;
    }

}

app.listen(5000, () => {
    console.log("I'm listening...");
});

console.log("look, ma, I'm a server.");
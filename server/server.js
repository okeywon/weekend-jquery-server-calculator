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
];

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
    equationFunciton(req.body);
    res.sendStatus(201)
});

// insert the logic for calculator here
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
    console.log('This is what you want:', userInputs);
}

app.listen(5000, () => {
    console.log("I'm listening...");
});

console.log("look, ma, I'm a server.");
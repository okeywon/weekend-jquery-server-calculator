const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('server/public'));

// insert GET

// insert POST

// insert the logic for calculator here

app.listen(5000, () => {
    console.log("I'm listening...");
});

console.log("look, ma, I'm a server.");
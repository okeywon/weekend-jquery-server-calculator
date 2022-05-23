[x] create html, server.js, client.js, jquery.js, css(?)
[x] express, nodemon, body-parser

Client side:
[x] two user inputs that take in number values
[x] buttons that denote different mathmatical functions (ie: +, -, /)
[x] "submit" button that is an =, capture the input and POST to server
[x] GET req
[x] C button to clear the fields
[x] ul append li to DOM for all calculations, should stay even after refreshing the page

Server side:
[x] POST receive user inputs to server
[x] GET user to receive logic from server (201)
[x] logic that computes out the inputs
    [x] take in inputs into a variable/object
    [x] compute the inputs from the button function the user chose
    [x] return a value


STRETCH:
[ ] additional buttons for all numbers and .
[ ] only allow a POST if all necessary inputs are ready (require)
[x] allow user to clear history by hitting "reset" button - use a DELETE req to delete info on the server
[ ] user can click on a history calculation to re-run that equation
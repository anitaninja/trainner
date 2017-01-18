var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;   // set our port
var model = require("./module/controller");
var route = require("./route/login_route");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// get an instance of the express Router   

app.use('/', route);
app.listen(port);
console.log('Server start.... ' + port);
 


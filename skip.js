

var mysql = require("mysql");
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var router = express.Router();              // get an instance of the express Router

router.get('/getuser', function(req, res) 
		{

					var con = mysql.createConnection({
					  host: "localhost",
					  user: "root",
					  password: "",
	c				  database: "mydb"
					});

					con.query('SELECT * FROM node_data',function(err,rows){
					  if(err) throw err;

					  console.log('Data received from Db:\n');
					  console.log(rows);
					  res.json(rows);
					});
		 });



app.use('/api', router);
app.listen(port);
console.log('Server start.... ' + port);

// //mysql connection

			

// 			// First you need to create a connection to the db
// 			var con = mysql.createConnection({
// 			  host: "localhost",
// 			  user: "root",
// 			  password: ""
// 			});

// 			con.connect(function(err){
// 			  if(err){
// 			    console.log('Error connecting to Db');
// 			    return;
// 			  }
// 			  console.log('Connection established');
// 			});

// 			con.end(function(err) {});


//connection done

//Start All data reading

// router.route('/')

// 		.get(function(req, res) 
// 		{

// 					var con = mysql.createConnection({
// 					  host: "localhost",
// 					  user: "root",
// 					  password: "",
// 					  database: "mydb"
// 					});

// 					con.query('SELECT * FROM node_data',function(err,rows){
// 					  if(err) throw err;

// 					  console.log('Data received from Db:\n');
// 					  console.log(rows);
// 					  res.json(rows);
// 					});
// 		 });



// // Create new record..

// var user = { Id: 3, password: 'riya' };
// con.query('INSERT INTO node_data SET ?', user, function(err,res){
//   if(err) throw err;

//   console.log('Last insert Id:', res.insertId);
// });
// //created...



// //update record

// con.query(
//   'UPDATE node_data SET password = ? Where Id = ?',
//   ['neha',2],
//   function (err, result) {
//     if (err) throw err;

//     console.log('Changed ' + result.changedRows + ' rows');
//   }
// );
// //delete record...
// con.query(
//   'DELETE FROM node_data WHERE id = ?',
//   [3],
//   function (err, result) {
//     if (err) throw err;

//     console.log('Deleted ' + result.affectedRows + ' rows');
//   }
// );
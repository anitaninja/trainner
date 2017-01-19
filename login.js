

var mysql = require("mysql");
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port


var router = express.Router();              // get an instance of the express Router
var con = mysql.createConnection({
					  host: "localhost",
					  user: "root",
					  password: "",
					  database: "mydb"
					});

router.get('/getuser', function(req, res) 
		{

					
					con.query('SELECT * FROM node_data',function(err,rows){
					  if(err) throw err;

					  console.log('Data received from Db:\n');
					  console.log(rows);

					  res.json(rows);
					});
		 });

router.post('/insert',function(req,res){
			var Id = req.body.id;
    		var password = req.body.password;
			var user = { Id, password};
			con.query('INSERT INTO node_data SET ?', user, function(err,result){
			  if(err) throw err;

			   console.log('Last insert Id:');
			 //  console.log('----------', res);
			   res.json({mgs :"record inserted..."});
			 });

});


router.put('/update',function(req,res){

			var Id = req.body.id;
    		var password = req.body.password;

			con.query(
			  'UPDATE node_data SET password = ? Where Id = ?',
			  [password,Id],
			  function (err, result) {
			    if (err) throw err;

			    console.log('Changed ' + result.changedRows + ' rows');
			     res.json({mgs :"record updated..."});
			  }
			);

});

router.delete('/delete',function(req,res){

	var Id = req.body.id;

	con.query(
			  'DELETE FROM node_data WHERE id = ?',
			  [Id],
			  function (err, result) {
			    if (err) throw err;

			    console.log('Deleted ' + result.affectedRows + ' rows');
			    res.json({mgs :"record Deleted..."});
			  }
			);


});


app.use('/api', router);
app.listen(port);
console.log('Server start.... ' + port);

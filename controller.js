
var con = require("./connection");
function registration (req,res) {
	
		//	var Id = req.body.id;
			var Name = req.body.name;
    		var City = req.body.city;
    		var Phone = req.body.phone;
			var user = { Name,City,Phone};
			con.init().query('INSERT INTO user_info SET ?', user, function(err,result){
			  if(err) throw err;

			   console.log('Registration sucessfully Done !!!!');
			   res.json({mgs :"Registration sucessfully Done !!!!"});
			 });
}

function getAll(req, res) 
{
				
					con.init().query('SELECT * FROM user_info', function (err,rows) {
					  if(err) throw err;

					  console.log('User Data received from Db\n');
					  console.log(rows);

					  res.send(rows);
					});
}

function create (req,res) {
			var Id = req.body.id;
    		var password = req.body.password;
			var user = { Id, password};
			var flag=0;

			//fetch data

			con.init().query('SELECT * FROM user_info', function (err,rows) {
					  if(err) throw err;

					 // console.log('Data received from Db:\n');
					  console.log(rows);

					  for (var i = 0; i < rows.length; i++) {
  							console.log(rows[i].Id);
  							console.log(Id);
  							if(rows[i].Id==Id) 
  							{

  								flag=1;
  							}
					  };
					  if(flag==1)
					  {
					  		con.init().query('INSERT INTO node_data SET ?', user, function(err,result){
								  if(err) throw err;
									    console.log('Wel-come, You are Authenticate User !!!!');
			 					 		res.json({mgs :"Wel-come, You are Authenticate User !!!!"});
			 						});
					  }
					 else
					  {
					  	 
					  	 console.log('Sorry, Please register yourself.');
					  	 res.json({mgs :"Sorry, Please register yourself."});
					  }
					 
					});
			

			

}

function update (req,res) {
			var Id = req.body.id;
    		var Name = req.body.name;
    		var City = req.body.city;
    		var Phone = req.body.phone;

			con.init().query(
			  'UPDATE user_info SET Name = ?,City = ?,Phone = ? Where Id = ?',
			  [Name,City,Phone,Id],
			  function (err, result) {
			    if (err) throw err;

			    console.log('Record Updated. !!  Changed ' + result.changedRows + ' rows');
			     //res.json({mgs :"Record Updated. !!"});
			     getAll(null, res);

			  }
			);
			//getAll();
}

function remove (req,res,callback) {
	var Id = req.body.id;
	con.init().query(
			  'DELETE FROM user_info WHERE id = ?',
			  [Id],
			  function (err, result) {
			    if (err) throw err;

			    console.log('Record Deleted. !! Deleted ' + result.affectedRows + ' rows');
			    res.json({mgs :"Record Deleted. !!"});
			  }
			);
}

module.exports = { getAll, update, create,remove,registration};
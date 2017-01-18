var con = require("./module/connection");

function registration (req,res) {
	
			var Id = req.body.id;
			var Name = req.body.name;
    		var City = req.body.city;
    		var Phone = req.body.phone;
			var user = { Id, Name,City,Phone};
			con.init().query('INSERT INTO user_info SET ?', user, function(err,result){
			  if(err) throw err;

			   console.log('Registration sucessfully Done !!!!');
			   res.json({mgs :"Registration sucessfully Done !!!!"});
			 });
}
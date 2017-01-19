var mysql = require("mysql");
function init() {
		 var con = mysql.createConnection({
					  host: "localhost",
					  user: "root",
					  password: "",
					  database: "mydb"
					});


		 return con;
}
module.exports = { init };
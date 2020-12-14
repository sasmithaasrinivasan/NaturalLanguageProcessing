var express = require('express');
var mysql = require('mysql');

var app = express();
app.use(express.urlencoded());

var connection = mysql.createConnection({
  host: "database-1.cig9jdbbhbst.us-east-1.rds.amazonaws.com",
  
  user: "admin",
  password: "sasmi2503",
  database: "mydb",
  insecureAuth : true
});

connection.connect(function (err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to RDS.');
});

var test = 0;

app.get('/', function (req, res) {

  let username = req.query.username;
  let password = req.query.password;
  
 

  connection.query('SELECT * from login', function (error, results, fields) {
    if (error) throw error;

    var length = results.length

    for (i = 0; i < length-1; i++){
	//console.log(results[i]);
	    console.log(results[i]);
	    console.log(test);
      if (results[i].username == username && results[i].password == password){
        test = 1; console.log(test); break;}}
	    console.log(test);
      if (test == 1){
	        console.log("Success");
	        res.sendFile('new.html', { root: __dirname });
	
	        connection.end();
	      }
     
        else{
	          res.send("Login Failure try again!!"); connection.end();}

        });
  

   

});


app.listen(8081);
console.log("server listening in http://localhost:8081/abc")

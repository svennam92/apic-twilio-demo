
var express = require('express');
var twilio = require('twilio');
var client = twilio('AC6e318d67d6fd4d680861e8bdae90332a', 'e008985209c7906ef710085f2169280f');
var Client = require('node-rest-client').Client;
 
var client = new Client();
/*
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-03.cleardb.net',
  user     : 'bc858bd9bf9370',
  password : '1c44f16c',
  database : 'ad_044d8542a3178ed'
});
connection.connect();
*/
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
  try{
  getEmployeesFromAPI("Berni");
}catch(err){
	console.log("ERROR: " , err);
}

});

app.get('/:firstName', function (req, res) {
 // res.send('Hello World!');
  getEmployeesFromAPI(req.params.firstName, res);

});

app.post('/', function (req,res) {
  var twiml = new twilio.TwimlResponse();
  twiml.message('Thanks for the text');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

});
/*
function getEmployeesFromDB(firstName, res){
	var query = "SELECT * from employees WHERE first_name='"+firstName + "'";
	
	connection.query(query, function(err, rows, fields) {
		var result = "";
		if(rows && rows.length >0){
		  	console.log("Found " + rows.length + " records");
		  	for (i in rows) {
				result += rows[i].first_name + " " + rows[i].last_name + ", " + rows[i].gender + "; ";
		  	}
	  	}
	  	res.send(result);

  });
};
*/
function getEmployeesFromAPI(firstName, res){
  var url = "http://employeesapi.mybluemix.net/api/Employees?filter%5Bwhere%5D%5Bfirst_name%5D=" + firstName;
  console.log("url", url);
  client.get(url, function (data, response) {
    res.json(data);
  });

};


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

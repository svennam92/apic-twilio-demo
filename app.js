
var express = require('express');
var twilio = require('twilio');
var client = twilio('AC6e318d67d6fd4d680861e8bdae90332a', 'e008985209c7906ef710085f2169280f');
var twiml = new twilio.TwimlResponse();

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');

});

app.post('/', function (req,res) {

  console.log(req.body);
  console.log("---");
  console.log(req.body.Body);

});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

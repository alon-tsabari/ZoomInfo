//Require express framework.
var express = require ('express');
//Declare express method.
var app = express();
//Require 'node-rest-client' library.
var Client = require('node-rest-client').Client;
//Create a new object with all the relevant prototypes.
client = new Client();

//Serving out static files located in -public- directory;
app.use("/", express.static("./public"));

app.get('/getStatus', function(req, res) {
   client.get("https://status.heroku.com/api/v3/current-status", function(data){
      //Checking If the request is actually sent from node to API.
      console.log('1: request sent and response reciecved');
      //Sending the data to angular from the resonse the node got from API.
      res.send(data);
   });
});

app.get('/getUpdates', function(req, res) {
   client.get("https://status.heroku.com/api/v3/issues?since=2012-04-24&limit=1", function(data){
      //Checking If the request is actually sent from node to API.
      console.log('2: request sent and response reciecved');
      //Sending the data to angular from the resonse the node got from API.
      res.send(data);
   });
});

//Listen to port 3000 or what the enviroment
// your in picks you.
app.listen(process.env.PORT || 3000, function() {
   console.log('Server is running...');
});

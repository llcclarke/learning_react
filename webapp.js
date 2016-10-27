var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'));

var jobData = [
  {id: 1, status:'Complete', due:'Tomorrow', title:'Laundry', comments:''},
  {id: 2, status:'To Do', due:'Next Week', title:'Book flights', comments:'under 200€'},
];

app.get('/api/jobs', function(req, res) {
	res.json(jobData);
});

app.use(bodyParser.json({type: '*/*'}));
app.post('/api/jobs/', function(req, res) {
	console.log("Req body: ", req.body);
	var newJob = req.body;
	newJob.id = jobData.length + 1;
	jobData.push(newJob);
	res.json(newJob);
});

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});

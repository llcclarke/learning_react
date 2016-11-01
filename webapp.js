var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;
var jobData = [];

app.use(express.static('static'));

app.get('/api/jobs', function(req, res) {
	db.collection("jobs").find().toArray(function(err, docs) {
		res.json(docs);
	});
});

app.use(bodyParser.json({type: '*/*'}));
app.post('/api/jobs/', function(req, res) {
	console.log("Req body: ", req.body);
	var newJob = req.body;
	newJob.id = jobData.length + 1;
	jobData.push(newJob);
	res.json(newJob);
});

MongoClient.connect('mongodb://localhost/jobsdb', function(err, dbConnection){
	db = dbConnection
	var server = app.listen(3000, function() {
		var port = server.address().port;
		console.log("Started server at port", port);
	});
});

'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

app.use(express.static('static'));

app.get('/api/jobs', function(req, res) {
	console.log("Query string", req.query);
	var filter = {};
	if (req.query.due)
		filter.due = req.query.due;
	if(req.query.status)
		filter.status = req.query.status;

	db.collection("jobs").find(filter).toArray(function(err, docs) {
		res.json(docs);
	});
});


app.use(bodyParser.json({type: '*/*'}));
app.post('/api/jobs/', function(req, res) {
	console.log("Req body: ", req.body);
	var newJob = req.body;
	db.collection("jobs").insertOne(newJob, function(err, result){
		var newId = result.insertedId;
		db.collection("jobs").find({_id: newId}).next(function(err, doc) {
			res.json(doc);
		});
	});
});

MongoClient.connect('mongodb://localhost/jobsdb', function(err, dbConnection){
	db = dbConnection
	var server = app.listen(3000, function() {
		var port = server.address().port;
		console.log("Started server at port", port);
	});
});

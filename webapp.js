'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

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

app.get('/api/jobs/:id', function(req, res) {
  db.collection("jobs").findOne({_id: ObjectId(req.params.id)}, function(err, job) {
    res.json(job);
  });
});

app.put('/api/jobs/:id', function(req, res) {
	var job = req.body;
	console.log("Modifying job:", req.params.id, job);
	var oid = ObjectId(req.params.id);
	db.collection("jobs").updateOne({_id: oid}, job, function(err, result){
		console.log("going more stuff")
		db.collection("jobs").find({_id: oid}).next(function(err, doc){
			console.log("and some more")
			res.send(doc);
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

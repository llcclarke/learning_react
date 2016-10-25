var express = require('express')

var app = express();

app.use(express.static('static'));

// var jobData = [
// 	{id: 1, status:'Complete', due:'Tomorrow', title:'Laundry', comments:''}
// ];

var jobData = [
  {id: 1, status:'Complete', due:'Tomorrow', title:'Laundry', comments:''},
  {id: 2, status:'To Do', due:'Next Week', title:'Book flights', comments:'under 200€'},
];
app.get('/api/jobs', function(req, res) {
	res.status(200).send(JSON.stringify(jobData))
});

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});

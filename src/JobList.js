'use strict'

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var JobFilter = require('./JobFilter');
var JobAdd = require('./JobAdd');

var JobRow = React.createClass({
  render: function(){
    console.log("Rendering JobRow: ", this.props.job);
    return(
        <tr>
          <td>{this.props.job._id}</td>
          <td>{this.props.job.status}</td>
          <td>{this.props.job.due}</td>
          <td>{this.props.job.title}</td>
          <td>{this.props.job.comments}</td>
        </tr>
    )
  }
});

var JobTable = React.createClass({
  render: function(){
    console.log("Rendering jobs, number of items: ", this.props.jobs.length);
    var jobRows = this.props.jobs.map(function(job) {
      return <JobRow key={job._id} job={job} />
    });
    return(
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Due</th>
            <th>Title</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {jobRows}
        </tbody>
      </table>
    )
  }
});

var JobList = React.createClass({
  getInitialState: function() {
    return {jobs: []};
  },
  render: function(){
    console.log("Rendering Job List, number of items: ", this.state.jobs.length);
    return(
      <div>
        <h1> Job list </h1>
        <JobFilter />
        <hr />
        <JobTable jobs={this.state.jobs} />
        <hr />
        <JobAdd addJob={this.addJob} />
      </div>
    )
  },

componentDidMount: function(){
  $.ajax('/api/jobs').done(function(data){
    this.setState({jobs: data});
  }.bind(this));
},
  addJob: function(job){
    console.log("Adding job: ", job);
    $.ajax({
      type:'POST', url:'/api/jobs', contentType: 'application/json',
      data: JSON.stringify(job),
      success: function(data){
        var job = data;
        var jobsModified = this.state.jobs.concat(job);
        this.setState({jobs: jobsModified});
      }.bind(this),
      error: function(xhr, status, err){
        console.log("Error adding bug: ", err);
      }
    });
  }
});

module.exports = JobList;

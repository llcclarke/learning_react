'use strict'

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
import { Link } from 'react-router';


var JobFilter = require('./JobFilter');
var JobAdd = require('./JobAdd');

var JobRow = React.createClass({
  render: function(){
    // console.log("Rendering JobRow: ", this.props.job);
    return(
        <tr>
          <td>
            <Link to={"/jobs/" + this.props.job._id}>{this.props.job._id}</Link>
            </td>
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
    // console.log("Rendering jobs, number of items: ", this.props.jobs.length);
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
    console.log("Rendering JobList, number of items: ", this.state.jobs.length);
    return(
      <div>
        <h1> Job list </h1>
        <JobFilter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
        <hr />
        <JobTable jobs={this.state.jobs} />
        <hr />
        <JobAdd addJob={this.addJob} />
      </div>
    )
  },
componentDidMount: function(){
  console.log("JobList: componentDidMount");
  this.loadData({});
},

componentDidUpdate: function(prevProps){
  var oldQuery = prevProps.location.query;
  var newQuery = this.props.location.query;
  if( oldQuery.status === newQuery.status &&
      oldQuery.due === newQuery.due){
        console.log("JobList: componentDidUpdate, no change in filter, not updating");
        return;
      }else{
        console.log("JobList: componentDidUpdate, loading data with new filter");
        this.loadData();
      }
},

loadData: function(filter) {
  var query = this.props.location.query || {};
  var filter = {due: query.due, status: query.status};

  $.ajax('/api/jobs', {data: filter}).done(function(data){
    this.setState({jobs: data});
  }.bind(this));
},

changeFilter: function(newFilter){
  console.log(newFilter)
  this.props.router.push({search: '?' + $.param(newFilter)});
  console.log({search: '?' + $.param(newFilter)})
  this.loadData(newFilter);
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

'use strict'
var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, Redirect, hashHistory } from 'react-router'


var JobList = require('./JobList');

var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the  route</h2>
    );
  }
});

ReactDOM.render(
  (
    <div>
      <Router history={hashHistory} >
        <Route path="/jobs" component={JobList} />
        <Redirect from="/" to="/jobs" />
        <Route path="*" component={NoMatch} />
        </Router>
      </div>
  ),
  document.getElementById('main')
);
//
//
// ReactDOM.render(
//   <JobList />,
//   document.getElementById('main')
// );

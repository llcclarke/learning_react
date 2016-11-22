'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var JobAdd = React.createClass({
  render: function(){
    //console.log('Rendering JobAdd');
    return(
      <div>
        <form name="jobAdd">
          <select name="status" >
            <option value="Complete">Complete</option>
            <option value="To Do">To Do</option>
            <option value="To Be Assigned">To Be Assigned</option>
          </select>
          <select name="due" >
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="Next Week">Next Week</option>
            <option value="Next Month">Next Month</option>
          </select>
          <input type="text" name="title" placeholder="Title" />
          <input type="text" name="comments" placeholder="Comments" />
          <button onClick={this.handleSubmit}> Add Job </button>
        </form>
      </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var form = document.forms.jobAdd;
    this.props.addJob({due: form.due.value, title: form.title.value, status: 'To Do', comments: form.comments.value});
    form.due.value = ""; form.title.value = ""; form.comments.value= "";
  }

});

module.exports = JobAdd;

'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var JobAdd = React.createClass({
  render: function(){
    console.log('Rendering JobAdd');
    return(
      <div>
        <form name="jobAdd">
          <input type="text" name="due" placeholder="Due" />
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

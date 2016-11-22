'use strict'

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var JobEdit = React.createClass({
  render: function(){
    return(
      <div>
        Edit Job: {this.props.params.id}
        <br/>
        <form onSubmit={this.submit}>
        Status:
        <select name="status" value={this.state.status} onChange={this.onChangeStatus}>
          <option value="Complete">Complete</option>
          <option value="To Do">To Do</option>
          <option value="To Be Assigned">To Be Assigned</option>
        </select>
        <br/>
          Due:
          <select name="due" value={this.state.due} onChange={this.onChangeDue}>
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
            <option value="Next Week">Next Week</option>
            <option value="Next Month">Next Month</option>
          </select>
          <br/>
          Title: <input type="text" value={this.state.title} onChange={this.onChangeTitle} />
          <br/>
          Comments:<input type="text" value={this.state.comments} onChange={this.onChangeComments} />
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  },

  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
    this.loadData();
  },

  componentDidUpdate: function(prevProps){
    console.log("JobEdit: componentDidUpdate", prevProps.params.id, this.props.params.id);
    if (this.props.params.id != prevProps.params.id){
      this.loadData();
    }
  },

  loadData: function(){
    $.ajax('/api/jobs/' + this.props.params.id) .done(function(job){
      this.setState(job);
    }.bind(this));
  },

  onChangeStatus: function(e){
    this.setState({status: e.target.value});
  },
  onChangeDue: function(e){
    this.setState({due: e.target.value});
  },
  onChangeTitle: function(e){
    this.setState({title: e.target.value});
  },
  onChangeComments: function(e){
    this.setState({comments: e.target.value});
  },

  submit: function(e){
    e.preventDefault();
    var job = {
      status: this.state.status,
      due: this.state.due,
      title: this.state.title,
      comments: this.state.comments
    }

    $.ajax({
      url: '/api/jobs/' + this.props.params.id, type: 'PUT', contentType:'application/json',
      data: JSON.stringify(job),
      dataType: 'json',
      success: function(job){
        this.setState(job);
      }.bind(this),
    });
  }
});

module.exports = JobEdit;

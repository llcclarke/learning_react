'use strict'

var React = require('react');
var ReactDOM = require('react-dom');

var JobFilter = React.createClass({
  render: function(){
    console.log("rendering job filter");
    return(
      <div>
        <h3> Job Filter </h3>
        Status:
        <select value={this.state.status} onChange={this.onChangeStatus}>
          <option value="">(Any)</option>
          <option value="To Do">To Do</option>
          <option value="To Be Assigned">To Be Assigned</option>
          <option value="Complete">Complete</option>
        </select>
        <br/>
        Due:
        <select value={this.state.due} onChange={this.onChangeDue}>
          <option value="">(Any)</option>
          <option value="Today">Today</option>
          <option value="Tomorrow">Tomorrow</option>
          <option value="Next Week">Next Week</option>
          <option value="Next Month">Next Month</option>
        </select>
        <br/>
        <button onClick={this.submit}>Apply</button>
      </div>
    )
  },

  getInitialState: function(){
    return {status: "", due: ""};
  },

  onChangeStatus: function(e){
    this.setState({status: e.target.value});
  },

  onChangeDue: function(e){
    this.setState({due: e.target.value});
  },

  submit: function(e){
    this.props.submitHandler({status: this.state.status, due: this.state.due});
  }
});

module.exports = JobFilter;

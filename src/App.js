var JobFilter = React.createClass({
  render: function(){
    console.log("rendering job filter");
    return(
      <div>Filter jobs</div>
    )
  }
});

var JobRow = React.createClass({
  render: function(){
    console.log("Rendering JobRow: ", this.props.job);
    return(
        <tr>
          <td>{this.props.job.id}</td>
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
    console.log("Rendering job table, number of items: ", this.props.jobs.length);
    var jobRows = this.props.jobs.map(function(job) {
      return <JobRow key={job.id} job={job} />
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

var JobAdd = React.createClass({
  render: function(){
    console.log('Rendering job add');
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

ReactDOM.render(
  <JobList />,
  document.getElementById('main')
);

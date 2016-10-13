var JobFilter = React.createClass({
  render: function(){
    return(
      <div>Filter jobs</div>
    )
  }
});

var JobRow = React.createClass({
  render: function(){
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
// <JobRow id={1} status="To Do" due="October 12" title="Learn React" comments="" />
// <JobRow id={2} status="Complete" due="October 10" title="Finish Week 1 CS50x" comments="Start week 2 after" />

var JobAdd = React.createClass({
  render: function(){
    return(
      <div>Add a job</div>
    )
  }
});

var jobData = [
  {id: 1, status:'Complete', due:'Tomorrow', title:'Laundry', comments:''},
  {id: 2, status:'To Do', due:'Next Week', title:'Book flights', comments:'under 200€'},
];

var JobList = React.createClass({
  render: function(){
    return(
      <div>
        <h1> Job list </h1>
        <JobFilter />
        <hr />
        <JobTable jobs={jobData} />
        <hr />
        <JobAdd />
      </div>
    )
  }
});

ReactDOM.render(
  <JobList />,
  document.getElementById('main')
);

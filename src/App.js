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
          <td>{this.props.id}</td>
          <td>{this.props.status}</td>
          <td>{this.props.due}</td>
          <td>{this.props.title}</td>
          <td>{this.props.comments}</td>
        </tr>
    )
  }
});

var JobTable = React.createClass({
  render: function(){
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
          <JobRow id={1} status="To Do" due="October 12" title="Learn React" comments="" />
          <JobRow id={2} status="Complete" due="October 10" title="Finish Week 1 CS50x" comments="Start week 2 after" />
        </tbody>
      </table>
    )
  }
});

var JobAdd = React.createClass({
  render: function(){
    return(
      <div>Add a job</div>
    )
  }
});


var JobList = React.createClass({
  render: function(){
    return(
      <div>
        <h1> Job list </h1>
        <JobFilter />
        <hr />
        <JobTable />
        <hr />
        <JobAdd />
      </div>
    )
  }
})

ReactDOM.render(
  <JobList />,
  document.getElementById('main')
);

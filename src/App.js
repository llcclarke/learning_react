var JobFilter = React.createClass({
  render: function(){
    return(
      <div>Filter jobs</div>
    );
  }
})

var JobTable = React.createClass({
  render: function(){
    return(
      <div>Table of Jonbs</div>
    )
  }
})

var JobAdd = React.createClass({
  render: function(){
    return(
      <div>Add a job</div>
    )
  }
})

ReactDOM.render(
  <JobFilter />,
  <JobTable />,
  <JobAdd />,
  document.getElementById('main')
);

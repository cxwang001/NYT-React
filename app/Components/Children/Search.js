// Include React 
var React = require('react');

// This is the form component. 
var Search = React.createClass({

	// Here we set a generic state associated
	getInitialState: function(){
		return {
			term: "",
			startYear: 0,
			endYear: 0
		}
	},

	// This function will respond to the user input 
	handleChange: function(event){
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);
	},

	// When a user submits... 
	handleClick: function(){
		
		// Set the parent to have the search term
		this.props.setTerm(this.state.term);
		this.props.setStartYear(this.state.startYear);
		this.props.setEndYear(this.state.endYear);
	},

	// Here we render the function
	render: function(){

		return(
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Search</h3>
				</div>
				<div className="panel-body text-center">

						<form>
							<div className="form-group">
								<h4 className=""><strong>Topic</strong></h4>
								
								<input type="text" className="form-control text-center" id="term" onChange= {this.handleChange} required/>
								<br />
								<h4 className=""><strong>Start Year:</strong></h4>
								<input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
								<br />
								<h4 className=""><strong>End Year:</strong></h4>
								<input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
								<br />
								<button type="button" className="btn btn-primary" onClick={this.handleClick}>Submit</button>
							</div>

						</form>
				</div>
			</div>


		)
	}
});

module.exports = Search;
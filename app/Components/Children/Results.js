// Include React 
var React = require("react");

var helpers = require("../utils/helpers");

// This is the results component
var Results = React.createClass({

	handleSaveClick(titleToSave,dateToSave,urlToSave) {
		helpers.postHistory(titleToSave,dateToSave,urlToSave);
	
	},

	render: function(){

    

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Top Articles</h3>
				</div>
				<div className="panel-body text-center">
					
					{this.props.results.map((search, i) => {
              			return <form key={i} onSubmit={this.handleSaveClick.bind(null, search.title, search.date, search.url)}>{search.title} <br />{search.date} <br />{search.url} <br /><button type="submit">Save</button><br /><br /></form>
					})}

				</div>
			</div>

		)
	}
});




// Export the component back for use in other files
module.exports = Results;
var App = React.createClass({
	render: function() {
		return (
			<div> React {this.props.name} </div>
		);
	}
});

React.render(
	<App name="MyApp" />,
	document.getElementById('container')
);
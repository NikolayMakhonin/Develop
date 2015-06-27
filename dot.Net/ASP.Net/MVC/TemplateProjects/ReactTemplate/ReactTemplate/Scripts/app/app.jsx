///<reference path="api/MyApi.ts"/>

var App;
(function (App) {

	App.react = React.createClass({
		getInitialState: function()	 {
			return { name: 'Default name' };
		},
		componentDidMount: function() {
			var _this = this;
			App.Api.MyApi.getText()
				.done(function(data) {
					_this.state = data;
				});
		},
		render: function() {
			return (
				<div> React {this.props.name} </div>
			);
		}
	});
})(App || (App = {}));

React.render(
	<App.react name="MyApp" />,
	document.getElementById('container')
);
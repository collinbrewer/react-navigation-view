var React = require('react');
var ReactDOM = require('react-dom');
var ReactNavigationView = require('@collinbrewer/react-navigation-view');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactNavigationView />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

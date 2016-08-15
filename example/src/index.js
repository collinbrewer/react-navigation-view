var React = require('react');
var ReactDOM = require('react-dom');
var ReactNavigationView = require('../../src/ReactNavigationView.js');

class App extends React.Component {
	render () {
		let rootViews = [
			<div>test</div>
		];
		return (
			<div style={{margin: 'auto', width: '296px', border: '1px solid grey', marginBottom:'24px'}}>
				<ReactNavigationView ref='navigationView' defaultViews={rootViews} />
				<button onClick={this.handleClickPopOne}>pop one</button><button onClick={this.handleClickPushRandom}>push random</button>
			</div>
		);
	}

	handleClickPushRandom = () => {
		this.refs.navigationView.pushView(
			<div style={{height:40+(400*Math.random())}}>test!</div>
		);
	}

	handleClickPopOne = () => {
		this.refs.navigationView.popView();
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import ReactNavigationView from '../../src/ReactNavigationView.js'; // eslint-disable-line

class App extends React.Component { // eslint-disable-line

	constructor (props) {
		super(props);

		this.state = {
			randos: []
		};
	}

	render () {
		let rootViews = [
			<div key='test1'>test</div>
		];

		let childrenViews = [
			<div key={0}>test</div>
		].concat(this.state.randos.map((rando, i) => {
			return this.renderRando(rando, i + 1);
		}));

		return (
			<div style={{margin: 'auto', maxWidth: '296px', border: '1px solid grey', marginBottom: '24px'}}>
				<button onClick={this.handleClickPopAll}>pop all</button><button onClick={this.handleClickPopOne}>pop one</button><button onClick={this.handleClickPushRandom}>push random</button>
				<ReactNavigationView ref='navigationView1' defaultViews={[rootViews]} />

				<ReactNavigationView>
					{childrenViews}
				</ReactNavigationView>
			</div>
		);
	}

	renderRando (rando, key) {
		return (
			<div style={rando} key={key}>test {key}!</div>
		);
	}

	handleClickPushRandom = () => {
		let rando = {height: 40 + (400 * Math.random())};

		// uncontrolled
		this.refs.navigationView1.pushView(this.renderRando.bind(this, rando, this.refs.navigationView1.getViews().length));

		// controlled
		this.state.randos.push(rando);

		this.setState({
			randos: this.state.randos
		});
	}

	handleClickPopOne = () => {
		// uncontrolled
		this.refs.navigationView1.popView();

		// controlled
		this.state.randos.pop();

		this.setState({
			randos: this.state.randos
		});
	}

	handleClickPopAll = () => {
		// uncontrolled
		this.refs.navigationView1.popToRootView();

		// controlled
		this.setState({
			randos: []
		});
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

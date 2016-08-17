import React from 'react';
import {Motion, spring} from 'react-motion';
import Measure from 'react-measure';

class ReactNavigationView extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			pushedViews: [],
			viewDimensions: {},
			itemDimensions: {}
		};
	}

	componentWillMount () {
		if (this.props.defaultViews) {
			this.setState({
				defaultViews: this.props.defaultViews
			});
		}
	}

	componentWillReceiveProps (nextProps) {
		// if (nextProps.children) {
		// 	let transition;
		// 	let newLength = nextProps.children.length;
		// 	let curLength = this.props.children.length;
		//
		// 	if (newLength > curLength) {
		// 		transition = 'push';
		// 	}
		// 	else if (newLength < curLength) {
		// 		transition = 'pop';
		// 	}
		//
		// 	this.setState({
		// 	transition: transition
		// 	});
		// }
	}

	render () {
		let {
			// transition,
			transitionToIndex,
			viewDimensions,
			itemDimensions
		} = this.state;
		let views = this.getViews();
		let numViews = views.length;
		let startOffset = 0;
		let finalOffset;
		let {width} = viewDimensions;
		let {height} = itemDimensions;
		let index = (transitionToIndex === undefined ? (numViews - 1) : transitionToIndex);

		// if (transition === 'push') {
		// 	startOffset = ((index - 1) * width);
		// }
		// else if (transition === 'pop') {
		// 	startOffset = ((index + 1) * width);
		// }

		finalOffset = (index * width);

		let itemStyle = {
			display: 'inline-block',
			verticalAlign: 'top',
			width: width + 'px'
		};

		return (
			<Measure onMeasure={this.handleMeasureView}>
				<Motion
					defaultStyle={{x: startOffset, h: 0}}
					style={{x: spring(finalOffset), h: spring(height)}}
					onRest={this.handleMotionRest}>
					{
						(value) => {
							let h = ((index === 0 && numViews === 1) ? 'auto' : value.h);
							return (
								<div className='react-navigation-view' style={{overflow: 'hidden', whiteSpace: 'nowrap', height: h}}>
									<div className='react-navigation-view-slider' style={{transform: 'translateX(' + -value.x + 'px)'}}>
										{
											views.map((view, i) => {
												let item = (
														<div className='react-navigation-view-item' style={itemStyle} key={i}>
															{view}
														</div>
													);

												if (i === index) {
													item = (
															<Measure onMeasure={this.handleMeasureItem} key={i}>
																{item}
															</Measure>
														);
												}

												return item;
											})
											}
										</div>
									</div>
								);
						}
						}
				</Motion>
			</Measure>
		);
	}

	getViews () {
		// return [].concat(children || [], this.state.defaultViews);
		return [].concat(this.props.defaultViews, this.state.pushedViews);
	}

	pushView (view, options) {
		options || (options = {});
		this.setState({
			pushedViews: this.state.pushedViews.concat(view),
			onComplete: options.onComplete
		});
	}

	popView (options) {
		let {transitionToIndex} = this.state;
		let views = this.getViews();
		let length = Math.max(0, (transitionToIndex === undefined ? views.length : transitionToIndex - 1));

		if (length > 1) {
			this.popToView(views[length - 2], options);
		}
	}

	popToRootView () {
		this.popToView(this.getViews()[0]);
	}

	popToView (view, options) {
		options || (options = {});
		let index = this.getViews().indexOf(view);

		if (index !== -1) {
			this.setState({
				onComplete: options.onComplete,
				transitionToIndex: index
			});
		}
	}

	handleMotionRest = () => {
		let {onComplete, transitionToIndex} = this.state;

		if (onComplete) {
			onComplete();
			this.setState({
				onComplete: undefined
			});
		}

		// we finished transitioning, now we can remove the views
		if (transitionToIndex !== undefined) {
			let relativeIndex = transitionToIndex - this.props.defaultViews.length;

			this.setState({
				pushedViews: this.state.pushedViews.slice(0, relativeIndex + 1),
				transitionToIndex: undefined
			});
		}
	}

	handleMeasureView = (dimensions) => {
		this.setState({
			viewDimensions: dimensions
		});
	}

	handleMeasureItem = (dimensions) => {
		this.setState({
			itemDimensions: dimensions
		});
	}
}

ReactNavigationView.propTypes = {
	defaultViews: React.PropTypes.array
};

module.exports = ReactNavigationView;

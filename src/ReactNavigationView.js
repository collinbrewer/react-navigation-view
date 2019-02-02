import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
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

	handleMotionRest = () => {
		const { onComplete } = this;
		let { transitionToIndex } = this.state;

		if (onComplete) {
			onComplete();
			this.onComplete = undefined;
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

	handleResizeView = (contentRect) => {
		this.setState({
			viewDimensions: contentRect.bounds
		});
	}

	handleResizeItem = (contentRect) => {
		this.setState({
			itemDimensions: contentRect.bounds
		});
	}

	getIndex () {
		const { transitionToIndex } = this.props;
		const numViews = this.getViews().length;

		return (transitionToIndex === undefined ? (numViews - 1) : transitionToIndex);
	}

	renderView = (view, i) => {
		const { viewDimensions } = this.state;
		const index = this.getIndex();
		const { width } = viewDimensions;
		const itemStyle = {
			display: 'inline-block',
			verticalAlign: 'top',
			width: (isNaN(width) ? 'auto' : `${width}px`),
			whiteSpace: 'normal'
		};
		const renderedView = (typeof view === 'function' ? view() : view);

		if (i === index) {
			return (
				<Measure bounds onResize={this.handleResizeItem} key={i}>
					{
						({ measureRef }) => {
							return (
								<div ref={measureRef} className='react-navigation-view-item' style={itemStyle}>
									{renderedView}
								</div>
							);
						}
					}
				</Measure>
			);
		}

		return (
			<div className='react-navigation-view-item' style={itemStyle} key={i}>
				{renderedView}
			</div>
		);
	}

	renderMotionFrame = (frame, measureRef) => {
		const index = this.getIndex();
		const views = this.getViews();
		const numViews = views.length;
		const h = ((index === 0 && numViews === 1) ? 'auto' : frame.h);

		console.assert(numViews > 0, 'Must have at least one view');

		return (
			<div className='react-navigation-view' style={{overflow: 'hidden', whiteSpace: 'nowrap', height: h}} ref={measureRef}>
				<div className='react-navigation-view-slider' style={{transform: 'translateX(' + -frame.x + 'px)'}}>
					{views.map(this.renderView)}
				</div>
			</div>
		);
	}

	renderMotion = ({ measureRef }) => {
		const {
			// transition,
			viewDimensions,
			itemDimensions
		} = this.state;
		const startOffset = 0;
		const { width } = viewDimensions;
		const { height } = itemDimensions;

		// if (transition === 'push') {
		// 	startOffset = ((index - 1) * width);
		// }
		// else if (transition === 'pop') {
		// 	startOffset = ((index + 1) * width);
		// }

		// height = (isNaN(height) ? 'auto' : height);

		if (isNaN(width) || isNaN(height)) {
			return this.renderMotionFrame({ x: 0, height: 'auto' }, measureRef);
		}

		const index = this.getIndex();
		const finalOffset = (index * width);

		return (
			<Motion
				defaultStyle={{x: startOffset, h: 0}}
				style={{ x: spring(finalOffset), h: spring(height) }}
				onRest={this.handleMotionRest}
			>
				{(f) => this.renderMotionFrame(f, measureRef)}
			</Motion>
		);
	}

	render () {
		return (
			<Measure bounds onResize={this.handleResizeView}>
				{this.renderMotion}
			</Measure>
		);
	}

	getViews () {
		let views;

		if (this.props.defaultViews) {
			views = [].concat(this.props.defaultViews, this.state.pushedViews);
		}
		else {
			views = [].concat(this.props.children);
		}

		return views;
	}

	/**
	 * Pushes a new item on to the navigation stack
	 * @param	[mixed]		view						A react component, or a function that returns a react component
	 * @param	[object]		options					Options for the push
	 * @param	[function]	options.onComplete	A function called when the push is complete
	 */
	pushView (view, options) {
		options || (options = {});
		this.onComplete = options.onComplete;
		this.setState({
			pushedViews: this.state.pushedViews.concat(view)
		});
	}

	popView (options) {
		const {transitionToIndex} = this.state;
		const views = this.getViews();
		const length = Math.max(0, (transitionToIndex === undefined ? views.length : transitionToIndex - 1));

		if (length > 1) {
			this.popToView(views[length - 2], options);
		}
	}

	popToRootView () {
		this.popToView(this.getViews()[0]);
	}

	popToView (view, options = {}) {
		const index = this.getViews().indexOf(view);

		if (index !== -1) {
			this.setState({
				transitionToIndex: index
			});
			this.onComplete = options.onComplete;
		}
	}
}

ReactNavigationView.propTypes = {
	defaultViews: PropTypes.array
};

module.exports = ReactNavigationView;

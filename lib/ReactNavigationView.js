'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMotion = require('react-motion');

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactNavigationView = function (_React$Component) {
	_inherits(ReactNavigationView, _React$Component);

	function ReactNavigationView(props) {
		_classCallCheck(this, ReactNavigationView);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReactNavigationView).call(this, props));

		_this.handleMotionRest = function () {
			var _this$state = _this.state;
			var onComplete = _this$state.onComplete;
			var transitionToIndex = _this$state.transitionToIndex;


			if (onComplete) {
				onComplete();
				_this.setState({
					onComplete: undefined
				});
			}

			// we finished transitioning, now we can remove the views
			if (transitionToIndex !== undefined) {
				_this.setState({
					views: _this.state.views.slice(0, transitionToIndex + 1),
					transitionToIndex: undefined
				});
			}
		};

		_this.handleMeasureView = function (dimensions) {
			_this.setState({
				viewDimensions: dimensions
			});
		};

		_this.handleMeasureItem = function (dimensions) {
			_this.setState({
				itemDimensions: dimensions
			});
		};

		_this.state = {
			views: [],
			viewDimensions: {},
			itemDimensions: {}
		};
		return _this;
	}

	_createClass(ReactNavigationView, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			if (this.props.defaultViews) {
				this.setState({
					views: this.props.defaultViews
				});
			}
		}

		// componentWillReceiveProps (nextProps) {
		//	if(nextProps.children) {
		//	 let transition;
		//	 let newLength = nextProps.children.length;
		//	 let curLength = this.props.children.length;
		//
		//	 if(newLength > curLength) {
		//		transition = 'push';
		//	 }
		//	 else if (newLength < curLength) {
		//		transition = 'pop';
		//	 }
		//
		//	 this.setState({
		//		transition: transition
		//	 });
		//	}
		// }

	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state;
			var views = _state.views;
			var transitionToIndex = _state.transitionToIndex;
			var viewDimensions = _state.viewDimensions;
			var itemDimensions = _state.itemDimensions;
			var children = this.props.children;

			var mountedViews = [].concat(children || [], views);
			var numViews = mountedViews.length;
			var startOffset = 0;
			var finalOffset = void 0;
			var width = viewDimensions.width;
			var height = itemDimensions.height;

			var index = transitionToIndex === undefined ? numViews - 1 : transitionToIndex;

			// if (transition === 'push') {
			// 	startOffset = ((index - 1) * width);
			// }
			// else if (transition === 'pop') {
			// 	startOffset = ((index + 1) * width);
			// }

			finalOffset = index * width;

			var itemStyle = {
				display: 'inline-block',
				verticalAlign: 'top',
				width: width + 'px'
			};

			return _react2.default.createElement(
				_reactMeasure2.default,
				{ onMeasure: this.handleMeasureView },
				_react2.default.createElement(
					_reactMotion.Motion,
					{
						defaultStyle: { x: startOffset, h: 0 },
						style: { x: (0, _reactMotion.spring)(finalOffset), h: (0, _reactMotion.spring)(height) },
						onRest: this.handleMotionRest },
					function (value) {
						var h = index === 0 && numViews === 1 ? 'auto' : value.h;
						return _react2.default.createElement(
							'div',
							{ className: 'react-navigation-view', style: { overflow: 'hidden', whiteSpace: 'nowrap', height: h } },
							_react2.default.createElement(
								'div',
								{ className: 'react-navigation-view-slider', style: { marginLeft: -value.x } },
								mountedViews.map(function (view, i) {
									var item = _react2.default.createElement(
										'div',
										{ className: 'react-navigation-view-item', style: itemStyle, key: i },
										view
									);

									if (i === index) {
										item = _react2.default.createElement(
											_reactMeasure2.default,
											{ onMeasure: _this2.handleMeasureItem },
											item
										);
									}

									return item;
								})
							)
						);
					}
				)
			);
		}
	}, {
		key: 'pushView',
		value: function pushView(view, options) {
			options || (options = {});
			this.setState({
				views: this.state.views.concat(view),
				onComplete: options.onComplete
			});
		}
	}, {
		key: 'popView',
		value: function popView(options) {
			var _state2 = this.state;
			var views = _state2.views;
			var transitionToIndex = _state2.transitionToIndex;

			var length = Math.max(0, transitionToIndex === undefined ? views.length : transitionToIndex - 1);

			if (length > 1) {
				this.popToView(views[length - 2], options);
			}
		}
	}, {
		key: 'popToView',
		value: function popToView(view, options) {
			options || (options = {});
			var index = this.state.views.indexOf(view);

			if (index !== -1) {
				this.setState({
					onComplete: options.onComplete,
					transitionToIndex: index
				});
			}
		}
	}]);

	return ReactNavigationView;
}(_react2.default.Component);

module.exports = ReactNavigationView;
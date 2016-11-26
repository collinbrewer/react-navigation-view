import React from 'react'; // eslint-disable-line
import {expect} from 'chai';
import {mount} from 'enzyme';

describe.only('ReactNavigationView', function () {
	var ReactNavigationView = require('../src/ReactNavigationView.js'); // eslint-disable-line

	context('#render', () => {
		it('renders initial views', function () {
			let wrapper = mount(<ReactNavigationView defaultViews={[
				<div id='root-item'>root</div>
			]} />);

			expect(wrapper.find('#root-item')).to.have.length(1);
		});
	});

	context.skip('#componentWillReceiveProps', () => {
		it('should set transition state to push for more', () => {
			// let wrapper = shallow(<ReactNavigationView />);
		});
	});

	context('#pushView', () => {
		it('should append view to state views');
		it('should render the view');
		it('should call the completion callback');
	});

	context('#popView', () => {
		it('should call popToView');
	});

	context('#popToView', () => {
		it('should remove the view from state views');
		it('should remove the view');
		it('should call the completion callback');
	});

	context('#handleMotionRest', () => {
		it('should call the completion callback');
		it('should remove existing transitions from state');
	});
});

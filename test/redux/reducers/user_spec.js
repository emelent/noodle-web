import {expect} from 'chai';
import {Map} from 'immutable';

import reducer, {actionType, INIT_STATE} from '../../../src/redux/reducers/user';


const email = 'test@gmail.com';
const id 		= 12;
const error = 'error';

const states = {
	FETCH_USER_PENDING: Map({
		email: null,
		id: null,
		pending: true,
		error: false
	}),
	FETCH_USER_FULFILLED: Map({
		email,
		id,
		pending: false,
		error: false
	}),
	FETCH_USER_REJECTED: Map({
		email: null,
		id: null,
		pending: false,
		error
	}),
	CLEAR_USER: Map({
		email: null,
		id: null,
		pending: false,
		error: false
	}),
	CLEAR_USER_ERROR: Map({
		email: null,
		id: null,
		pending: false,
		error: null
	})
};

describe('User Reducer', () => {

	it('handles FETCH_USER_PENDING action', () => {
		let state = INIT_STATE;
		let action = {type: actionType.FETCH_USER_PENDING};
		let nextState = reducer(state, action);
		expect(nextState).to.equal(states.FETCH_USER_PENDING);
	});

	it('handles FETCH_USER_FULFILLED action', () => {
		let state = states.FETCH_USER_PENDING;
		let action = {
			type: actionType.FETCH_USER_FULFILLED,
			payload: {email, id}
		};
		let nextState = reducer(state, action);
		expect(nextState).to.equal(states.FETCH_USER_FULFILLED);
	});

	it('handles FETCH_USER_REJECTED action', () => {
		let state = states.FETCH_USER_PENDING;
		let action = {
			type: actionType.FETCH_USER_REJECTED,
			payload: {error}
		};
		let nextState = reducer(state, action);
		expect(nextState).to.equal(states.FETCH_USER_REJECTED);
	});

	it('handles CLEAR_USER action', () => {
		let state = states.FETCH_USER_FULFILLED;
		let action = {type: actionType.CLEAR_USER};
		let nextState = reducer(state, action);
		expect(nextState).to.equal(states.CLEAR_USER);
	});

	it('handles CLEAR_USER_ERROR action', () => {
		let state = states.FETCH_USER_REJECTED;
		let action = {type: actionType.CLEAR_USER_ERROR};
		let nextState = reducer(state, action);
		expect(nextState).to.equal(states.CLEAR_USER_ERROR);
	});
});

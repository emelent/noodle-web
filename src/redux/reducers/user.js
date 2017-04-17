import {Map, fromJS} from 'immutable';

export const INIT_STATE = Map({
	email: null,
	id: null,
	pending: false,
	error: false
});

export const actionType = {
	FETCH_USER_PENDING		: 'FETCH_USER_PENDING',
	FETCH_USER_FULFILLED	: 'FETCH_USER_FULFILLED',
	FETCH_USER_REJECTED		: 'FETCH_USER_REJECTED',

	CLEAR_USER_ERROR			: 'CLEAR_USER_ERROR',
	CLEAR_USER						: 'CLEAR_USER'
};

export default (state=INIT_STATE, action) => {
	switch(action.type){
		case actionType.FETCH_USER_PENDING:
			return state.set('pending', true);

		case actionType.FETCH_USER_FULFILLED:
			return state.merge({
				email: action.payload.email,
				id: action.payload.id,
				pending: false
			});
		
		case actionType.FETCH_USER_REJECTED:
			return state.merge({
				pending: false,
				error: action.payload.error
			});

		case actionType.CLEAR_USER_ERROR:
			return state.set('error', null);

		case actionType.CLEAR_USER:
			return INIT_STATE;
	}

	return state;
}
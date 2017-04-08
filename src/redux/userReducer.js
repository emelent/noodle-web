import axios from 'axios';
import {Map, fromJS} from 'immutable';
import {API_URL} from '../config';

export const INIT_STATE = fromJS({
	token: null,
	login: {
		pending: false,
		error: null
	},
	logout:{
		pending: false,
		error: null
	}
});

// user action types
export const type = {
  LOGIN_TYPE      : 'LOG_IN',
  LOGIN_PENDING   : 'LOG_IN_PENDING',
  LOGIN_FULFILLED : 'LOG_IN_FULFILLED',
  LOGIN_REJECTED  : 'LOG_IN_REJECTED',
  USER_RESET      : 'USER_RESET',

  LOGOUT_TYPE     : 'LOG_OUT',
  LOGOUT_PENDING  : 'LOG_OUT_PENDING',
  LOGOUT_FULFILLED: 'LOG_OUT_FULFILLED',
  LOGOUT_REJECTED : 'LOG_OUT_REJECTED',

  REFRESH_TOKEN   : 'REFRESH_TOKEN',
  RE_ENSTATE_TOKEN: 'RE_ENSTATE_TOKEN'
};

// user reducer
export default function reducer(state=INIT_STATE, action){
	switch(action.type){
		case type.LOGIN_PENDING:
      return state.setIn(['login', 'pending'], true);

		case type.LOGIN_FULFILLED:
      return state.mergeDeep({
        token: action.payload.token,
        login: {
          pending:false,
          error: null
        }
      });

		case type.LOGIN_REJECTED:
      return state.mergeDeep({
        login: {
          pending: false,
          error: action.payload.error
        }
      });

		case type.LOGOUT_PENDING:
      return state.setIn(['logout', 'pending'], true);

		case type.LOGOUT_FULFILLED:
		case type.USER_RESET:
			return INIT_STATE;

		case type.LOGOUT_REJECTED:
      return state.mergeDeep({
        logout: {
          pending: false,
          error: action.payload.error
        }
      });

    case type.REFRESH_TOKEN:
      return state.set('token', action.payload.token);

    case type.RE_ENSTATE_TOKEN:
      return state.set('token', action.payload.token);
	}

	return state;
}

export function attemptLogin(email, password){
	return (dispatch) => {
		dispatch({
			type: type.LOGIN_TYPE,
      payload: axios.post(`${API_URL}/auth/login/`, {email, password})
		});
	};
}


import axios from 'axios';
import {Map, fromJS} from 'immutable';
import {API_URL} from '../config';

export const INIT_STATE = fromJS({
	email: null,
	password: null,
	uid: null,
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
};

// user reducer
export default function reducer(state=INIT_STATE, action){
	switch(action.type){
		case type.LOGIN_PENDING:
      return state.mergeDeep({
        email: action.payload.email,
        password: action.payload.password,
        login:{pending: true}
      });

		case type.LOGIN_FULFILLED:
      return state.mergeDeep({
        uid: action.payload.uid,
        token: action.payload.token,
        login: {
          pending:false,
          error: null
        }
      });

		case type.LOGIN_REJECTED:
			return{
				...state,
				login:{
					...state.login,
					pending: false,
					date: null,
          error: {
            message: null
          }
				}
			};
		case type.LOGOUT_PENDING:
			return{
				...state,
				logout:{
					...state.logout,
					pending: true
				}
			};

		case type.LOGOUT_FULFILLED:
		case type.USER_RESET:
			return INIT_STATE;

		case type.LOGOUT_REJECTED:
			return{
				...state,
				logout:{
					...state.logout,
					pending: false,
          error: {
            message: null
          }
				}
			};
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


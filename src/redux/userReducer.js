import axios from 'axios';
import {Map, fromJS} from 'immutable';
import {API_URL} from '../config';

export const INIT_STATE = Map({
	token  : null,
  pending: false,
  error  : null
});

// user action types
export const type = {
  LOGIN_TYPE              : 'LOG_IN',
  LOGIN_PENDING           : 'LOG_IN_PENDING',
  LOGIN_FULFILLED         : 'LOG_IN_FULFILLED',
  LOGIN_REJECTED          : 'LOG_IN_REJECTED',

  REFRESH_TYPE            : 'REFRESH_TOKEN',
  REFRESH_TOKEN_PENDING   : 'REFRESH_TOKEN_PENDING',
  REFRESH_TOKEN_FULFILLED : 'REFRESH_TOKEN_FULFILLED',
  REFRESH_TOKEN_REJECTED  : 'REFRESH_TOKEN_REJECTED',

  RE_ENSTATE_TOKEN        : 'RE_ENSTATE_TOKEN',
  LOGOUT                  : 'LOGOUT',
  CLEAR_ERROR             : 'CLEAR_ERROR'
};

// user reducer
export default function reducer(state=INIT_STATE, action){
	switch(action.type){
		case type.LOGIN_PENDING:
      return state.set('pending', true);

    case type.RE_ENSTATE_TOKEN:
    case type.REFRESH_TOKEN_FULFILLED:
		case type.LOGIN_FULFILLED:
      return state.merge({
        token: action.payload.token,
        pending:false,
        error: null
      });

    case type.REFRESH_TOKEN_REJECTED:
		case type.LOGIN_REJECTED:
      return state.merge({
        pending: false,
        error: action.payload.error
      });

		case type.LOGOUT:
			return INIT_STATE;

    case type.REFRESH_TOKEN_PENDING:
      return state.set('pending', true);

    case type.CLEAR_ERROR:
      return state.set('error', null);
	}

	return state;
}

export function userLogIn(email, password){
	return (dispatch) => {
		dispatch({
			type: type.LOGIN_TYPE,
      payload: axios.post(`${API_URL}/auth/login/`, {email, password})
		});
	};
}

export function userRefreshToken(){
	return (dispatch) => {
		dispatch({
			type: type.LOGIN_TYPE,
      payload: axios.post(`${API_URL}/auth/refresh/`, {email, password})
		});
	};
}

export function userLogOut(){
  return (dispatch) => {
    dispatch({type: type.LOGOUT});
  }
}

export function userClearError(){
  return (dispatch) => dispatch({type: type.CLEAR_ERROR});
}


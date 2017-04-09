import axios from 'axios';
import {Map, fromJS} from 'immutable';
import {API_URL} from '../config';


//key for token in cache
const TOKEN_KEY = 'TOKEN_KEY';

//initial state
export const INIT_STATE = Map({
	token  : null,
  pending: false,
  error  : null
});

// user action actionTypes
export const actionType = {
  LOGIN_actionType              : 'LOG_IN',
  LOGIN_PENDING           : 'LOG_IN_PENDING',
  LOGIN_FULFILLED         : 'LOG_IN_FULFILLED',
  LOGIN_REJECTED          : 'LOG_IN_REJECTED',

  REFRESH_actionType            : 'REFRESH_TOKEN',
  REFRESH_TOKEN_PENDING   : 'REFRESH_TOKEN_PENDING',
  REFRESH_TOKEN_FULFILLED : 'REFRESH_TOKEN_FULFILLED',
  REFRESH_TOKEN_REJECTED  : 'REFRESH_TOKEN_REJECTED',

  RE_ENSTATE_TOKEN        : 'RE_ENSTATE_TOKEN',
  LOGOUT                  : 'LOGOUT',
  CLEAR_ERROR             : 'CLEAR_USER_ERROR'
};

//user action creators
export const actionCreator = {
  //login action creator
  login: (email, password) => {
    return (dispatch) => {
      dispatch({
        type: actionType.LOGIN_actionType,
        payload: axios.post(`${API_URL}/auth/login/`, {email, password})
      });
    };
  },

  //clears user's api token from state and cache
  logout: () => {
    clearToken();
    return (dispatch) => {
      dispatch({type: actionType.LOGOUT});
    }
  },

  //refreshes user's api token
  refreshToken: () => {
    return (dispatch) => {
      dispatch({
        type: actionType.LOGIN_actionType,
        payload: axios.post(`${API_URL}/auth/refresh/`, {email, password})
      });
    };
  },

  //clears error from state
  clearError: () => {
    return (dispatch) => {
      dispatch({type: actionType.CLEAR_ERROR});
    };
  },

  //updates state token with cached token
  reEnstateToken: () => {
    let token = retrieveToken();
    if(token !== null && token !== undefined){
      return (dispatch) => dispatch({
        type: actionType.RE_ENSTATE_TOKEN,
        payload: {token}
      });
    }

    return () => {};
  }
};

//cache token
function cacheToken(token){
  if(this && this.hasOwnProperty('window')){
    window.localStorage.setItem(TOKEN_KEY, token);
  }
}

//retrieve token from cache
function retrieveToken(){
  if(this && this.hasOwnProperty('window'))
    return window.localStorage.getItem(TOKEN_KEY);
}

//clear token from cache
function clearToken(){
  if(this && this.hasOwnProperty('window'))
    window.localStorage.removeItem(TOKEN_KEY);
}

// user reducer
export default function reducer(state=INIT_STATE, action){
	switch(action.type){
		case actionType.LOGIN_PENDING:
      return state.set('pending', true);

    case actionType.RE_ENSTATE_TOKEN:
      return state.set('token', action.payload.token);

    case actionType.REFRESH_TOKEN_FULFILLED:
		case actionType.LOGIN_FULFILLED:
      cacheToken(action.payload.token);
      return state.merge({
        token: action.payload.token,
        pending:false
      });

    case actionType.REFRESH_TOKEN_REJECTED:
		case actionType.LOGIN_REJECTED:
      return state.merge({
        pending: false,
        error: action.payload.error
      });

		case actionType.LOGOUT:
			return INIT_STATE;

    case actionType.REFRESH_TOKEN_PENDING:
      return state.set('pending', true);

    case actionType.CLEAR_ERROR:
      return state.set('error', null);
	}

	return state;
}


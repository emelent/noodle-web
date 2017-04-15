import {hashHistory} from 'react-router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import URLSearchParams from 'url-search-params';
import {Map, fromJS} from 'immutable';
import {API_URL, TOKEN_KEY, user} from '../config';


//initial state
export const INIT_STATE = Map({
	token  : null,
  pending: false,
  error  : null
});

// user action actionTypes
export const actionType = {
  LOGIN_PENDING           : 'LOG_IN_PENDING',
  LOGIN_FULFILLED         : 'LOG_IN_FULFILLED',
  LOGIN_REJECTED          : 'LOG_IN_REJECTED',

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
  login: (email, password) => dispatch => {
    //dispatch pending
    dispatch({type: actionType.LOGIN_PENDING});
    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    axios.post(`${API_URL}/auth/login/`, params)
      .then(response => {
        dispatch({
          type: actionType.LOGIN_FULFILLED,
          payload: response.data
        });
        hashHistory.push('/select-modules');
      })
      .catch(error => {
        let msg;
        if(error.response){
          let data = error.response.data;
          msg = data;
          if(typeof data === 'object'){
            msg = '';
            for(let prop in data){
              msg += data[prop];
              break;
            }
          }
        }else{
          msg = error.message;
        }
        dispatch({
          type: actionType.LOGIN_REJECTED,
          payload: {error: msg}
        });
      });
  },

  //clears user's api token from state and cache
  logout: () => dispatch => {
    clearToken();
    dispatch({type: actionType.LOGOUT});
  },

  //refreshes user's api token
  refreshToken: () => dispatch => {
    dispatch({type: actionType.REFRESH_TOKEN_PENDING});
    axios.get(`${API_URL}/auth/refresh/`)
      .then(response => dispatch({
          type: actionType.REFRESH_TOKEN_FULFILLED,
          payload: response.data
        }))
      .catch(error => dispatch({
        type: actionType.REFRESH_TOKEN_REJECTED,
        payload: {error: error.response.data}
      }));
  },

  //clears error from state
  clearError: () => (dispatch) => dispatch({type: actionType.CLEAR_ERROR}),

  //updates state token with cached token
  reEnstateToken: () => dispatch => {
    let token = retrieveToken();

    if(token !== null && token !== undefined){
      let decoded = jwtDecode(token);

      //check if token is expired
      if(decoded.exp < Date.now() / 1000){
        clearToken();
        return;
      }
      //refresh token if active token found
      dispatch({
        type: actionType.RE_ENSTATE_TOKEN,
        payload: {token}
      });
      actionCreator.refreshToken()(dispatch);
      hashHistory.push('/select-modules');
    }
  }
};

//set axios authorization header
function setAuthorizationHeader(token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

//clear axios authorization header
function clearAuthorizationHeader(){
  axios.defaults.headers.common['Authorization'] = undefined;
}

//cache token
function cacheToken(token){
  try{
    window.localStorage.setItem(TOKEN_KEY, token);
  }catch(e){}
}

//retrieve token from cache
function retrieveToken(){
  try{
    return window.localStorage.getItem(TOKEN_KEY);
  }catch(e){}

  return null;
}

//clear token from cache
function clearToken(){
  try{
    window.localStorage.removeItem(TOKEN_KEY);
  }catch(e){}
}

// user reducer
export default function reducer(state=INIT_STATE, action){
	switch(action.type){
		case actionType.LOGIN_PENDING:
      return state.set('pending', true);

    case actionType.RE_ENSTATE_TOKEN:
      setAuthorizationHeader(action.payload.token);
      return state.set('token', action.payload.token);

    case actionType.REFRESH_TOKEN_FULFILLED:
		case actionType.LOGIN_FULFILLED:
      cacheToken(action.payload.token);
      setAuthorizationHeader(action.payload.token);

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
      clearAuthorizationHeader();
			return INIT_STATE;

    case actionType.REFRESH_TOKEN_PENDING:
      return state.set('pending', true);

    case actionType.CLEAR_ERROR:
      return state.set('error', null);
	}

	return state;
}


import {hashHistory} from 'react-router';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import URLSearchParams from 'url-search-params';

import {actionType} from '../reducers/user';
import {API_URL, TOKEN_KEY} from '../../config';


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

//retrieve decoded jwt
function retrieveDecodedJwt(){
  let token = retrieveToken();
  if(token)
    return jwtDecode(token);
  return null;
}

//clear token from cache
function clearToken(){
  try{
    window.localStorage.removeItem(TOKEN_KEY);
  }catch(e){}
}

//login action creator
export const login = (email, password) => dispatch => {
  let params = new URLSearchParams();
  params.append('email', email);
  params.append('password', password);

  dispatch({type: actionType.LOGIN_PENDING});
  axios.post(`${API_URL}/auth/login/`, params)
    .then(response => {
      cacheToken(response.data.token);
      setAuthorizationHeader(response.data.token);

      dispatch({
        type: actionType.LOGIN_FULFILLED,
        payload: response.data
      });
      hashHistory.push('/add-modules');
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
};

//clears user's api token from state and cache
export const logout = () => dispatch => {
  clearToken();
  clearAuthorizationHeader();
  dispatch({type: actionType.LOGOUT});
}

//refreshes user's api token
export const refreshToken = () => dispatch => {
  dispatch({type: actionType.REFRESH_TOKEN_PENDING});
  axios.get(`${API_URL}/auth/refresh/`)
    .then(response => {
      cacheToken(response.data.token);
      setAuthorizationHeader(response.data.token);

      dispatch({
        type: actionType.REFRESH_TOKEN_FULFILLED,
        payload: response.data
      });
      hashHistory.push('/add-modules');
    })
    .catch(error => dispatch({
      type: actionType.REFRESH_TOKEN_REJECTED,
      payload: {error: error.response.data}
    }));
};

//clears error from state
export const clearError = () => (dispatch) => dispatch({
  type: actionType.CLEAR_ERROR
});

//updates state token with cached token
export const reEnstateToken = () => dispatch => {
  if(isAuthenticated()){
    let token = retrieveToken();
    setAuthorizationHeader(token);
    dispatch({
      type: actionType.RE_ENSTATE_TOKEN,
      payload: {token}
    });
    refreshToken()(dispatch);
  }
}

//check if current user is authenticated
export const isAuthenticated = () => {
  let jwt = retrieveDecodedJwt();
  return (jwt && jwt.exp < Date.now() / 1000);
}

import {hashHistory} from 'react-router';

import jwtDecode from 'jwt-decode';
import axios from 'axios';

import {actionType} from './modulesReducer';
import {API_URL, TOKEN_KEY} from '../config';

let jwt = null;
import URLSelectedarchParams from 'url-search-params';



try{
  let token = window.localStorage.getItem(TOKEN_KEY);
  if(token)
    jwt = jwtDecode();
}catch(e){}


export const fetchAvailableModules = () => (dispatch) => {
  dispatch({type: actionType.FETCH_AV_MODULES_PENDING});
  axios.get(`${API_URL}/modules/`)
    .then((response) => dispatch({
      type: actionType.FETCH_AV_MODULES_FULFILLED,
      payload: response.data
    }))
    .catch((error) => {
      dispatch({
        type: actionType.FETCH_AV_MODULES_REJECTED,
        payload: error.response.data
      });
    });
};

export const fetchSelectedModules = () => (dispatch) => {
  if(jwt == null){
    hashHistory.push('/login');
    return;
  }

  dispatch({type: actionType.FETCH_SE_MODULES_PENDING});
  axios.get(`${API_URL}/users/${jwt.sub}/modules/`)
    .then((response) => dispatch({
      type: actionType.FETCH_SE_MODULES_FULFILLED,
      payload: response.data
    }))
    .catch((error) => {
      dispatch({
        type: actionType.FETCH_SE_MODULES_REJECTED,
        payload: error.response.data
      });
    });
};

export const updateSelectedModules = (modules) => (dispatch) => {
  dispatch({type: actionType.UPDATE_SE_MODULES_PENDING});
  let params = new URLSelectedarchParams();
  params.append('modules', JSON.stringify(modules));
  axios.put(`${API_URL}/users/${jwt.sub}/modules/`, params)
    .then((response) => dispatch({
      type: actionType.UPDATE_SE_MODULES_FULFILLED,
      payload: response.data
    }))
    .catch((error) => {
      dispatch({
        type: actionType.UPDATE_SE_MODULES_REJECTED,
        payload: error.response.data
      });
    });
};

export const clearAvailableModulesError = () => (dispatch) => dispatch({
  type: actionType.CLEAR_AV_ERROR
});


export const clearSelectedModulesError = () => (dispatch) => dispatch({
  type: actionType.CLEAR_SE_ERROR
});


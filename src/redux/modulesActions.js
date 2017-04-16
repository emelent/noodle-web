import {hashHistory} from 'react-router';

import axios from 'axios';
import URLSelectedarchParams from 'url-search-params';

import {actionType} from './modulesReducer';
import {API_URL} from '../config';




export const fetchAvailableModules = () => (dispatch) => {
  dispatch({type: actionType.FETCH_AV_MODULES_PENDING});
  axios.get(`${API_URL}/modules/`)
    .then((response) => dispatch({
      type: actionType.FETCH_AV_MODULES_FULFILLED,
      payload: response.data
    }))
    .catch((error) => {
        type: actionType.FETCH_AV_MODULES_REJECTED,
      dispatch({
        payload: error.response.data
      });
    });
};

export const fetchSelectedModules = () => (dispatch) => {
  dispatch({type: actionType.FETCH_SE_MODULES_PENDING});
  axios.get(`${API_URL}/user/modules/`)
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
  axios.put(`${API_URL}/user/modules/`, params)
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


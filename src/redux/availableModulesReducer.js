import axios from 'axios';
import {fromJS, List} from 'immutable';
import {API_URL} from '../config';


export const INIT_STATE = fromJS({
  availableModules: [],
  hiddenModules: [],
  filter: '',
  pending: false,
  error: null
});

export const actionType = {
  FETCH_TYPE              : 'FETCH_AV_MODULES',
  FETCH_MODULES_PENDING   : 'FETCH_AV_MODULES_PENDING',
  FETCH_MODULES_FULFILLED : 'FETCH_AV_MODULES_FULFILLED',
  FETCH_MODULES_REJECTED  : 'FETCH_AV_MODULES_REJECTED',

  FILTER                  : 'FILTER_AV',

  SET_HIDDEN_MODULES            : 'SET_HIDDEN_MODULES',

  CLEAR_ERROR             : 'CLEAR_AV_MODULES_ERROR'
};

export const actionCreator = {
  fetchModules: () => {
    //TODO fix up axios headers after login
    return dispatch => dispatch({
      type: actionType.FETCH_TYPE,
      payload: axios.get(`${API_URL}/modules/`) 
    });
  },

  setHiddenModules: modules => dispatch => dispatch({
    type: actionType.HIDE_MODULES,
    payload: {modules}
  }),

  setFilter: filter => dispatch => dispatch({
    type: actionType.FILTER,
    payload: {filter}
  }),

  clearError: () => dispatch => dispatch({
    type: actionType.CLEAR_ERROR
  })
};

export default function reducer(state=INIT_STATE, action){
  switch(action.type){
    case actionType.FETCH_MODULES_PENDING:
      return state.set('pending', true);
    case actionType.FETCH_MODULES_FULFILLED:
      return state.merge({
        pending: false, 
        availableModules: List(action.payload)
      });
    case actionType.FETCH_MODULES_REJECTED:
      return state.merge({
        pending: false, 
        error: action.payload.error
      });

    case actionType.SET_HIDDEN_MODULES:
      return state.set('hiddenModules', List(action.payload.modules));

    case actionType.FILTER:
      return state.set('filter', action.payload.filter);

    case actionType.CLEAR_ERROR:
      return state.set('error', null);
  } 

  return state;
}

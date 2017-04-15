import {fromJS, List} from 'immutable';


export const INIT_STATE = fromJS({
  available: {
    modules: [],
    pending: false,
    error: null
  },
  selected: {
    modules: [],
    pending: false,
    error: null
  }
});


export const actionType = {
  FETCH_AV_MODULES_PENDING    : 'FETCH_AV_MODULES_PENDING',
  FETCH_AV_MODULES_FULFILLED  : 'FETCH_AV_MODULES_FULFILLED',
  FETCH_AV_MODULES_REJECTED   : 'FETCH_AV_MODULES_REJECTED',


  FETCH_SE_MODULES_PENDING    : 'FETCH_SE_MODULES_PENDING',
  FETCH_SE_MODULES_FULFILLED  : 'FETCH_SE_MODULES_FULFILLED',
  FETCH_SE_MODULES_PENDING    : 'FETCH_SE_MODULES_REJECTED',

  UPDATE_SE_MODULES_PENDING   : 'UPDATE_SE_MODULES_PENDING',
  UPDATE_SE_MODULES_FULFILLED : 'UPDATE_SE_MODULES_FULFILLED',
  UPDATE_SE_MODULES_REJECTED  : 'UPDATE_SE_MODULES_REJECTED',

  CLEAR_SE_ERROR              : 'CLEAR_SE_MODULES_ERROR',
  CLEAR_AV_ERROR              : 'CLEAR_AV_MODULES_ERROR',
};

export default function reducer(state=INIT_STATE, action){
  switch(action.type){
    //handles fetching of available modules
    case actionType.FETCH_AV_MODULES_PENDING:
      return state.setIn(['available','pending'], true);
    case actionType.FETCH_AV_MODULES_FULFILLED:
      return state.mergeDeep({
        available: {
          pending: false,
          modules: List(action.payload)
        }
      });
    case actionType.FETCH_AV_MODULES_REJECTED:
      return state.mergeDeep({
        available:{
          pending: false, 
          error: action.payload.error
        }
      });

    //handles fetching of selected modules
    case actionType.FETCH_SE_MODULES_PENDING:
      return state.setIn(['selected','pending'], true);
    case actionType.FETCH_SE_MODULES_FULFILLED:
      return state.mergeDeep({
        selected: {
          pending: false,
          modules: List(action.payload)
        }
      });
    case actionType.FETCH_SE_MODULES_REJECTED:
      return state.mergeDeep({
        selected:{
          pending: false, 
          error: action.payload.error
        }
      });


    //handles updateing of available modules
    case actionType.UPDATE_SE_MODULES_PENDING:
      return state.setIn(['selected','pending'], true);
    case actionType.UPDATE_SE_MODULES_FULFILLED:
      return state.mergeDeep({
        selected: {
          modules: action.payload,
          pending: false
        }
      });
    case actionType.UPDATE_SE_MODULES_REJECTED:
      return state.mergeDeep({
        selected:{
          pending: false, 
          error: action.payload.error
        }
      });

    //handles clearing of errors
    case actionType.CLEAR_AV_ERROR:
      return state.setIn(['available', 'error'], null);
    case actionType.CLEAR_SE_ERROR:
      return state.setIn(['selected', 'error'], null);
  } 

  return state;
}

import {Map, fromJS} from 'immutable';


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
  CLEAR_ERROR             : 'CLEAR_AUTH_ERROR'
};



// user reducer
export default function reducer(state=INIT_STATE, action){
	switch(action.type){
		case actionType.LOGIN_PENDING:
      return state.set('pending', true);

    case actionType.RE_ENSTATE_TOKEN:
      return state.set('token', action.payload.token);

    case actionType.REFRESH_TOKEN_FULFILLED:
		case actionType.LOGIN_FULFILLED:
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


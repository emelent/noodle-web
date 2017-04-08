import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

import reducer, {type, INIT_STATE} from '../../src/redux/userReducer';


const email         = 'test@gmail.com';
const password      = 'password1';
const token         = 'token';
const refreshToken  = 'token2';
const error         = 'error';

/*
 * expected state after an action has occured
 */
const state = {
  LOGIN_PENDING: Map({
    token: null,
    pending: true,
    error: null
  }),
  LOGIN_FULFILLED: Map({
    token,
    pending: false,
    error: null
  }),
  LOGIN_REJECTED: Map({
    token: null,
    pending: false,
    error
  }),

  REFRESH_TOKEN_PENDING: Map({
    token,
    pending: true,
    error: null
  }),
  REFRESH_TOKEN_FULFILLED: Map({
    token: refreshToken,
    pending: false,
    error: null
  }),
  REFRESH_TOKEN_REJECTED: Map({
    token,
    pending: false,
    error
  }),

  RE_ENSTATE_TOKEN: Map({
    token,
    pending: false,
    error: null
  }),

  LOGOUT: INIT_STATE,
  CLEAR_ERROR: INIT_STATE
};

//automatically generate state tests
function generateStateTest(description, actions, initialState, expectedState){
  it(description, () => {
    let finalState = actions.reduce(reducer, initialState);
    expect(finalState).to.equal(expectedState);
  });
}


describe('user reducer', () => {

  //test login pending
  generateStateTest(
    //description
    `handles ${type.LOGIN_PENDING} action`,
    //actions
    [{type: type.LOGIN_PENDING}],
    //initial state
    INIT_STATE,
    //expected state
    state.LOGIN_PENDING
  );

   //test login fulfilled
  generateStateTest(
    `handles ${type.LOGIN_FULFILLED} action`,
    [{
      type: type.LOGIN_FULFILLED,
      payload: {token}
    }],
    state.LOGIN_PENDING,
    state.LOGIN_FULFILLED
  );

   //test login rejected
  generateStateTest(
    `handles ${type.LOGIN_REJECTED} action`,
    [{
      type: type.LOGIN_REJECTED,
      payload: {error}
    }],
    state.LOGIN_PENDING,
    state.LOGIN_REJECTED
  );

   //test refresh pending from login fulfilled
  generateStateTest(
    `handles ${type.REFRESH_TOKEN_PENDING} action`,
    [{type: type.REFRESH_TOKEN_PENDING}],
    state.LOGIN_FULFILLED,
    state.REFRESH_TOKEN_PENDING
  );

   //test refresh fulfilled from refresh pending
  generateStateTest(
    `handles ${type.REFRESH_TOKEN_FULFILLED} action`,
    [{
      type: type.REFRESH_TOKEN_FULFILLED,
      payload: {token: refreshToken}
    }],
    state.REFRESH_TOKEN_PENDING,
    state.REFRESH_TOKEN_FULFILLED
  );

   //test refresh rejected from refresh pending
  generateStateTest(
    `handles ${type.REFRESH_TOKEN_REJECTED} action`,
    [{
      type: type.REFRESH_TOKEN_REJECTED,
      payload: {error}
    }],
    state.REFRESH_TOKEN_PENDING,
    state.REFRESH_TOKEN_REJECTED
  );

  //test re-enstate token action from init state
  generateStateTest(
    `handles ${type.RE_ENSTATE_TOKEN} action`,
    [{
      type: type.RE_ENSTATE_TOKEN,
      payload: {token}
    }],
    INIT_STATE,
    state.RE_ENSTATE_TOKEN
  );

  //test logout action
  generateStateTest(
    `handles ${type.LOGOUT} action`,
    [{type: type.LOGOUT}],
    state.LOGIN_FULFILLED,
    state.LOGOUT
  );

  //test clear error action
  generateStateTest(
    `handles ${type.CLEAR_ERROR} action`,
    [{type: type.CLEAR_ERROR}],
    state.LOGIN_REJECTED,
    state.CLEAR_ERROR
  );
});

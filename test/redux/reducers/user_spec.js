import {expect} from 'chai';
import {fromJS} from 'immutable';
import jwtDecode from 'jwt-decode';

import reducer, {actionType, INIT_STATE} from '../../../src/redux/reducers/user';


const email           = 'test@gmail.com';
const password        = 'password1';
const token           = 'token';
const refreshToken    = 'token2';
const error           = 'error';

/*
 * expected state after an action has occured
 */
const states = {
  LOGIN_PENDING: fromJS({
    token: null,
    pending: true,
    error: null
  }),
  LOGIN_FULFILLED: fromJS({
    token,
    pending: false,
    error: null
  }),
  LOGIN_REJECTED: fromJS({
    token: null,
    pending: false,
    error
  }),

  REFRESH_TOKEN_PENDING: fromJS({
    token,
    pending: true,
    error: null
  }),
  REFRESH_TOKEN_FULFILLED: fromJS({
    token: refreshToken,
    pending: false,
    error: null
  }),
  REFRESH_TOKEN_REJECTED: fromJS({
    token,
    pending: false,
    error
  }),

  RE_ENSTATE_TOKEN: fromJS({
    token,
    pending: false,
    error: null
  }),

  LOGOUT: INIT_STATE,
  CLEAR_ERROR: INIT_STATE
};


describe('User Reducer', () => {

  //test login pending
  it('handles LOGIN_PENDING action', () => {
    let state = INIT_STATE;
    let action = {type: actionType.LOGIN_PENDING};
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.LOGIN_PENDING);
  });

   //test login fulfilled
  it('handles LOGIN_FULFILLED action', () => {
    let state = states.LOGIN_PENDING;
    let action = {
      type: actionType.LOGIN_FULFILLED,
      payload: {token}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.LOGIN_FULFILLED);
  });

   //test login rejected
  it('handles LOGIN_REJECTED action', () => {
    let state = states.LOGIN_PENDING;
    let action = {
      type: actionType.LOGIN_REJECTED,
      payload: {error}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.LOGIN_REJECTED);
  });

   //test refresh token pending from login fulfilled
  it('handles REFRESH_TOKEN_PENDING action', () => {
    let state = states.LOGIN_FULFILLED;
    let action = {type: actionType.REFRESH_TOKEN_PENDING};
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.REFRESH_TOKEN_PENDING);
  });

   //test refresh fulfilled from refresh pending
  it('handles REFRESH_TOKEN_FULFILLED action', () => {
    let state = states.REFRESH_TOKEN_PENDING;
    let action = {
      type: actionType.REFRESH_TOKEN_FULFILLED,
      payload: {token: refreshToken}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.REFRESH_TOKEN_FULFILLED);
  });


   //test refresh rejected from refresh pending
  it('handles REFRESH_TOKEN_REJECTED action', () => {
    let state = states.REFRESH_TOKEN_PENDING;
    let action = {
      type: actionType.REFRESH_TOKEN_REJECTED,
      payload: {error}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.REFRESH_TOKEN_REJECTED);
  });

  //test re-enstate token action from init state
  it('handles RE_ENSTATE_TOKEN action', () => {
    let state = INIT_STATE;
    let action = {
      type: actionType.RE_ENSTATE_TOKEN,
      payload: {token}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.RE_ENSTATE_TOKEN);
  });

  //test logout action from login fulfilled
  it('handles LOGOUT action', () => {
    let state = states.LOGIN_FULFILLED;
    let action = {type: actionType.LOGOUT};
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.LOGOUT);
  });

  //test clear error action from login rejected
  it('handles CLEAR_ERROR action', () => {
    let state = states.LOGIN_REJECTED;
    let action = {type: actionType.CLEAR_ERROR};
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.CLEAR_ERROR);
  });
});

import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

import reducer, {type, INIT_STATE} from '../../src/redux/userReducer';


const email         = 'test@gmail.com';
const password      = 'password1';
const token         = 'token';
const refreshToken = 'token2';
const error         = 'error';

/*
 * map of expected states after an action has 
 *occured
 */
const states = {
  LOGIN_PENDING     : fromJS({
                        token: null,
                        login: {
                          pending: true,
                          error: null
                        },
                        logout:{
                          pending: false,
                          error: null
                        }
                      }),

  LOGIN_FULFILLED   : fromJS({
                        token,
                        login: {
                          pending: false,
                          error: null
                        },
                        logout:{
                          pending: false,
                          error: null
                        }
                      }),

  LOGIN_REJECTED    : fromJS({
                        token: null,
                        login: {
                          pending: false,
                          error
                        },
                        logout:{
                          pending: false,
                          error: null
                        }
                      }),

  USER_RESET        : INIT_STATE,

  LOGOUT_FULFILLED  : INIT_STATE,

  LOGOUT_PENDING    : fromJS({
                        token,
                        login: {
                          pending: false,
                          error: null
                        },
                        logout:{
                          pending: true,
                          error: null
                        }
                      }),

  LOGOUT_REJECTED   : fromJS({
                        token,
                        login: {
                          pending: false,
                          error: null
                        },
                        logout:{
                          pending: false,
                          error 
                        }
                      }),

  REFRESH_TOKEN     : fromJS({
                        token: refreshToken,
                        login: {
                          pending: false,
                          error: null
                        },
                        logout:{
                          pending: false,
                          error: null 
                        }
                      }),

  RE_ENSTATE_TOKEN  : fromJS({
                        token: token,
                        login: {
                          pending: false,
                          error: null
                        },
                        logout:{
                          pending: false,
                          error: null 
                        }
                      }),


};

//automatically generate state tests
function generateStateTest(description, actions, initialState, expectedState){
  it(description, () => {
    let finalState = actions.reduce(reducer, initialState);
    expect(finalState).to.equal(expectedState);
  });
}


describe('user reducer', () => {

  //test login pending from init state 
  generateStateTest(
    //description
    `handles ${type.LOGIN_PENDING} action`,
    //actions
    [{type: type.LOGIN_PENDING}],
    //initial state
    INIT_STATE,
    //expected state
    states.LOGIN_PENDING
  );

   //test login fulfilled from login pending
  generateStateTest(
    `handles ${type.LOGIN_FULFILLED} action`,
    [{
      type: type.LOGIN_FULFILLED,
      payload: {token}
    }],
    states.LOGIN_PENDING,
    states.LOGIN_FULFILLED
  );

   //test login rejected from login pending
  generateStateTest(
    `handles ${type.LOGIN_REJECTED} action`,
    [{
      type: type.LOGIN_REJECTED,
      payload: {error}
    }],
    states.LOGIN_PENDING,
    states.LOGIN_REJECTED
  );

   //test logout pending from login fulfilled
  generateStateTest(
    `handles ${type.LOGOUT_PENDING} action`,
    [{type: type.LOGOUT_PENDING}],
    states.LOGIN_FULFILLED,
    states.LOGOUT_PENDING
  );

   //test logout fulfilledfrom logout pending
  generateStateTest(
    `handles ${type.LOGOUT_FULFILLED} action`,
    [{type: type.LOGOUT_FULFILLED}],
    states.LOGOUT_PENDING,
    states.LOGOUT_FULFILLED
  );

   //test logout rejected from logout pending
  generateStateTest(
    `handles ${type.LOGOUT_REJECTED} action`,
    [{
      type: type.LOGOUT_REJECTED,
      payload: {error}
    }],
    states.LOGOUT_PENDING,
    states.LOGOUT_REJECTED
  );

   //test refresh token action from login fulfilled
  generateStateTest(
    `handles ${type.REFRESH_TOKEN} action`,
    [{
      type: type.REFRESH_TOKEN,
      payload: {token: refreshToken}
    }],
    states.LOGIN_FULFILLED,
    states.REFRESH_TOKEN
  );

   //test re-enstate token action from init state
  generateStateTest(
    `handles ${type.RE_ENSTATE_TOKEN} action`,
    [{
      type: type.RE_ENSTATE_TOKEN,
      payload: {token}
    }],
    INIT_STATE,
    states.RE_ENSTATE_TOKEN
  );
});

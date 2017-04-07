import {expect} from 'chai';
import {Map, fromJS} from 'immutable';

import reducer, {type, INIT_STATE} from '../../src/redux/userReducer';

//automatically generate state tests
function generateTest(description, actions, initialState, expectedState){
  it(description, () => {
    let finalState = actions.reduce(reducer, initialState);
    expect(finalState).to.equal(expectedState);
  });
}

const email     = 'test@gmail.com';
const password  = 'password1';
const token     = 'token';
const error     = 'error';

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
                          pending: true,
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
                          error
                        },
                        logout:{
                          pending: false,
                          error 
                        }
                      }),
};

describe('user reducer', () => {

  /* test login pending */
  generateTest(
    //description
    `handles ${type.LOGIN_PENDING} action`,
    //actions
    [{type: type.LOGIN_PENDING}],
    //initial state
    INIT_STATE,
    //expected state
    states.LOGIN_PENDING
  );

  /* test login fulfilled*/
  generateTest(
    `handles ${type.LOGIN_FULFILLED} action`,
    [{
      type: type.LOGIN_FULFILLED,
      payload: {token}
    }],
    states.LOGIN_PENDING,
    states.LOGIN_FULFILLED
  );

  /* test login rejected*/
  generateTest(
    `handles ${type.LOGIN_REJECTED} action`,
    [{
      type: type.LOGIN_REJECTED,
      payload: {error}
    }],
    states.LOGIN_PENDING,
    states.LOGIN_REJECTED
  );

});

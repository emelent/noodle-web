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
const uid       = 1;

const states = {
  LOGIN_PENDING     : fromJS({
                        email,
                        password,
                        uid: null,
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
                        email,
                        password,
                        uid,
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
                        email,
                        password,
                        uid: null,
                        token: null,

                        login: {
                          pending: true,
                          error: {
                            message: null
                          }
                        },

                        logout:{
                          pending: false,
                          error: null
                        }
                      }),
  USER_RESET        : INIT_STATE,
  LOGOUT_FULFILLED  : INIT_STATE,
  LOGOUT_PENDING    : fromJS({
                        email,
                        password,
                        uid,
                        token,

                        login: {
                          pending: true,
                          date: null,
                          error: null
                        },

                        logout:{
                          pending: true,
                          error: null
                        }
                      }),
  LOGOUT_REJECTED   : fromJS({
                        email,
                        password,
                        uid,
                        token,

                        login: {
                          pending: true,
                          date: null,
                          error: null
                        },

                        logout:{
                          pending: false,
                          error: {
                            message: null
                          }
                        }
                      }),
};

describe('user reducer', () => {

  //test login pending
  generateTest(
    //description
    `handles ${type.LOGIN_PENDING} action`,
    //actions
    [{
      type: type.LOGIN_PENDING,
      payload: {email, password}
    }],
    //initial state
    INIT_STATE,
    //expected state
    states.LOGIN_PENDING
  );

  //test login fulfilled
  generateTest(
    `handles ${type.LOGIN_FULFILLED} action`,
    [{
      type: type.LOGIN_FULFILLED,
      payload: {uid, token}
    }],
    //initial 
    states.LOGIN_PENDING,
    states.LOGIN_FULFILLED
  );

  //generateTest
    //`handles ${type.LOGIN_REJECTED} action`,
  //);
});

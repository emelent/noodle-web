import {expect} from 'chai';
import {Map, List, fromJS} from 'immutable';

import reducer, {actionType, INIT_STATE} from '../../src/redux/availableModulesReducer';


const availableModules = List([1,2,3,4]);
const hiddenModules = List([1, 2]);
const filter = 'filter';
const error = 'error';

const states = {
  FETCH_MODULES_PENDING: Map({
    availableModules: List([]),
    hiddenModules: List([]),
    filter: '',
    pending: true,
    error: null
  }),
  FETCH_MODULES_FULFILLED: Map({
    availableModules,
    hiddenModules: List([]),
    filter: '',
    pending: false,
    error: null
  }),
  FETCH_MODULES_REJECTED: Map({
    availableModules: List([]),
    hiddenModules: List([]),
    filter: '',
    pending: false,
    error
  }),

  FILTER: Map({
    availableModules: List([]),
    hiddenModules: List([]),
    filter,
    pending: false,
    error: null
  }),

  SET_HIDDEN_MODULES: Map({
    availableModules: List([]),
    hiddenModules,
    filter: '',
    pending: false,
    error: null
  }),

  CLEAR_ERROR: Map({
    availableModules: List([]),
    hiddenModules: List([]),
    filter: '',
    pending: false,
    error: null
  })
};

describe('AvailableModules Reducer', () => {
  it('handles FILTER_MODULES_PENDING action', () => {
    let state = INIT_STATE;
    let action = {type: actionType.FETCH_MODULES_PENDING};
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FETCH_MODULES_PENDING);
  });
  it('handles FILTER_MODULES_FULFILLED action', () => {
    let state = states.FETCH_MODULES_PENDING;
    let action = {
      type: actionType.FETCH_MODULES_FULFILLED,
      payload: availableModules
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FETCH_MODULES_FULFILLED);
  });
  it('handles FILTER_MODULES_REJECTED action', () => {
    let state = INIT_STATE;
    let action = {
      type: actionType.FETCH_MODULES_REJECTED,
      payload: {error}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FETCH_MODULES_REJECTED);
  });

  it('handles SET_HIDDEN_MODULES action', () => {
    let state = INIT_STATE;
    let action = {
      type: actionType.SET_HIDDEN_MODULES,
      payload: {modules: hiddenModules}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.SET_HIDDEN_MODULES);
  });

  it('handles FILTER action', () => {
    let state = INIT_STATE;
    let action = {
      type: actionType.FILTER,
      payload: {filter}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FILTER);
  });

  it('handles CLEAR_ERROR action', () => {
    let state = states.FETCH_MODULES_REJECTED;
    let action = {
      type: actionType.CLEAR_ERROR
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.CLEAR_ERROR);
  });
});

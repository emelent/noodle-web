import {expect} from 'chai';
import {List, fromJS} from 'immutable';

import reducer, {actionType, INIT_STATE} from '../../src/redux/modulesReducer';


const availableModules = [1,2,3,4];
const selectedModules = [1, 2];
const selectedModulesUpdate = [3, 4];
const error = 'error';

const states = {
  FETCH_AV_MODULES_PENDING: fromJS({
    available: {
      modules: [],
      pending: true,
      error: null
    },
    selected: {
      modules: [],
      pending: false,
      error: null
    }
  }),
  FETCH_AV_MODULES_FULFILLED: fromJS({
    available: {
      modules: availableModules,
      pending: false,
      error: null
    },
    selected: {
      modules: [],
      pending: false,
      error: null
    }
  }),
  FETCH_AV_MODULES_REJECTED: fromJS({
    available: {
      modules: [],
      pending: false,
      error
    },
    selected: {
      modules: [],
      pending: false,
      error: null
    }
  }),  

  FETCH_SE_MODULES_PENDING: fromJS({
    available: {
      modules: [],
      pending: false,
      error: null
    },
    selected: {
      modules: [],
      pending: true,
      error: null
    }
  }),
  FETCH_SE_MODULES_FULFILLED: fromJS({
    available: {
      modules: [],
      pending: false,
      error: null
    },
    selected: {
      modules: selectedModules,
      pending: false,
      error: null
    }
  }),
  FETCH_SE_MODULES_REJECTED: fromJS({
    available: {
      modules: [],
      pending: false,
      error: null
    },
    selected: {
      modules: [],
      pending: false,
      error
    }
  }),

  UPDATE_SE_MODULES_PENDING: fromJS({
    available: {
      modules: [],
      pending: false,
      error: null
    },
    selected: {
      modules: selectedModules,
      pending: true,
      error: null
    }
  }),
  UPDATE_SE_MODULES_FULFILLED: fromJS({
    available: {
      modules: [],
      pending: false,
      error: null
    },
    selected: {
      modules: selectedModulesUpdate,
      pending: false,
      error: null
    }
  }),
  UPDATE_SE_MODULES_REJECTED: fromJS({
    available: {
      modules: [],
      pending: false,
      error: null
    },
    selected: {
      modules: selectedModules,
      pending: false,
      error
    }
  }),


  CLEAR_AV_ERROR: fromJS({
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
  }),

  CLEAR_SE_ERROR: fromJS({
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
  }),
};

describe('Modules Reducer', () => {
  it('handles FETCH_AV_MODULES_PENDING action', () => {
    let state = INIT_STATE;
    let action = {type: actionType.FETCH_AV_MODULES_PENDING};
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FETCH_AV_MODULES_PENDING);
  });
  it('handles FETCH_AV_MODULES_FULFILLED action', () => {
    let state = states.FETCH_AV_MODULES_PENDING;
    let action = {
      type: actionType.FETCH_AV_MODULES_FULFILLED,
      payload: availableModules
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FETCH_AV_MODULES_FULFILLED);
  });
  it('handles FETCH_AV_MODULES_REJECTED action', () => {
    let state = INIT_STATE;
    let action = {
      type: actionType.FETCH_AV_MODULES_REJECTED,
      payload: {error}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FETCH_AV_MODULES_REJECTED);
  });  

  it('handles FETCH_SE_MODULES_PENDING action', () => {
    let state = INIT_STATE;
    let action = {type: actionType.FETCH_SE_MODULES_PENDING};
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FETCH_SE_MODULES_PENDING);
  });
  it('handles FETCH_SE_MODULES_FULFILLED action', () => {
    let state = states.FETCH_SE_MODULES_PENDING;
    let action = {
      type: actionType.FETCH_SE_MODULES_FULFILLED,
      payload: selectedModules
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FETCH_SE_MODULES_FULFILLED);
  });
  it('handles FETCH_SE_MODULES_REJECTED action', () => {
    let state = INIT_STATE;
    let action = {
      type: actionType.FETCH_SE_MODULES_REJECTED,
      payload: {error}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.FETCH_SE_MODULES_REJECTED);
  });

  it('handles UPDATE_SE_MODULES_PENDING action', () => {
    let state = states.FETCH_SE_MODULES_FULFILLED;
    let action = {type: actionType.UPDATE_SE_MODULES_PENDING};
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.UPDATE_SE_MODULES_PENDING);
  });
  it('handles UPDATE_SE_MODULES_FULFILLED action', () => {
    let state = states.UPDATE_SE_MODULES_PENDING;
    let action = {
      type: actionType.UPDATE_SE_MODULES_FULFILLED,
      payload: selectedModulesUpdate
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.UPDATE_SE_MODULES_FULFILLED);
  });
  it('handles UPDATE_SE_MODULES_REJECTED action', () => {
    let state = states.UPDATE_SE_MODULES_PENDING;
    let action = {
      type: actionType.UPDATE_SE_MODULES_REJECTED,
      payload: {error}
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.UPDATE_SE_MODULES_REJECTED);
  });



  it('handles CLEAR_AV_ERROR action', () => {
    let state = states.FETCH_AV_MODULES_REJECTED;
    let action = {
      type: actionType.CLEAR_AV_ERROR
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.CLEAR_AV_ERROR);
  });
  it('handles CLEAR_SE_ERROR action', () => {
    let state = states.FETCH_SE_MODULES_REJECTED;
    let action = {
      type: actionType.CLEAR_SE_ERROR
    };
    let nextState = reducer(state, action);
    expect(nextState).to.equal(states.CLEAR_SE_ERROR);
  });
});

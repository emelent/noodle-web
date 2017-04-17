import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import user from './reducers/user';
import modules from './reducers/modules';

export default combineReducers({
  user,
  modules,
  routing: routerReducer
});



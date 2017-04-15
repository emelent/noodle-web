import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import user from './userReducer';
import modules from './modulesReducer';

export default combineReducers({
  user,
  modules,
  routing: routerReducer
});



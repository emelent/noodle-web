import {applyMiddleware, combineReducers, createStore} from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducers';


const enhancer = applyMiddleware(thunk, logger());

export default createStore(reducer, enhancer);


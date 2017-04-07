import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './redux/store';
import Landing from './views/Landing';
import Search from './views/Search';
import Browse from './views/Browse';
import Profile from './views/Profile';
import Login from './containers/Login';

import 'font-awesome/scss/font-awesome.scss';
import './styles/style.scss';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={Landing}>
      </Route>
      <Route path="/search/:query" component={Search} />
      <Route path="/profile/:name" component={Profile} />
      <Route path="/browse" component={Browse} />
      <Route path="/browse/:group" component={Browse} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Login} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

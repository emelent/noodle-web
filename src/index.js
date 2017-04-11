import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'babel-polyfill';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import store from './redux/store';
import LoginView from './views/login';
import SelectModulesView from './views/selectModules';


import './styles/style.scss';

injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  (
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={LoginView} />
          <Route path="/select-modules" component={SelectModulesView} />
        </Router>
      </Provider>
    </MuiThemeProvider>
  ),
  document.getElementById('root')
);

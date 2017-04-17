import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'babel-polyfill';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import store from './redux/store';
import LoginView from './views/Login';
import AddModulesView from './views/AddModules';


import './styles/style.scss';

injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={LoginView} />
        <Route path="/login" component={LoginView} />
        <Route path="/add-modules" component={AddModulesView} />
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default App;

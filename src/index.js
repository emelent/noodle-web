import React from 'react';
import ReactDOM from 'react-dom';
//import {AppContainer} from 'react-hot-loader';

import App from './App';


const render = (Component) => {
  ReactDOM.render(
    <Component/>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
//if (module.hot) {
  //module.hot.accept('./App', () => {
    //render(App)
  //});
//}

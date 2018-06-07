import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';
import Main from './views/Main';
import registerServiceWorker from './registerServiceWorker';
//For SPA routing capabilities -- to install -> npm install --save react-router react-router-dom
import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/creative.css';

const store = createStore(reducer);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './views/Main';
import registerServiceWorker from './registerServiceWorker';

//For SPA routing capabilities -- to install -> npm install --save react-router react-router-dom
import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/creative.css';


ReactDOM.render((
  <BrowserRouter>
    <Main />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();

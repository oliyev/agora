import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './views/Homepage';
import Chatroom from './views/Chatroom';
import registerServiceWorker from './registerServiceWorker';

//For SPA routing capabilities -- to install -> npm install --save react-router react-router-dom
import {BrowserRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/creative.css';


ReactDOM.render((
  <BrowserRouter>
    <Homepage />
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();

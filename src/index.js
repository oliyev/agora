import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import Homepage from './views/Homepage';
import Chatroom from './views/Chatroom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/creative.min.css';


ReactDOM.render(<Chatroom />, document.getElementById('root'));
registerServiceWorker();

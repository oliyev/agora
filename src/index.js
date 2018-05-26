import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './views/Homepage';
import Chatroom from './views/Chatroom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/creative.css';

import '../node_modules/font-awesome/css/font-awesome.min.css';

import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/magnific-popup/dist/jquery.magnific-popup.js'
import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/jquery.easing/jquery.easing.js'

import './js/creative.js'

ReactDOM.render(<Chatroom />, document.getElementById('root'));
registerServiceWorker();

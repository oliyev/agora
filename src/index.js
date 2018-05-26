import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './views/Homepage';
import Chatroom from './views/Chatroom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/creative.min.css';

import Bootstrap from 'bootstrap';
import jQuery from 'jquery';
import jQueryEasing from 'jquery.easing';
import ScrollReveal from 'scrollreveal';
import MaginificPopup from 'magnific-popup';

import './js/creative.js'

ReactDOM.render(<Chatroom />, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './views/Homepage';
import Chatroom from './views/Chatroom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD

import './css/creative.min.css';

=======
import './css/creative.min.css';
>>>>>>> bf5cdc73c847039aef7142e2f675c999c3e8a458

ReactDOM.render(<Chatroom />, document.getElementById('root'));
registerServiceWorker();

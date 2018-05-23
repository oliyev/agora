import React from 'react';
import ReactDOM from 'react-dom';
import '../style/index.css';
import App from './App';
import Homepage from './views/Homepage';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

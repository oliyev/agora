import React, { Component } from 'react';
import logo from './logo.svg';
import './style/main.css';
import './style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, dsafedit <code>src/App.js</code> and save to reload.
        </p>
        <div className="homepage">
          <span>hello</span>
        </div>
      </div>
    );
  }
}

export default App;

//text area + send button
import React, { Component } from 'react';
import Spinner from 'react-spinkit';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/main.css';

class LoadingDebate extends Component {

  render(props){
    return (
      <div className="container-modal">
          <Spinner name="pacman" className="pacman2" color="#ff775d"/>
          <h4 className="loading-text">{'Loading debate room'}</h4>
      </div>
    );
  }
}

export default LoadingDebate;

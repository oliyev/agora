import React, { Component } from 'react';
import Header from '../components/common/Header';
import Chatbox from '../components/chatroom/Chatbox';
import '../style/App.css';
import '../style/main.css';


class Chatroom extends Component {
  state = {
  }

  render() {

    return (
      <div className="App">
        <div id="chatoutput" className="chatoutput"></div>
        <Chatbox />
      </div>
    );
  }

  // methods
}

export default Chatroom;

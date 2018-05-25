import React, { Component } from 'react';
import Header from '../components/common/Header';
import api from '../api';
import io from 'socket.io-client';

let ws = io.connect('http://127.0.0.1:4000/');

class Chatroom extends Component {
  state = {
    q: 'queue',
    messages: []
  }

  render() {

    return (
      <div className="App">
        <Header />
        <span>Chat: </span>
        <input type="text" id="input" />
        <button onClick={this.send}>send</button>
        <p id="output"></p>
      </div>
    );
  }

  // methods
  send = () => {
    let msg = document.querySelector('#input').value
    console.log(msg);
    api.post('/msg', {'msg': msg})
    .then((response) => console.log(response))
    .catch((err) => console.log(err))
  }
}

ws.on('connect', (data) => console.log('ws connected'));
ws.on('message', (data) => console.log(data));

export default Chatroom;

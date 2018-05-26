//text area + send button
import React, { Component } from 'react';
import api from '../../api';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

let ws = io.connect('http://127.0.0.1:4000/');

class Chatbox extends Component {
  state = {
    q: 'queue',
    isDisabled: false
  }

  render() {
    return (
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Enter your argument" aria-label="Recipient's username" aria-describedby="basic-addon2" disabled={this.state.isDisabled}/>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">Send</button>
        </div>
      </div>
    );
  }

  // methods
  send = () => {
    let msg = document.querySelector('#msg2send').value
    console.log(msg);
    api.post('/msg', {'msg': msg})
    .then((response) => console.log(response))
    .catch((err) => console.log(err))
  }
}


ws.on('connect', (data) => console.log('ws connected'));
ws.on('message', (data) => console.log(data));

export default Chatbox;

//text area + send button
import React, { Component } from 'react';
import api from '../../api';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

class Chatbox extends Component {
  static isDisabled = false;
  state = {
    q: 'queue',
    isDisabled: false,
    debateId: ''
  }

  render(props) {
    return (
      <div className="input-group mb-1">
        <input onKeyPress={this.keySend.bind(props)} id="msg2send" type="text" className="form-control shadow-sm" placeholder="Enter your argument" aria-label="Recipient's username" aria-describedby="basic-addon2" disabled={this.state.isDisabled}/>
        <div className="input-group-append">
          <button onClick={this.send.bind(props)} className="btn btn-outline-secondary border shadow-sm btn-agora" type="button">Send</button>
        </div>
      </div>
    );
  }

  // methods
  send = () => {
    let input = document.querySelector('#msg2send')
    let msg = input.value
    if (input.value){
      api.post('/msg', {msg: msg, debateId:this.props.debateId})
      .then((response) => console.log('post msg response'))
      .catch((err) => console.log(err))
    }
    input.value = '';
  }

  keySend = (ev) => { if (ev.charCode == 13) this.send() };
}

export default Chatbox;

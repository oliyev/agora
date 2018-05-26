//text area + send button
import React, { Component } from 'react';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';

class Chatbox extends Component {
  state = {
    q: 'queue',
    isDisabled: false
  }

  render() {
    return (
      <div className="input-group mb-1">
        <input id="msg2send" type="text" className="form-control shadow-sm" placeholder="Enter your argument" aria-label="Recipient's username" aria-describedby="basic-addon2" disabled={this.state.isDisabled}/>
        <div className="input-group-append">
          <button onClick={this.send} className="btn btn-outline-secondary border shadow-sm" type="button">Send</button>
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

export default Chatbox;

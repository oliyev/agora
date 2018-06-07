//text area + send button
import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  render() {
    if (this.props.user.stance === null) {
      return null;
    }
    else {
      return (
        <div className="input-group mb-1">
        <input onKeyPress={ (ev) => { if (ev.charCode == 13) this.send(this.props.debateId); } } id="msg2send" type="text" className="form-control shadow-sm" placeholder="Enter your argument" disabled={this.props.isDisabled}/>
        <div className="input-group-append">
        <button onClick={ () => this.send(this.props.debateId) } className="btn btn-outline-secondary border shadow-sm btn-agora" type="button">Send</button>
        </div>
        </div>
      );
    }
  }

  // methods
  send = (debateId) => {
    let input = document.querySelector('#msg2send')
    let msg = input.value
    if (input.value){
      api.post('/msg', {msg: msg, debateId: debateId, user: this.props.user})
      .then((response) => console.log('post msg response ' + debateId))
      .catch((err) => console.log(err))
    }
    input.value = '';
  }
}

const mapStateToProps = state => {
  return {
    webSocket: state.webSocket,
    debateId: state.debate._id,
    isDisabled: !(state.debate._currentDebatingStance === state.user.stance),
    user: state.user
  };
}

export default connect(mapStateToProps)(Chatbox);

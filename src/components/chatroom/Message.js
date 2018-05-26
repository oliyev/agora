// user icon + message
import React, { Component } from 'react';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';

class Message extends Component {
  state = {
    q: 'queue',
    isDisabled: false,
    isFor: true
  }

  // methods

  Message1 = (props) => {
    console.log(props);
    if ((props || {}).isFor){
      return (
        <h1></h1>
      );
    }
    else {
      return (
        <div className="input-group mb-1 col-m10 border msg-cont">
        <img src="" alt="userIcon" />
        <span>{this.props.msg}</span>
        </div>
      )
    }
  }

  render(props) {
    return (
      this.Message1(this.props)
    )
  }
}

export default Message;

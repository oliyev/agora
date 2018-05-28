// user icon + message
import React, { Component } from 'react';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';

class Message extends Component {
  state = {}

  render(props) {

    if (this.props.stance === 'neutral') {
      return (
        <div className="input-group mb-3 col-12">
          <div className="border msg-cont p-3 neut-state">
            <span className="align-middle col-12 d-block text-center">{'Welcome to the debate room! Both debaters will take turns to discuss on '}</span>
            <span className="word-emphasis">{this.props.msg.topic}</span>
            <span>{' starting with agruments '}<span className="word-emphasis">{this.props.msg.startStance ? 'for' : 'against'}</span>{' this topic.'}</span>
          </div>
        </div>
      )
    }

    if (this.props.stance) {
      return (
        <div className="input-group mb-3 col-12">
          <img className="m-1 msgimg" src={require("../../img/test-icon.png")} alt="userIcon" />
          <div className="border msg-cont p-3 argFor">
            <span className="align-middle col-12 d-block text-left">{this.props.msg}</span>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="input-group mb-3 col-12">
          <div className="border msg-cont p-3 argAgainst">
            <span className="align-middle col-12 d-block text-left">{this.props.msg}</span>
          </div>
          <img className="m-1 msgimg" src={require("../../img/test-icon.png")} alt="userIcon" />
        </div>
      )
    }
  }
}

export default Message;

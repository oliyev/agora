// user icon + message
import React, { Component } from 'react';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';

class Message extends Component {
  state = {}

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
        <div className="input-group mb-1 col-m10">
          <img className="m-1 msgimg" src={require("../../img/test-icon.png")} alt="userIcon" />
          <div className="border msg-cont p-3">
            <span className="align-middle col-m12 d-block ">{this.props.msg}</span>
          </div>
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

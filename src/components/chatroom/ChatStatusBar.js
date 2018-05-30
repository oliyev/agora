import React, { Component } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';


class ChatStatusBar extends Component {
  state = {
  }

  render(props) {

    return (
      <div className="col-12 status-bar-cont">
        <span className="badge ">{this.props.timer}</span>
      </div>
    );
  }

  // methods
}

export default ChatStatusBar;

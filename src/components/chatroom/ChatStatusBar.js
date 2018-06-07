import React, { Component } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';


class ChatStatusBar extends Component {
  state = {
  }

  render(props) {

    return (
      <div className="col-12 status-bar-cont">
        <span className="badge ">{'Debate: ' + this.props.debateTime + ' s'}</span>
        <span className="badge ">{'Round: ' + this.props.roundTime + ' s'}</span>
      </div>
    );
  }

  // methods
}

export default ChatStatusBar;

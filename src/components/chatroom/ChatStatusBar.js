import React, { Component } from 'react';
import io from 'socket.io-client';
import '../../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';


class ChatStatusBar extends Component {
  state = {
  }

  render(props) {

    return (
      <div className="col-12 status-bar-cont">
        <span className="badge timer mr-4">{'Debate: ' + this.props.debateTime + ' s'}</span>
        <span className="badge timer ml-4">{'Round: ' + this.props.roundTime + ' s'}</span>
      </div>
    );
  }

  // methods
}

export default ChatStatusBar;

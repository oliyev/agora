import React, { Component } from 'react';
import io from 'socket.io-client';
import Header from '../components/common/Header';
import Chatbox from '../components/chatroom/Chatbox';
import Chat from '../components/chatroom/Chat';
import Message from '../components/chatroom/Message';
import '../css/App.css';
import '../css/main.css';

let FOR = true;
let AGAINST = false;

class Chatroom extends Component {

  state = {
    ws: {},
    messages: []
  }

  // lifecycle events
  componentWillMount () {
    this.state.ws = io.connect('http://127.0.0.1:4000/');
    this.state.ws.on('connect', (data) => console.log('ws connected'));
    this.state.ws.on('message', (data) => { this.addMessage(data); });
  }

  render() {
    let messages = (
      <div id="chatoutput" className="shadow-sm p-3 mb-3 bg-white rounded border chat-height">
        {this.state.messages.map((message, index) => {
          return <Message key={index} msg={message.msg} stance={message.stance}/>
        })}
      </div>
    )

    return (
      <div className="shadow-sm p-3 mb-1 bg-white rounded">
        {messages}
        <Chatbox />
      </div>
    );
  }

  // methods
  addMessage (data) {
    console.log(data);
    console.log(this.state)
    let messages = [...this.state.messages];
    let message = {msg:data, stance:FOR}
    messages.push(message);
    this.setState({
      messages:messages
    })
  }

}

export default Chatroom;

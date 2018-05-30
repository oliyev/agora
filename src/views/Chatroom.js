import React, { Component } from 'react';
import io from 'socket.io-client';
import Header from '../components/common/Header';
import Chatbox from '../components/chatroom/Chatbox';
import ChatStatusBar from '../components/chatroom/ChatStatusBar';
import Message from '../components/chatroom/Message';
import utils from '../utilities'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import '../css/main.css';

let FOR = true;
let AGAINST = false;

class Chatroom extends Component {

  state = {
    ws: {},
    messages: [],
    debate: {},
    topic: 'Kinder Morgan pipeline',
    stance: FOR,
    introMsg: {},
    timer: 0
  }

  // lifecycle events
  componentWillMount () {
    this.state.ws = io.connect('http://127.0.0.1:4000/');
    this.state.ws.on('connect', (data) => this.onConnect(data));
    this.state.ws.on('message', (data) => this.addMessage(data));
    this.state.ws.on('debateInitiated', (debate) => this.initChatroom(debate));


    this.state.introMsg['topic'] = this.state.topic || 'oops no topic';
    // let oli = 'a really good link https://getbootstrap.com/docs/4.1/utilities/spacing/ which you can consult anytime'.match(utils.URLREGEX);

  }

  render() {
    let messages = (
      <div id="chatoutput" className="shadow-sm p-3 mb-3 rounded border chat-height">
        <Message msg={this.state.introMsg} stance="neutral"/>
        {this.state.messages.map((message, index) => {
          return <Message key={index} msg={message.msg} stance={message.stance}/>
        })}
      </div>
    )

    return (
      <div className="col-11 mx-auto mt-5 shadow-md p-3 mb-1">
        <ChatStatusBar timer={this.state.timer}/>
        {messages}
        <Chatbox disabled={false} debateId={this.state.debate.id}/>
      </div>
    );
  }

  // methods
  onConnect() { this.state.ws.emit('initDebate', {}); }

  addMessage (data) {
    let messages = [...this.state.messages];
    let message = {msg:data, stance:this.state.stance}
    messages.push(message);
    this.setState({
      messages:messages,
      stance: this.state.stance ? AGAINST : FOR
    })

    let chat = document.querySelector('#chatoutput');
    chat.scrollTop = chat.scrollHeight;
  }

  initChatroom (debate) {
    console.log('initiating debate room...');
    this.setState({
      stance: debate.startStance,
      id: debate.id
    })
  }

  updateTimer (data) {
    this.setState({timer: data})
  }

}

export default Chatroom;

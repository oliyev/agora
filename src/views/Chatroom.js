import React, { Component } from 'react';
import io from 'socket.io-client';
import Header from '../components/common/Header';
import Chatbox from '../components/chatroom/Chatbox';
import ChatStatusBar from '../components/chatroom/ChatStatusBar';
import LoadingDebate from '../components/chatroom/LoadingDebate';
import Message from '../components/chatroom/Message';
import utils from '../utilities'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import '../css/main.css';

let FOR = true;
let AGAINST = false;

class Chatroom extends Component {

  state = {
    id: '',
    ws: {},
    loading: true,
    user: {
      id: 'u-12345',
      stance: FOR
    },
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
    this.state.ws.on('debateCreated', (debate) => this.initChatroom(debate));
    this.state.ws.on('chatroomReady', (data) => this.chatroomReadyHandler(data));
    this.state.ws.emit('gotDebateId', {debateId: 'r-409089', user: this.state.user});

    this.state.introMsg['topic'] = this.state.topic || 'oops no topic';
    // let oli = 'a really good link https://getbootstrap.com/docs/4.1/utilities/spacing/ which you can consult anytime'.match(utils.URLREGEX);

  }

  render() {

    let loading, messages, chatroom;

    if (this.state.loading) {
        loading = <LoadingDebate />
    }
    else {
      messages = (
        <div id="chatoutput" className="shadow-sm p-3 mb-3 rounded border chat-height">
          <Message msg={this.state.introMsg} stance="neutral"/>
          {this.state.messages.map((message, index) => {
            return <Message key={index} msg={message.msg} stance={message.stance}/>
          })}
        </div>
      )

      chatroom = (
        <div className="chat-max mx-auto mt-10 shadow-md p-3 mb-1">
          <ChatStatusBar timer={this.state.timer}/>
          {messages}
          <Chatbox disabled={false} debateId={this.state.debate._id}/>
        </div>
      )
    }

    return (
      <div className="chat-container">
        {loading}
        <div className="side-chatmenu"></div>
        {chatroom}
      </div>
    );
  }

  // methods
  onConnect() {
    // this.state.ws.emit('initDebate', {debateId: 'r-409089'});
    console.log('on connect');
  }

  addMessage (data) {
    console.log('add message');
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
    console.log('initiating debate room (debateCreated)');
    this.setState({
      stance: debate.startStance,
      id: debate._id,
      debate: debate
    })
  }

  chatroomReadyHandler (data) {
      console.log('chatroom ready (joined room)');
      console.log(data);
      this.setState({ loading: false, debate: data.debate });
  }

  updateTimer (data) {
    this.setState({timer: data});
  }

}

export default Chatroom;

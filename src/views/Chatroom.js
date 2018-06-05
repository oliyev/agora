import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    isLoading: true,
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
    let ws = io.connect('http://127.0.0.1:4000/');
    ws.on('connect', (data) => this.onConnect(data));
    ws.on('message', (data) => this.addMessage(data));
    ws.on('debateCreated', (debate) => this.initChatroom(debate));
    ws.on('chatroomReady', (data) => this.chatroomReadyHandler(data));
    ws.emit('gotDebateId', {debateId: this.props.debate._id, user: this.props.user});
    this.props.onSetWebSocket(ws);

    this.state.introMsg['topic'] = this.state.topic || 'oops no topic';
    // let oli = 'a really good link https://getbootstrap.com/docs/4.1/utilities/spacing/ which you can consult anytime'.match(utils.URLREGEX);

  }

  render() {

    let loading, messages, chatroom;

    if (this.props.isLoading) {
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
        <div className="col-9 chat-max mx-auto mt-10 shadow-md p-3 mb-1">
          <ChatStatusBar timer={this.state.timer}/>
          {messages}
          <Chatbox debateId={this.props.debate._id}/>
        </div>
      )
    }

    return (
      <div className="chat-container row">
        {loading}
        <div className="col-3 side-chatmenu">{'fancy ass menu'}</div>
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
      stance: this.props.stance
    })

    let chat = document.querySelector('#chatoutput');
    chat.scrollTop = chat.scrollHeight;
  }

  initChatroom (debate) {
    console.log('initiating debate room (debateCreated)');
    this.props.onSetDebate(debate);
    this.setState({
      stance: debate.startStance,
      debate: debate
    });
  }

  chatroomReadyHandler (data) {
      console.log('chatroom ready (joined room)');
      this.props.onSetIsLoading(false);
      this.props.onSetDebate(data.debate);
      this.setState({ isLoading: false, debate: data.debate });
  }

  updateTimer (data) {
    this.setState({timer: data});
  }

}

// accessible by this.props.[property] in the render function
const mapStateToProps = state => {
  return {
    debate: state.debate,
    ws: state.webSocket,
    isLoading: state.isLoading,
    user: state.user,
    stance: (state.debate || {}).debatingStance,
    timer: state.timer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetDebate: (debate) => dispatch({ type: 'SET_DEBATE', debate }),
    onSetIsLoading: (isLoading) => dispatch({ type: 'SET_IS_LOADING', isLoading }),
    onSetWebSocket: (webSocket) => dispatch({ type: 'SET_WEBSOCKET', webSocket })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);

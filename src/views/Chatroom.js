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
    args: [],
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
    ws.on('message', (debate) => this.addMessage(debate));
    ws.on('debateCreated', (debate) => this.initChatroom(debate));
    ws.on('chatroomReady', (data) => this.chatroomReadyHandler(data));
    ws.on('debateStarted', (data) => this.debateStarted(data));
    ws.on('endOfRound', (data) => this.endOfRound(data));
    ws.on('endOfDebate', (data) => this.endOfDebate(data));
    ws.on('timerChange', (debate) => this.props.onSetDebate(debate));
    ws.on('clapped', (debate) => this.props.onSetDebate(debate));
    ws.emit('gotDebateId', {debateId: this.props.debate._id, user: this.props.user});
    this.props.onSetWebSocket(ws);

    this.state.introMsg['topic'] = this.state.topic || 'oops no topic';
    // let oli = 'a really good link https://getbootstrap.com/docs/4.1/utilities/spacing/ which you can consult anytime'.match(utils.URLREGEX);

  }

  render() {

    let loading, messages, chatroom, sideMenu;

    if (this.props.isLoading) {
        loading = <LoadingDebate />
    }
    else {
      messages = (
        <div id="chatoutput" className="shadow-sm p-3 mb-3 rounded border chat-height">
          <Message msg={this.state.introMsg} stance="neutral"/>
          {this.props.debate._args.map((arg, index) => {
            return <Message key={arg.id} id={arg.id}
                    claps={arg.claps} msg={arg.content}
                    hasClapped={ arg.clappers ? arg.clappers.some((x) => {return x === this.props.user.id}) : null }
                    stance={arg.stance}
                    stats={this.props.debate._stats} />
          })}
        </div>
      )

      sideMenu = (
        <div className="col-3 side-chatmenu position-relative">
          <span className="glyphicon glyphicon-chevron-left position-absolute "></span>
          <span>{'"Any fool can write code that a computer can understand. Good programmers write code that humans can understand" - Martin Fowler'}</span>
        </div>
      )

      chatroom = (
        <div className="col-9 chat-max mx-auto mt-10 shadow-md p-3 mb-1">
          <ChatStatusBar debateTime={this.props.debate._debateTime} roundTime={this.props.debate._roundTime}/>
          {messages}
          <Chatbox debateId={this.props.debate._id}/>
        </div>
      )
    }

    return (
      <div className="chat-container row">
        {loading}
        {sideMenu}
        {chatroom}
        <button onClick={ this.swapStance }>{'SWAP STANCE'}</button>
      </div>
    );
  }

  // methods
  onConnect() {
    // this.state.ws.emit('initDebate', {debateId: 'r-409089'});
    console.log('on connect');
  }

  /*arg = {
    id: debateId + req.body.user.id + Date.now(),
    stance: req.body.user.stance,
    content: msg,
    clappers: [],
    claps: 0
  }*/

  addMessage (debate) {
    console.log('add message');
    this.props.onSetDebate(debate);

    let chat = document.querySelector('#chatoutput');
    chat.scrollTop = chat.scrollHeight;
  }

/*  addMessage (data) {
    console.log('add message');
    let messages = [...this.state.messages];
    let message = {msg:data.msg, stance:this.state.stance}

    let args = data.debate.args;
    console.log(args);
    messages.push(message);
    this.setState({
      messages:messages,
      stance: this.props.stance
    })

    let chat = document.querySelector('#chatoutput');
    chat.scrollTop = chat.scrollHeight;
  }*/

  initChatroom (debate) {
    console.log('initiating debate room (debateCreated)');
    this.props.onSetDebate(debate);
    setTimeout(() => { this.props.onSetIsLoading(false) }, 2000);
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

  // TODO: GET RID OF THIS SHIT
  swapStance = () => {
    let updatedUser = {...this.props.user};
    updatedUser.id = 'nu-u1337';
    updatedUser.stance = !this.props.user.stance;
    this.props.onSetUser(updatedUser);
  }

  debateStarted = (debate) => {
    console.log('debate has started!');
    this.props.onSetDebate(debate)
  }
  endOfRound = (debate) => {
    console.log('end of round');
    this.props.onSetDebate(debate)
  }
  endOfDebate = (debate) => {
    console.log('end of debate');
    this.props.onSetDebate(debate);
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
    onSetWebSocket: (webSocket) => dispatch({ type: 'SET_WEBSOCKET', webSocket }),
    onSetUser: (user) => dispatch({ type: 'SET_USER', user })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatroom);

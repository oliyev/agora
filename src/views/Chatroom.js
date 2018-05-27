import React, { Component } from 'react';
import io from 'socket.io-client';
import Header from '../components/common/Header';
import Chatbox from '../components/chatroom/Chatbox';
import Chat from '../components/chatroom/Chat';
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
    debate: {
      topic: 'Kinder Morgan pipeline',
      sourcesFor: [],
      sourcesAgainst: []
    },
    stance: FOR,
    introMsg: {}
  }

  // lifecycle events
  componentWillMount () {
    this.state.ws = io.connect('http://127.0.0.1:4000/');
    this.state.ws.on('connect', (data) => console.log('ws connected'));
    this.state.ws.on('message', (data) => { this.addMessage(data); });

    let startStance = Math.random() >= 0.49 ? FOR : AGAINST;
    this.state.stance = startStance;
    this.state.introMsg['topic'] = this.state.debate.topic || 'oops no topic';
    this.state.introMsg['startStance'] = startStance;
    let oli = 'a really good link https://getbootstrap.com/docs/4.1/utilities/spacing/ which you can consult anytime'.match(utils.URLREGEX);
    console.log(oli);
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
      <div className="col-11 mx-auto mt-5 shadow-md p-3 mb-1 rounded">
        {messages}
        <Chatbox disabled={false}/>
      </div>
    );
  }

  // methods
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

}

export default Chatroom;

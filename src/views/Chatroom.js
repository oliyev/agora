import React, { Component } from 'react';
import io from 'socket.io-client';
import Header from '../components/common/Header';
import Chatbox from '../components/chatroom/Chatbox';
import Chat from '../components/chatroom/Chat';
import Message from '../components/chatroom/Message';
import '../css/App.css';
import '../css/main.css';

class Chatroom extends Component {
  state = {
    messages: []
  }

  render() {

    return (
      <div className="shadow-sm p-3 mb-1 bg-white rounded">
        <div id="chatoutput" className="shadow-sm p-3 mb-3 bg-white rounded border chat-height">
          <Message msg="1" isFor={true}/>
          <Message msg="2"/>
        </div>
        <Chatbox />
      </div>
    );
  }

  // methods
  static addMessage (data) {
    console.log(data);
    console.log(document.querySelector('#chatoutput'));
  }
}

let ws = io.connect('http://127.0.0.1:4000/');
let chat;

document.addEventListener('DOMContentLoaded', (ev) =>{
   chat = document.querySelector('#chatoutput');
   console.log(chat);
});

ws.on('connect', (data) => console.log('ws connected'));
ws.on('message', (data) => {
  Chatroom.addMessage(data);
});


export default Chatroom;

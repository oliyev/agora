// user icon + message
import React, { Component } from 'react';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

const userIcon = require("../../img/test-icon.png");
const clapIcon = require("../../img/clap-icon.png");

class Message extends Component {
  state = {
    id: new Date(),
    hasClapped: false, //userId
    showClap: false
  }

  render(props) {
    console.log('show clap? ' + this.state.showClap);
    let clapClassName = "clap c-for position-absolute";
    if (this.state.hasClapped)
      clapClassName += ' clapped';

    clapClassName += this.state.showClap || this.state.hasClapped ? ' show' : ' hide';

    if (this.props.stance === 'neutral') {
      return (
        <div className="input-group mb-3 col-12">
          <div className="border msg-cont p-3 neut-state">
            <span className="align-middle col-12 d-block text-center">{'Welcome to the debate room! Both debaters will take turns to discuss on '}</span>
            <span className="word-emphasis">{this.props.msg.topic}</span>
            <span>{' starting with agruments '}<span className="word-emphasis">{this.props.msg.startStance ? 'for' : 'against'}</span>{' this topic.'}</span>
          </div>
        </div>
      )
    }

    if (this.props.stance) {
      return (
        <div onMouseEnter={this.showClapIcon} onMouseLeave={this.hideClapIcon} className="input-group mb-3 col-12 position-relative clapper">
          <img className="m-1 msgimg" src={require("../../img/test-icon.png")} alt="userIcon" />
          <div className="border msg-cont p-3 argFor">
            <span className="align-middle col-12 d-block text-left">{this.state.id + this.props.msg}</span>
            <div onClick={this.toggleClap} className={clapClassName}>
              <img className="clap-icon" src={clapIcon} />
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="input-group mb-3 col-12 position-relative">
          <div className="border msg-cont p-3 argAgainst">
            <span className="align-middle col-12 d-block text-left">{this.props.msg}</span>
            <div className="clap c-against position-absolute"></div>
          </div>
          <img className="m-1 msgimg" src={userIcon} alt="userIcon" />
        </div>
      )
    }
  }

  showClapIcon = () => { this.setState({showClap:true}); }
  hideClapIcon = () => { this.setState({showClap:false}); }

  toggleClap = () => {
    // change class, add user id to claps,
    console.log('git clapped kek');
    this.setState({hasClapped: !this.state.hasClapped})
    this.props.webSocket.emit('clapped', {userId: this.props.user.id, messageId: this.state.id, debateId: this.props.debate._id, value: this.state.hasClapped});
  }
}

// accessible by this.props.[property] in the render function
const mapStateToProps = state => {
  return {
    webSocket: state.webSocket,
    user: state.user,
    debate: state.debate
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);

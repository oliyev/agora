// user icon + message
import React, { Component } from 'react';
import api from '../../api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

const userIcon = require("../../img/test-icon.png");
const clapIcon = require("../../img/clap-icon.png");

class Message extends Component {
  state = {
    id: '',
    hasClapped: false, //userId
    showClap: false
  }

  componentWillMount() {
  }

  render(props) {
    let clapClassName = `clap ${this.props.stance ? 'c-for' : 'c-against'} position-absolute`;
    let stanceMsg;

    if (this.state.hasClapped)
      clapClassName += ' clapped';

    clapClassName += this.state.showClap || this.state.hasClapped ? ' show' : ' hide';

    if (this.props.stance === 'neutral') {
      return (
        <div className="input-group mb-4 mt-1 col-12">
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
        <div onMouseEnter={this.showClapIcon} onMouseLeave={this.hideClapIcon} className="input-group mb-4 col-12 position-relative clapper">
          <img className="m-1 msgimg" src={userIcon} alt="userIcon" />
          <div className="border msg-cont p-3 argFor">
            <span className="align-middle col-12 d-block text-left">{this.props.msg}</span>
            <div onClick={ () => { this.toggleClap(this.props.id) } } className={clapClassName}>
              <img className="clap-icon" src={clapIcon} />
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div onMouseEnter={this.showClapIcon} onMouseLeave={this.hideClapIcon} className="input-group mb-4 col-12 position-relative clapper">
          <div className="border msg-cont p-3 argAgainst">
            <span className="align-middle col-12 d-block text-left">{this.props.msg}</span>
            <div onClick={ () => { this.toggleClap(this.props.id) } } className={clapClassName}>
              <img className="clap-icon" src={clapIcon} />
              <span className="badge">40</span>
            </div>
          </div>
          <img className="m-1 msgimg" src={userIcon} alt="userIcon" />
        </div>
      )
    }
  }

  showClapIcon = () => { this.setState({showClap:true}); }
  hideClapIcon = () => { this.setState({showClap:false}); }

  toggleClap = (msgId) => {
    // change class, add user id to claps,
    console.log('git clapped kek');
    console.log(msgId);
    this.setState({hasClapped: !this.state.hasClapped});
    this.props.webSocket.emit('clapped', {userId: this.props.user.id, msgId: msgId, debateId: this.props.debate._id, value: this.userHasClapped(msgId)});
  }

  userHasClapped = (msgId) => {
    console.log(msgId);
    let arg = this.props.debate._args.find((x) => { return x.id === msgId });
    console.log(arg);
    return (arg.clappers.some((x) => {return x.id === this.props.user.id}));
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

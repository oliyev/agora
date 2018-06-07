import React, { Component } from 'react';
import './login.css';

const login = (props) => {
  return (
    <div className="container-login" onClick={props.outside}>
        <div className="greyback"></div>
        <div className="card card-container">
            <img id="profile-img" className="profile-img-card" src="../../images/agora.png" />
            <p id="profile-name" className="profile-name-card"></p>
              <div className="form-signin">
                <span id="reauth-email" className="reauth-email"></span>
                {props.incorrect}
                <input onChange={props.handleChange} value={props.username} name="username" username={props.username} password={props.password} type="email" id="inputEmail" className="form-control" placeholder="Username" required autoFocus/>
                <input onChange={props.handleChange} value={props.password} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <button onClick={props.login} className="btn2 btn-lg btn-primary btn-block btn-signin">Login</button>
              </div>
            <a onClick={props.displayReg}  className="forgot-password">
                Not registered? Click here!
            </a>
        </div>
    </div>
  );
}

export default login;

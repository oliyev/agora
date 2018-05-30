import React, { Component } from 'react';
import './login.css';

const login = (props) => {
  return (
    <div className="container-login" onClick={props.outside}>
        <div className="greyback"></div>
        <div className="card card-container">
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" className="profile-name-card"></p>
              <div className="form-signin">
                <span id="reauth-email" className="reauth-email"></span>
                {props.incorrect}
                <input onBlur={props.handleChange} name="username" username={props.username} password={props.password} type="email" id="inputEmail" className="form-control" placeholder="Username" required autoFocus/>
                <input onBlur={props.handleChange} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <div id="remember" className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button onClick={props.register} className="btn2 btn-lg btn-primary btn-block btn-signin">Register</button>
              </div>
            <a onClick={props.displayReg}  className="forgot-password">
                Not registered? Click here!
            </a>
        </div>
    </div>
  );
}

export default login;

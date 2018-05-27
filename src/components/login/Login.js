import React, { Component } from 'react';
import './login.css';

const login = (props) => {
  return (
    <div className="container-login" onClick={props.outside}>
        <div className="greyback"></div>
        <div className="card card-container">
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" className="profile-name-card"></p>

                <span id="reauth-email" className="reauth-email"></span>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <div id="remember" className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button onClick={props.login} className="btn2 btn-lg btn-primary btn-block btn-signin">Sign in</button>
            
            <a href="#" className="forgot-password">
                Forgot the password?
            </a>
        </div>
    </div>
  );
}

export default login;

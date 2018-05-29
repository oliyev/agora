import React, { Component } from 'react';
import './register.css';

const register = (props) => {
  return (
    <div className="container-register" onClick={props.outside}>
        <div className="greyback"></div>
        <div className="card card-container">
            <p id="profile-name" className="profile-name-card"></p>
              <div className="form-signin">
                <span id="reauth-email" className="reauth-email"></span>
                {props.incorrect}
                <input onBlur={props.handleChange} name="username" username={props.username} password={props.password} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                <input onBlur={props.handleChange} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <input onBlur={props.handleChange} name="passwordConfirm" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <input onBlur={props.handleChange} name="email" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <input onBlur={props.handleChange} name="country" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                <div id="remember" className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button onClick={props.register} className="btn2 btn-lg btn-primary btn-block btn-signin">Sign in</button>
              </div>
            <a href="#" className="forgot-password">
                Not registered? Click here!
            </a>
        </div>
    </div>
  );
}

export default register;

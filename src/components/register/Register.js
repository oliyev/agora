import React, { Component } from 'react';
import './register.css';

const register = (props) => {
  return (
    <div className="container-register" onClick={props.outside}>
        <div className="greyback"></div>
        <div className="card card-container">
            <h2>Register for Agora</h2>
              <div className="form-signin">
                <span id="reauth-email" className="reauth-email"></span>
                {props.error1}
                <input onChange={props.handleChange} value={props.username} name="username" type="email" id="registerUsernmae" className={props.validationFailed1} placeholder="Username" required autoFocus/>
                {props.error2}
                <input onChange={props.handleChange} value={props.password} name="password" type="password" id="registerPassword" className={props.validationFailed2} placeholder="Password" required/>
                {props.error3}
                <input onChange={props.handleChange} value={props.passwordConfirm} name="passwordConfirm" type="password" id="registerPassword2" className={props.validationFailed3} placeholder="Confirm Password" required/>
                {props.error4}
                <input onChange={props.handleChange} value={props.email} name="email" type="text" id="registerEmail" className={props.validationFailed4} placeholder="Email address" required/>
                <div id="remember" className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Confirm you are not a robot
                    </label>
                </div>
                {props.regButton}
              </div>
            <a className="forgot-password" onClick={props.loginHandler}>
                Already Registered? Login here!
            </a>
        </div>
    </div>
  );
}

export default register;

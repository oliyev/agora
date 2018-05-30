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
                <input onBlur={props.handleChange} name="username" type="email" id="registerUsernmae" className={props.validationFailed1} placeholder="Username" required autoFocus/>
                {props.error2}
                <input onBlur={props.handleChange} name="password" type="password" id="registerPassword" className={props.validationFailed2} placeholder="Password" required/>
                {props.error3}
                <input onBlur={props.handleChange} name="passwordConfirm" type="password" id="registerPassword2" className={props.validationFailed3} placeholder="Confirm Password" required/>
                {props.error4}
                <input onBlur={props.handleChange} name="email" type="password" id="registerEmail" className={props.validationFailed4} placeholder="Email address" required/>
                <input onBlur={props.handleChange} name="country" type="password" id="registerCountry" className="form-control {props.validationFailed}" placeholder="Country" required/>
                <div id="remember" className="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button onClick={props.register} className="btn2 btn-lg btn-primary btn-block btn-signin">Register</button>
              </div>
            <a className="forgot-password">
                Already Registered? Login here!
            </a>
        </div>
    </div>
  );
}

export default register;

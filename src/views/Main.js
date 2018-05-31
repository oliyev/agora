import React, {Component} from 'react';

import Banner from '../components/homepage/Banner';
import Nav from '../components/common/Nav'
import Homepage from './Homepage'
import Chatroom from './Chatroom'
import Login from '../components/login/Login'
import Register from '../components/register/Register'

import '../css/App.css';

import ScrollReveal from 'scrollreveal';
import sr from 'scrollreveal';
import jQuery from 'jquery';
import scrollspy from 'scrollreveal';

import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../../node_modules/magnific-popup/dist/jquery.magnific-popup.js'
import '../../node_modules/jquery/dist/jquery.js';
import '../../node_modules/jquery.easing/jquery.easing.js'
//import '../js/creative.js'

import { Route } from 'react-router-dom'

import axios from 'axios';

var Spinner = require('react-spinkit');

class Main extends Component {
  //The JS originally found in creative.js is loaded here
  componentDidMount() {

    (function($) {
      "use strict"; // Start of use strict

      // Smooth scrolling using jQuery easing
      $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (window.location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && window.location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length
            ? target
            : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 57)
            }, 1000, "easeInOutExpo");
            return false;
          }
        }
      });

      // Closes responsive menu when a scroll trigger link is clicked
      $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
      });

      // Activate scrollspy to add active class to navbar items on scroll
      $('body').scrollspy({target: '#mainNav', offset: 57});

      // Collapse Navbar
      var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-shrink");
        } else {
          $("#mainNav").removeClass("navbar-shrink");
        }
      };
      // Collapse now if page is not at top
      navbarCollapse();
      // Collapse the navbar when page is scrolled
      $(window).scroll(navbarCollapse);

      // Scroll reveal calls
      let sr = ScrollReveal();
      sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
      }, 200);
      sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
      });
      sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
      }, 300);

    })(jQuery); // End of use strict

  }


  state = {
    displayLogin:false,
    displayRegister:false,
    user:null,
    username:"",
    password:"",
    passwordConfirm:"",
    email : "",
    country:"",
    loginIncorrect:false,
    progressBar:false,
    valid1:'form-control',
    valid2:'form-control',
    valid3:'form-control',
    valid4:'form-control',
    navItem1 : "About",
    navItem2 : "Features",
    navItem3 : "Categories",
    navItem4 : "Contact",
    navItem5 : "Login / Register",
    navLink1 : "/#about",
    navLink2 : "/#features",
    navLink3 : "/#categories",
    navLink4 : "/#contact",
    navLink5 : null,
    passwordMatch:"",
    passwordLength:"",
    usernameLength:"",
    validEmail:"",
    regDisabled:true
  }

  //To display login modal, or not, that is the question...
  loginClickHandler = () => {
    const doesShow = this.state.displayLogin;
    this.setState({displayLogin : !doesShow, displayRegister : false})
    console.log("Show: " + doesShow)
  }

  //To display login modal, or not, that is the question...
  registerDisplayHandler = () => {
    const doesShow = this.state.displayRegister;
    this.setState({displayRegister : !doesShow, displayLogin: false})
    console.log("Show: " + doesShow)
  }

  //Handles whether or not the user clicks outside of the login modal
  outsideClickHandler = (e) => {

    if(e.target == document.getElementsByClassName('greyback')[0]){
      this.setState({displayLogin : false, displayRegister:false})
    }
    else{
      //console.log("FALSE")
    }
  }

  //This function sends a request to AgoraWS and handles login
  //If success -> populate user object in the state
  loginHandler = () => {

    let bodyFormData = {"username":this.state.username, "password":this.state.password}
    let self = this;

    //Start the progress Banner
    self.setState({progressBar:true})

    axios({
      method: 'post',
      url: 'https://agora-spring.herokuapp.com/login',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'application/json' }}
    })
    .then(function (response) {
        //handle success
        //console.log(response);
        if(response.data==""){
          //Login Unsuccessful
          self.setState({loginIncorrect : true});
        }else{
          //Login Successful
          self.state.user = response.data
          self.setState({loginIncorrect : false});
          self.loginClickHandler()
          //Change the nav menu
          let titles = ["Home", "Debate", "Friends", "Resources", "Wiki"]
          let links = ["/", "/debate", '/friends', '/resourses', 'wiki']
          self.handleMenuChange(titles, links)
        }
        self.turnOffProgressBar();
        //console.log(self.state.user)
    })
    .catch(function (response) {
        //handle error
        //console.log(response);
    });
  }

  //This function sends a request to AgotaWS to handle registry after
  //some client side validation
  registrationHandler = () => {

    //At this point, client side validation has already been done
    let self = this;
    let bodyFormData = {
	       "username":this.state.username,
	       "password":this.state.password,
	       "email":this.state.email
       }

    //Start the progress Banner
    self.setState({progressBar:true})

    axios({
      method: 'post',
      url: 'https://agora-spring.herokuapp.com/register',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'application/json' }}
    })
    .then(function (response) {
        //handle success
        console.log(response)
        if (response.data == "exists"){
          console.log("USERNAME ALREADY EXISTS")
          let error1 = "This username already exists"
          let valid1 = "form-control validationFailed"
          self.setState({
              usernameLength: error1,
              valid1 : valid1,
              progressBar:false
          })
        } else{
          console.log("NEW USER CREATED!!")
          self.resetErrors()
          self.setState({displayRegister:false, user:response.data, progressBar:false})
          //Change the nav menu
          let titles = ["Home", "Debate", "Friends", "Resources", "Wiki"]
          let links = ["/", "/debate", '/friends', '/resourses', '/wiki']
          self.handleMenuChange(titles, links)
        }
    })
    .catch(function (response) {
        //handle error
        console.log(response);
    });


  }

  handleMenuChange = (titles, links) => {
    this.setState({
      navItem1 : titles[0],
      navItem2 : titles[1],
      navItem3 : titles[2],
      navItem4 : titles[3],
      navItem5 : titles[4],
      navLins1 : links[0],
      navLins2 : links[1],
      navLins3 : links[2],
      navLins4 : links[3],
      navLins5 : links[4],
    })
  }

  //Regex for making sure that an email is entered in the proper format
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  //re-usable function to turn off the progress bar (pacman)
  turnOffProgressBar = () => this.setState({progressBar:false});


  //This function check information from the login inputs and sets state
  //The purpose is to use infomation to then send to AgoraWS
  getLoginFormHandler = (e) =>{
    //e.target.name => the name attribute of the input being returned
    //e.target.value => the value of said attribute
    this.setState({[e.target.name] : e.target.value})
  }

  resetErrors = () => {
    this.setState({
        usernameLength: "",
        passwordLength: "",
        passwordMatch: "",
        validEmail : "",
        valid1 : 'form-control',
        valid2 : 'form-control',
        valid3 : 'form-control',
        valid4 : 'form-control'
    })
  }

  registerFormSimpleInputsHandler = (e) => {

    //pull the current values of the error values
    //the error(n) values correspond to the actual error message
    let error1 = this.state.usernameLength,
        error2 = this.state.passwordLength,
        error3 = this.state.passwordMatch,
        error4 = this.state.validEmail
    //the valid(n) values correspond to the css styling that comes with error
    let valid1 = this.state.valid1,
        valid2 = this.state.valid2,
        valid3 = this.state.valid3,
        valid4 = this.state.valid4

    switch(e.target.name){
      //if username is the target -> check appropriate length
      case "username":
        if (e.target.value.length < 3 && e.target.value !=""){
            error1 = "Username must be at least 3 characters"
            valid1 = "form-control validationFailed"
        }
        else{
          error1 = ""
          valid1 = "form-control"
        }
        break;
      //if password is the target -> check appropriate length
      case "password":
        if (e.target.value.length < 5 && e.target.value !=""){
          console.log("-----> PASSWORD TOO SHORT")
            error2 = "Password must be at least 5 characters"
            valid2 = "form-control validationFailed"
        }
        else{
          error2 = ""
          valid2 = "form-control"
        }
        break;
      //if confirm password is the target -> check that passwords match
      case "passwordConfirm":
        if (e.target.value != this.state.password){
          console.log("-----> PASSWORDS MISMATCH")
          error3 = "Passwords do not match"
          valid2 = "form-control validationFailed"
          valid3 = 'form-control validationFailed'
        }
        else{
          error3 = ""
          valid2 = "form-control"
          valid3 = "form-control"
        }
        break;
      //if email is the target -> validate via regex
      case "email":
        if (!this.validateEmail(e.target.value) && e.target.value != ""){
          console.log("EMAIL IS INVALID")
          error4 = "Email is not valid"
          valid4 = "form-control validationFailed"
        }
        else{
          error4 = ""
          valid4 = "form-control"
        }
        break;
    } // end of switch

    /*****************************************************************
    *   Validation is triggered on the onBlur event for every input (Register.js)
    *   Once the states are updated, we can setState() and trigger a
    *   re-render
    ******************************************************************/
    this.setState({
        //e.target.name => the name attribute of the input being returned
        //e.target.value => the value of said attribute
        [e.target.name] : e.target.value,
        usernameLength: error1,
        passwordLength: error2,
        passwordMatch: error3,
        validEmail : error4,
        valid1 : valid1,
        valid2 : valid2,
        valid3 : valid3,
        valid4 : valid4
    })

  }

  render() {

    console.log("RENDERING......") //Testing lifecylcle -> test exactly when render function is called
    console.log(this.state)
    //the following are conditional elements, if false, then display nothing
    let login = null; //if not null -> display login modal
    let register = null; // if not null -> display register modal
    let incorrectInput = null; // -> if not null, display incorrect login
    let progress = null; //-> if not null, display progress graphics
    let regButton = null; // do we display the register button or not?

    //error for username
    let error1 = null;
    //error for password length
    let error2 = null;
    //error for password mismatch
    let error3 = null;
    //error for invalid email
    let error4 = null;

    //Generate the spans for the error messages
    if (this.state.usernameLength != ""){
      error1 = <span className="form-error">{this.state.usernameLength}</span>
    }
    if (this.state.passwordLength != ""){
      error2 = <span className="form-error">{this.state.passwordLength}</span>
    }
    if (this.state.passwordMatch != ""){
      error3 = <span className="form-error">{this.state.passwordMatch}</span>
    }
    if (this.state.validEmail != ""){
      error4 = <span className="form-error">{this.state.validEmail}</span>
    }

    //check if we need to display incorrect login warning
    if (this.state.loginIncorrect){
      incorrectInput = <span className="incorrect">The username and password combination is incorrect</span>
    }

    //check if we need to display the progress bar
    if (this.state.progressBar && !this.state.loginIncorrect){
      //console.log("PROGRESS BAR SHOULD SHOW NOW")
      progress = <Spinner name="pacman" className="pacman2" color="#ee4b28"/>
    }

    //if user clicks on login, display the login screen
    if (this.state.displayLogin){
      login = <Login
        incorrect={incorrectInput}
        outside={this.outsideClickHandler}
        login={this.loginHandler}
        username={this.state.username}
        password={this.state.password}
        handleChange={this.getLoginFormHandler}
        displayReg={this.registerDisplayHandler}
        />
    }


    if (this.state.usernameLength == ""
        && this.state.passwordMatch == ""
        && this.state.passwordLength == ""
        && this.state.validEmail == ""
        && this.state.username != ""
        && this.state.password != ""
        && this.state.passwordConfirm != ""
        && this.state.email != ""
    ){
      regButton = <button onClick={this.registrationHandler} className="btn2 btn-lg btn-primary btn-block btn-signin">Register</button>
    }

    //if the user clicks register, display register form
    if (this.state.displayRegister){
      //console.log("Display Registration form from Render()")
      register = <Register
          outside={this.outsideClickHandler}
          validationFailed1 = {this.state.valid1}
          validationFailed2 = {this.state.valid2}
          validationFailed3 = {this.state.valid3}
          validationFailed4 = {this.state.valid4}
          handleChange={this.registerFormSimpleInputsHandler}
          error1={error1}
          error2={error2}
          error3={error3}
          error4={error4}
          regButton={regButton}
          loginHandler={this.loginClickHandler}
          username={this.state.username}
          password={this.state.password}
          passwordConfirm={this.state.passwordConfirm}
          email={this.state.email}
        />}

    //This following is what will actualy render
    return (
      <div className="App">
        <Nav loginHandler={this.loginClickHandler}
            title1={this.state.navItem1}
            title2={this.state.navItem2}
            title3={this.state.navItem3}
            title4={this.state.navItem4}
            title5={this.state.navItem5}
            navLink1={this.state.navLink1}
            navLink2={this.state.navLink2}
            navLink3={this.state.navLink3}
            navLink4={this.state.navLink4}
            navLink5={this.state.navLink5}
          />
        {login}
        {register}
        {progress}
        <Route exact path="/" render={() =>
          <div>
            <Homepage />
          </div> }/>
        <Route path="/debate" render={() => <Chatroom /> }/>
      </div>
  );}
}

export default Main;

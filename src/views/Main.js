import React, {Component} from 'react';

import Banner from '../components/homepage/Banner';
import Nav from '../components/common/Nav'
import Homepage from './Homepage'
import Chatroom from './Chatroom'
import Login from '../components/login/Login'

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
    user:null,
    username:null,
    password:null,
    loginIncorrect:false,
    progressBar:false,
    navItem1 : "About",
    navItem2 : "Features",
    navItem3 : "Categories",
    navItem4 : "Contact",
    navItem5 : "Login / Register",
  }

  //To display login modal, or not, that is the question...
  loginClickHandler = () => {
    const doesShow = this.state.displayLogin;
    this.setState({displayLogin : !doesShow})
    console.log("Show: " + doesShow)
  }

  //Handles whether or not the user clicks outside of the login modal
  outsideClickHandler = (e) => {

    if(e.target == document.getElementsByClassName('greyback')[0]){
      console.log("TRUE");
      const doesShow = this.state.displayLogin;
      this.setState({displayLogin : !doesShow})
    }
    else{
      console.log("FALSE")
    }
  }

  //This function sends are request to AgoraWS and handles login
  //If success -> populate user object in the state
  loginHandler = () => {
    console.log("username: " + this.state.username);
    console.log("password: " + this.state.password);

    let bodyFormData = {"username":this.state.username, "password":this.state.password}
    let self = this;

    //Start the progress Banner
    console.log("SET PROGRESS BAR TO TRUE")
    self.setState({progressBar:true})

    axios({
      method: 'post',
      url: 'https://agora-spring.herokuapp.com/login',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'application/json' }}
    })
    .then(function (response) {
        //handle success
        console.log(response);
        if(response.data==""){
          //Login Unsuccessful
          self.setState({loginIncorrect : true});
        }else{
          //Login Successful
          self.state.user = response.data
          self.setState({loginIncorrect : false});
          self.loginClickHandler()
          //Change the nav menu
          let titles = ["Home", "Test", "Test2", "Test3", "Debate"]
          self.handleMenuChange(titles, null)
        }
        self.turnOffProgressBar();
        console.log(self.state.user)
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
      navItem5 : titles[4]
    })
  }

  //re-usable function to turn off the progress bar (pacman)
  turnOffProgressBar = () => this.setState({progressBar:true});


  //This function check information from the login inputs and sets state
  //The purpose is to use infomation to then send to AgoraWS
  getLoginFormHandler = (e) =>{
    console.log(e.target.name)
    this.setState({ [e.target.name] : e.target.value})
  }

  render() {

    //the following are conditional elements, if false, then display nothing
    let login = null;
    let incorrectInput = null;
    let progress = null;

    //check if we need to display incorrect login warning
    if (this.state.loginIncorrect){
      incorrectInput = <span className="incorrect">The username and password combination is incorrect</span>
    }

    //check if we need to display the progress bar
    if (this.state.progressBar && !this.state.loginIncorrect){
      console.log("PROGRESS BAR SHOULD SHOW NOW")
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
        />
    }

    //This following is what will actualy render
    return (
      <div className="App">
        <Nav loginHandler={this.loginClickHandler}
            title1={this.state.navItem1}
            title2={this.state.navItem2}
            title3={this.state.navItem3}
            title4={this.state.navItem4}
            title5={this.state.navItem5}
          />
        {login}
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

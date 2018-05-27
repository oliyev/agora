import React, {Component} from 'react';

import Banner from '../components/homepage/Banner';
import Nav from '../components/homepage/Nav'
import Homepage from './Homepage'
import Chatroom from './Chatroom'

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

class Main extends Component {

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

  render() {
    return (
      <div className="App">
        <Nav/>

        <Route exact path="/" render={() =>
          <div>
            <Homepage />
          </div> }/>

        <Route path="/debate" render={() => <Chatroom /> }/>
      </div>
  );}
}

export default Main;

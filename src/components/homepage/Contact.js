import React, { Component } from 'react';
import '../../css/main.css';



const contact = (props) => {
  return (
    <section id="contact">
      <div className="row" id="team">
        <div className="col-md-12 section-heading text-center sr-button">
          <h2>Team</h2>
          <hr className="my-4"/>
        </div>
        <div className="col-md-12">
          <div className="row row-bottom-padded-lg">
            <div className="col-md-6 text-center sr-button">
              <div className="person">
                <img src="images/yev.jpg" className="img-responsive img-rounded" alt="Person"/>
                <h3 className="name">Yev Kantorovich</h3>
                <div className="position">Full Stack Developer - Léger</div>
                <p>Favourites: Java, Spring, AngularJS, ReactJS, Android Development<br /><br /> Languages Spoken: English & Russian</p>
                <ul className="social social-circle">
                  <li className="sr-icons"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                  <li className="sr-icons"><a href="#"><i className="fa fa-github"></i></a></li>
                  <li className="sr-icons"><a href="#"><i className="fa fa-facebook"></i></a></li>
                  <li className="sr-icons"><a href="#"><i className="fa fa-twitter"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 text-center sr-button">
              <div className="person">
                <img src="images/oli.jpg" className="img-responsive img-rounded" alt="Person"/>
                <h3 className="name">Olivier Lepage</h3>
                <div className="position">Full Stack Developer - BeeHivr</div>
                <p>Favourites: C#, Node.js, Vue.js, ReactJS, Android Development, Kotlin<br /><br /> Languages Spoken: French & English</p>
                <ul className="social social-circle">
                  <li className="sr-icons"><a href="#"><i className="fa fa-twitter"></i></a></li>
                  <li className="sr-icons"><a href="#"><i className="fa fa-linkedin"></i></a></li>
                  <li className="sr-icons"><a href="#"><i className="fa fa-twitch"></i></a></li>
                  <li className="sr-icons"><a href="#"><i className="fa fa-github"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default contact;

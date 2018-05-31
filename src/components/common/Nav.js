import React, { Component } from 'react';
import '../../css/main.css';



const nav = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand js-scroll-trigger" href="#page-top"><img className="logo" src="images/agora.png" alt="Agora Logo"/></a>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href={props.navLink1}>{props.title1}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href={props.navLink2}>{props.title2}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href={props.navLink3}>{props.title3}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href={props.navLink4}>{props.title4}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger" href={props.navLink5} onClick={props.loginHandler}>{props.title5}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default nav;

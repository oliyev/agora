import React, {Component} from 'react';
import '../../css/main.css';
import {withRouter, Link } from 'react-router-dom'

class Nav extends Component {

  navMenuClickHandler = (link) => {
    console.log(link)
    this.props.history.push(link)
    if(link.includes("#")){
      link = link.replace("/#", "");
      console.log("Link:   " + link)
    }
  }

  render(props) {
    let navStyle, linkStyle;
    console.log(window.location.pathname);
    if (window.location.pathname.includes('debate')){
      navStyle = 'nav-chatroom navbar navbar-expand-lg navbar-light primary-grad';
      linkStyle = ' js-scroll-trigger'
    }
    else {
      navStyle = 'navbar navbar-expand-lg navbar-light fixed-top';
      linkStyle = 'navbar-brand js-scroll-trigger';
    }

    return (<nav className={navStyle} id="mainNav">
      <div className="container">
        <div className="agoralogo">
          <a className={linkStyle} href="#page-top"><img className="logo" src="images/agora.png" alt="Agora Logo"/></a>
        </div>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link js-scroll-trigger" to={{
                pathname: this.props.navLink1,
                hash: this.props.navHash1
              }}>{this.props.title1}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link js-scroll-trigger" to={{
                pathname: this.props.navLink2,
                hash: this.props.navHash2,
              }}>{this.props.title2}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link js-scroll-trigger" to={{
                pathname: this.props.navLink3,
                hash: this.props.navHash3,
              }}>{this.props.title3}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link js-scroll-trigger" to={{
                pathname: this.props.navLink4,
                hash: this.props.navHash4,
              }}>{this.props.title4}</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link js-scroll-trigger"
                onClick={this.props.loginHandler}>{this.props.title5}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>);
  }
}

export default withRouter(Nav);

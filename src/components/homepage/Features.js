import React, { Component } from 'react';
import '../../css/main.css';



const features = (props) => {
  return (
    <section id="features">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading">How it works</h2>
            <hr className="my-4"/>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 text-center">
            <div className="service-box mt-5 mx-auto">
              <i className="fa fa-4x fa-clock-o text-primary mb-3 sr-icons"></i>
              <h3 className="mb-3">Timed Response</h3>
              <p className="text-muted mb-0">Each debator has up to 1 minute to make their argument</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center">
            <div className="service-box mt-5 mx-auto">
              <i className="fa fa-4x fa-globe text-primary mb-3 sr-icons"></i>
              <h3 className="mb-3">Open to the world</h3>
              <p className="text-muted mb-0">Like a true Agora, this a public forum where anyone can spectate</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center">
            <div className="service-box mt-5 mx-auto">
              <i className="fa fa-4x fa-graduation-cap text-primary mb-3 sr-icons"></i>
              <h3 className="mb-3">Learn</h3>
              <p className="text-muted mb-0">Not everyone is an expert, but we provide resources to help you follow current events</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 text-center">
            <div className="service-box mt-5 mx-auto">
              <i className="fa fa-4x fa-heart text-primary mb-3 sr-icons"></i>
              <h3 className="mb-3">Made with Love</h3>
              <p className="text-muted mb-0">The end goal is to connect people and build bridges</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default features;

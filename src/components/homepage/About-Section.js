import React, { Component } from 'react';
import '../../css/main.css';



const about = (props) => {
  return (
    <section className="bg-primary" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="section-heading text-white">Don''t let bias hinder a real discussion</h2>
            <hr className="light my-4"/>
            <p className="text-faded mb-4">Do away with identity politics and discuss issues on the their merits alone. Too often, proper discussion is rendered useless when we are unable too look past things like race, gender, religion, political affiliation, sexual orientation, country of origin, and more.
            <br /> <br /> The purpose of this platform is to provide a safe space for one to discuss issues without revealing who you are. Just as with the Agoras of Ancient Greece, one is given scores determined by their peers, and judged solely on the ideas presented <br /></p>
            <a className="btn btn-light btn-xl js-scroll-trigger" href="#features">Get Started!</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default about;

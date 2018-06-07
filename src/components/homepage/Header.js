import React, { Component } from 'react';
import '../../css/main.css';



const header = (props) => {
  return (
    <header className="homepagebg text-center text-black d-flex">
      <div className="primary-grad whMax">
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-10 mx-auto headerStyle">
              <h1 className="text-uppercase">
                <strong>Agora: The Ultimate Debate Platform</strong>
              </h1>
              <hr/>
            </div>
            <div className="col-lg-8 mx-auto">
              <p className="text-faded mb-5"> Discuss issues that are important to you with total and complete anonimity </p>
              <a className="btn btn-primary btn-xl js-scroll-trigger" href="#about">Find Out More</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default header;

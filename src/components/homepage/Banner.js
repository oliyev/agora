import React, { Component } from 'react';
import '../../style/main.css';

const banner = (props) => {
  return (
    <div className="homepagebg col-12">
      <div className="primary-grad whMax col-12">
        <h1 className="maintitle">Agora</h1>
        <p className="paragraph">A place where you can anonymously debate on politics, social issues that matters most to you.</p>
      </div>
    </div>
  );
}

export default banner;

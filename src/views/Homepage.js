import React, { Component } from 'react';
import Banner from '../components/homepage/Banner';
import Header from '../components/common/Header';
import '../style/App.css';

class Homepage extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Banner />
      </div>
    );
  }
}

export default Homepage;

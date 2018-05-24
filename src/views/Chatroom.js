import React, { Component } from 'react';
import Header from '../components/common/Header';

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

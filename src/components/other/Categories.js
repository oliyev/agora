import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import jQuery from 'jquery';
import ListItem from './ListItem'
import './other.css';

class Categories extends Component {
  static isDisabled = false;
  state = {
    q: 'queue',
    isDisabled: false
  }

  componentDidMount() {

    (function($) {
      "use strict"; // Start of use strict



    })(jQuery); // End of use strict

  }

  render(props) {
    return (
      <div className="col-lg-16 listItem-cat">
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    );
  }
}

export default Categories;

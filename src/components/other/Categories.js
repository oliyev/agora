import React, { Component } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import jQuery from 'jquery';
import ListItem from './ListItem'
import './other.css';

class Categories extends Component {

  state = {
    dataset:[],
  }

  componentDidMount(){
    axios.get('https://agora-spring.herokuapp.com/getDebates')
      .then(response => {
        this.setState({dataset : response.data})
        console.log(this.state.dataset)
      })
  }

  render(props) {
    let listItems = null

    if (this.state.dataset.length > 0){
      listItems = this.state.dataset.map((item) => <ListItem  image={item.imageURL} topic={item.topic} description={item.description} id={item.id}/> )
      console.log(listItems)
    }

    return (
      <div className="col-lg-16 listItem-cat">
        {listItems}
      </div>
    );
  }
}

export default Categories;

import React, { Component } from 'react';
import '../../css/main.css';
import axios from 'axios'

class Categories extends Component{

  state = {
    dataset: []
  }

  componentDidMount(){
    axios.get('https://agora-spring.herokuapp.com/getDebates')
      .then(response => {
        console.log(response);
        this.setState({dataset : response.data})
        console.log(this.state.dataset)
      })
  }

  render(){
    console.log("Rendering....")
    let section = null;

    if (this.state.dataset.length != 0){
      section =
      <section className="p-0" id="categories">
        <div className="container-fluid p-0">
          <div className="row no-gutters popup-gallery">
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box aStyle" href={this.state.dataset[0].imageURL}>
                <img className="img-fluid imgStyle" src={this.state.dataset[0].imageURL} alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      {this.state.dataset[0].topic}
                    </div>
                    <div className="project-name">
                      {this.state.dataset[0].description}
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box aStyle" href={this.state.dataset[1].imageURL}>
                <img className="img-fluid imgStyle" src={this.state.dataset[1].imageURL} alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      {this.state.dataset[1].topic}
                    </div>
                    <div className="project-name">
                      {this.state.dataset[1].description} Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box aStyle" href={this.state.dataset[2].imageURL}>
                <img className="img-fluid imgStyle" src={this.state.dataset[2].imageURL} alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      {this.state.dataset[2].topic}
                    </div>
                    <div className="project-name">
                      {this.state.dataset[2].description}
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box aStyle" href={this.state.dataset[3].imageURL}>
                <img className="img-fluid imgStyle" src={this.state.dataset[3].imageURL} alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      {this.state.dataset[3].topic}
                    </div>
                    <div className="project-name">
                      {this.state.dataset[3].description}
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box aStyle" href={this.state.dataset[4].imageURL}>
                <img className="img-fluid imgStyle" src={this.state.dataset[4].imageURL} alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      {this.state.dataset[4].topic}
                    </div>
                    <div className="project-name">
                      {this.state.dataset[4].description}
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box aStyle" href={this.state.dataset[5].imageURL}>
                <img className="img-fluid imgStyle" src={this.state.dataset[5].imageURL} alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      {this.state.dataset[5].topic}
                    </div>
                    <div className="project-name">
                      {this.state.dataset[5].description}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    }

    return(
      <div>
        {section}
        <section className="bg-dark text-white">
          <div className="container text-center">
            <h2 className="mb-4">Want to see more topics?</h2>
            <a className="btn btn-light btn-xl sr-button" href="http://startbootstrap.com/template-overviews/creative/">Click here to learn how!</a>
          </div>
        </section>
      </div>
    )
  }
}

export default Categories;

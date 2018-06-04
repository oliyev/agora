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
    console.log

    if (this.state.dataset.length != 0){
      section = <section className="p-0" id="Categories">
        <div className="container-fluid p-0">
          <div className="row no-gutters popup-gallery">
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href={this.state.dataset[0].imageURL}>
                <img className="img-fluid" src={this.state.dataset[0].imageURL} alt=""/>
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
              <a className="portfolio-box" href="images/portfolio/fullsize/2.jpg">
                <img className="img-fluid" src="images/portfolio/thumbnails/2.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="images/portfolio/fullsize/3.jpg">
                <img className="img-fluid" src="images/portfolio/thumbnails/3.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="images/portfolio/fullsize/4.jpg">
                <img className="img-fluid" src="images/portfolio/thumbnails/4.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="images/portfolio/fullsize/5.jpg">
                <img className="img-fluid" src="images/portfolio/thumbnails/5.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-lg-4 col-sm-6">
              <a className="portfolio-box" href="images/portfolio/fullsize/6.jpg">
                <img className="img-fluid" src="images/portfolio/thumbnails/6.jpg" alt=""/>
                <div className="portfolio-box-caption">
                  <div className="portfolio-box-caption-content">
                    <div className="project-category text-faded">
                      Category
                    </div>
                    <div className="project-name">
                      Project Name
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
            <h2 className="mb-4">Free Download at Start Bootstrap!</h2>
            <a className="btn btn-light btn-xl sr-button" href="http://startbootstrap.com/template-overviews/creative/">Download Now!</a>
          </div>
        </section>
      </div>
    )
  }
}

export default Categories;

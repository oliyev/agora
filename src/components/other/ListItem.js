import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import jQuery from 'jquery';
import icons from 'glyphicons'

class ListItem extends Component {

  state = {
  }

  componentDidMount() {

    (function($) {
      "use strict"; // Start of use strict
      console.log(icons)

      $('ul.dd-header').click(function(e) {

      var $el = $(this).find('ul.hidden');
      var $opened = $('.toggledDown').not($el);
      $opened.toggleclassName('toggledDown');
      $opened.slideToggle();
      $el.toggleclassName('toggledDown');
      $el.stop().slideToggle();

      if( $(this).hasclassName('select') ) {
      $(this).removeclassName('select').addclassName('hidden');
        } else {
          $(this).siblings().removeclassName('select').addclassName('hidden');
          $(this).removeclassName('hidden').addclassName('select');
        }
      });

    })(jQuery); // End of use strict

  }

  render(props) {
    return (
      <div className="col-md-10">
            <div className="well well-sm">
                <div className="row itemRow">
                    <div className="col-xs-3 col-md-3 text-center">
                        <img src={this.props.image} alt="Debate Topic"
                            className="img-rounded img-responsive smallImgStyle" />
                    </div>
                    <div className="col-xs-9 col-md-9 section-box">
                        <h2>{this.props.topic}</h2>
                        <p>{this.props.description}</p>
                        <hr />
                        <div className="row rating-desc">
                            <div className="col-md-12">
                                <span className="glyphicon glyphicon-heart"></span><span className="glyphicon glyphicon-heart">
                                </span><span className="glyphicon glyphicon-heart">{icons.heart}</span>(36)<span className="separator">|</span>
                                <span className="glyphicon glyphicon-comment">{icons.whale}</span>(100 Comments)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default ListItem;

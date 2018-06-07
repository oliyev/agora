import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import jQuery from 'jquery';
import icons from 'glyphicons'

import { withRouter } from 'react-router-dom'

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

  onClickDebateHandler = (stance, topic) => {
    sessionStorage.setItem("debateId", this.props.id)
    sessionStorage.setItem("stance", stance)
    sessionStorage.setItem("topic", topic)
    console.log(sessionStorage.getItem("debateId"));
    console.log(sessionStorage.getItem("stance"));
    this.props.history.push("/debate")
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
                                <button className="btn btn-info sr-button ctButton" onClick={ () => this.onClickDebateHandler(true, this.props.topic) } > Debate for this postion! </button>
                                <button className="btn btn-info sr-button ctButton" onClick={ () => this.onClickDebateHandler(false, this.props.topic) } > Debate against this postion</button>
                                <button className="btn btn-info sr-button ctButton" onClick={ () => this.onClickDebateHandler(null, this.props.topic) } > Be a spectator </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default withRouter(ListItem);

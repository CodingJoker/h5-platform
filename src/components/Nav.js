/*
* @Author: jumorzhu@tecent.com
* @Date:   2016-11-30 10:03:59
* @Last modified by:   Jumorzhu
* @Last modified time: 2017-01-09
*/

'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from "React";
import {Link} from "react-router";
class NavComponent extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    var sliderShowClass = this.props.hide ? 'hide':'';

    return (

        <nav className={"slider-nav " + sliderShowClass}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/friend-star">Canvas-Friends-star</Link></li>
            <li><Link to="/friend-star-v2">V2-Friends-star</Link></li>
            <li><Link to="/hackkingdom">黑客帝国字幕</Link></li>
            <li><Link to="/meteor">流星弹幕</Link></li>
          </ul>

            <span className="hide-btn" onClick={this.props.toggle}> 《</span>
        </nav>

      )
  }
}
NavComponent.defaultProps = {};

export default NavComponent;

/*
* @Author: jumorzhu@tecent.com
* @Date:   2016-11-30 10:03:59
* @Last Modified by:   jumorzhu
* @Last Modified time: 2016-11-30 10:42:13
*/

'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from "React";
import {Link} from "react-router";

class NavComponent extends React.Component{
  render(){
    return (
        <nav className="slider-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/friend-star">Canvas-Friends-star</Link></li>
          </ul>
        </nav>
      )
  }
}
NavComponent.defaultProps = {};

export default NavComponent;

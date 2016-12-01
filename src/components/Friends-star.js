/*
* @Author: jumorzhu@tecent.com
* @Date:   2016-11-22 17:19:47
* @Last Modified by:   jumorzhu
* @Last Modified time: 2016-12-01 09:06:35
*/

'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

class FriendsStarComponent extends React.Component{
  componentDidMount() {
     var
        ctx = this.refs.canvas.getContext('2d')
        ,image = new Image()
      ;
      image.src = 'images/star-example.png';
      image.onload = function(){
      };


  }
  render(){
     return (
        <div className="friend-star">
          <h3 className='title'>Friends-Star</h3>
          <canvas ref="canvas"></canvas>
        </div>

      )
  }
}


FriendsStarComponent.defaultProps = {};

export default FriendsStarComponent;

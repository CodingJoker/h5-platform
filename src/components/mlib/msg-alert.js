/*
* @Author: jumorzhu@tecent.com
* @Date:   2016-12-08 15:52:40
* @Last Modified by:   jumorzhu
* @Last Modified time: 2016-12-08 16:41:43
*/

'use strict';
require('normalize.css/normalize.css');
require('styles/mlib/msg.scss');

import React from 'react';

class MsgAlertComponent extends React.Component{
  render(){
    console.time("渲染");
     if(this.props.isShow){
      return (
          <div className={"_msg-alert "+ this.props.type}>
           {this.props.text}
          </div>
        )
     }else
     return null;
  }
}

MsgAlertComponent.defaultProps = {};

export default MsgAlertComponent;

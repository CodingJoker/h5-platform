/**
* @Author: Jumorzhu
* @Date:   2016-12-13
* @Email:  550928460@qq.com
* @Last modified by:   Jumorzhu
* @Last modified time: 2017-01-07
*/
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Nav from './Nav';
import AlloyFinger from "./lib/AlloyFinger.js";
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  };
  state ={
    hide:false
  }
  toggle = (e) =>{
    if(this.alloyFingerRegister.get() == 1){
      let _this = this;
      if(e.direction == "Left"){
        _this.setState({hide:true});
      }else if(e.direction == 'Right'){
        _this.setState({hide:false});
      }
    }
    return;
  };
  alloyFingerRegister = {
    _alloyFingerCount: 1, //��ʼ��ע��alloyfinger�¼�������
    ins:function(){
      this._alloyFingerCount++;
    },
    desc:function(){
      if(this._alloyFingerCount == 1){
        console.warn("AlloyFinger has only registered at root dom! Do not decrease the count!");
        return;
      }
      this._alloyFingerCount--;
    },
    get:function(){
      return this._alloyFingerCount;
    }
  }
  render() {
    let slideHideClass = this.state.hide ? 'slide-hide' : 'slide-show';
    return (
      <AlloyFinger onSwipe={this.toggle}>
      <div className="container">
        <Nav toggle={this.toggle} hide={this.state.hide} />
        <div className={"main-view " + slideHideClass} id="main_view">
          {this.props.children}
        </div>
	   </div>
     </AlloyFinger>
    );
  }
}



AppComponent.defaultProps = {};

export default AppComponent;

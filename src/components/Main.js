require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Nav from './Nav';
import AlloyFinger from "./lib/AlloyFinger.js";
class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  };
  state ={
    hide:false
  }
  toggle(){
    let _this = this;
    _this.setState({hide:!_this.state.hide});
  };
  render() {
    let slideHideClass = this.state.hide ? 'slide-hide' : '';
    return (
      <AlloyFinger onSwipe={this.toggle}>
      <div className="container">
        <Nav toggle={this.toggle} hide={this.state.hide} />
        <div className={"main-view " + slideHideClass}>
          {this.props.children}
        </div>
	   </div>
     </AlloyFinger>
    );
  }
}



AppComponent.defaultProps = {};

export default AppComponent;

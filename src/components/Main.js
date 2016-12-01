require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import Nav from './Nav';

class AppComponent extends React.Component {

  render() {
    return (
      <div className="container">
        <Nav />
        <div className="main-view">
          {this.props.children}
        </div>
	   </div>
    );
  }
}



AppComponent.defaultProps = {};

export default AppComponent;

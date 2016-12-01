import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import FriendsStar from './components/Friends-star';
import {Router,Route,hashHistory} from 'react-router';
// Render the main component into the dom
ReactDOM.render( <Router history={hashHistory}>
                  <Route path="/" component={App}>
                    <Route path="/friend-star" component={FriendsStar} />
                  </Route>
                </Router>
               , document.getElementById('app')
);

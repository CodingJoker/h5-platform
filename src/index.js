/**
* @Author: Jumorzhu
* @Date:   2016-12-13
* @Email:  550928460@qq.com
* @Last modified by:   Jumorzhu
* @Last modified time: 2017-01-06
*/
import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import FriendsStar from './components/Friends-star';
import FriendsStarV2 from './components/Friends-star-v2';
import HackKingdom from './components/HackKingdom';
import Meteor from './components/Meteor.js';
import {Router,Route,hashHistory} from 'react-router';
// Render the main component into the dom
ReactDOM.render( <Router history={hashHistory}>
                  <Route path="/" component={App}>
                    <Route path="/friend-star" component={FriendsStar} />
                    <Route path="/friend-star-v2" component={FriendsStarV2} />
                    <Route path="/hackkingdom" component={HackKingdom} />
                    <Route path="/meteor" component={Meteor} />
                  </Route>
                </Router>
               , document.getElementById('app')
);

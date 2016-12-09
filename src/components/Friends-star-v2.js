/*
* @Author: jumorzhu@tecent.com
* @Date:   2016-12-05 17:39:57
* @Last Modified by:   jumorzhu
* @Last Modified time: 2016-12-09 17:28:58
*/

'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/friendstarv2.scss');
import ImagePreview from './mlib/image-preview.js';

import React from 'react';
import ReactDOM from 'react-dom';
import { message, Button } from 'antd';

class FriendsStarV2Component extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.ImagePreview = null;
  };
  state = {
    imageInfo:{
      width : 320,
      height :407
    },
    where:'index',
    data:{
      like:null,
      comment:null
    }
  }
  submit = () => {
    let
      like = this.refs.like_input.value
     ,comment = this.refs.comment_input.value
    ;
    if(!like || !comment){
      message.info("请填写【赞】和【评论】数量");
      return;
    };

    if(!this.ImagePreview.getFileDataUrl()){
      message.info("请选择图片");
      return;
    }
    this.setState({
      data:{
        like:like,
        comment:comment
      },
      where:'step-1'
    });
  }
  back = (e) => {
   // this.props.screenSwipe();
  }
  chooseFile = () => {
    if(this.ImagePreview == null){
      message.info('请等待，正在加载模块');
      return;
    }
     this.ImagePreview.chooseFile();
  }
  componentDidMount() {
    this.ImagePreview = ReactDOM.render(<ImagePreview imageInfo={this.state.imageInfo} / > , this.refs.image_preview);
  }
  render() {
    var
      display_none = {
      "display":"none"
     }
     ,at_index = this.state.where == 'index' ? {}:display_none
     ,at_step_1 = this.state.where == 'step-1' ? {}:display_none
    ;
    return (
        <div className="friend-star-v2">
          <div className="index" style={at_index}>
            <div className="input-area">
                <div className="input-item">
                  <span className="head">Like: </span>
                  <input type="text" ref = 'like_input'/>
                </div>
                <div className="input-item">
                  <span className="head">Comment: </span>
                  <input type="text" ref = 'comment_input'/>
                </div>
                <div className="input-item">
                  <span className="head">Min Ago: </span>
                  <input type="text" />
                </div>
                <div className="input-item btn-gp">
                  <span className="input-btn" onClick={this.chooseFile}>ChooseImage </span>
                  <span className="input-btn" onClick={this.submit}>Submit </span>
                </div>

            </div>
          </div>
          <div className="friend-step-1" style={at_step_1}>
            <div ref="image_preview">
            </div>
            <div className="word">
              <span className="info">获得【孤犬成就】</span>
            </div>
            <div className="bt-bar">
              <span className="like-icon">赞</span>
              <span className="comment-icon">评论</span>
              <div className="num-box">
                <span className="like-num">{this.state.data.like}</span>
                <span className='comment-num'>{this.state.data.comment}</span>
              </div>
            </div>
          </div>
          <div className="alert">
            <h2 >
              请在5s上查看
             <span className="input-btn" onClick={this.submit}>Submit </span>
            </h2>
          </div>
        </div>
      )
  }
}



FriendsStarV2Component.defaultProps = {};

export default FriendsStarV2Component;

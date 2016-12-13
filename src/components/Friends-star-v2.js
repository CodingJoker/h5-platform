/*
* @Author: jumorzhu@tecent.com
* @Date:   2016-12-05 17:39:57
* @Last Modified by:   jumorzhu
* @Last Modified time: 2016-12-13 17:29:59
*/

'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/friendstarv2.scss');
import ImagePreview from './mlib/image-preview.js';

import React from 'react';
import ReactDOM from 'react-dom';
import { message, Alert} from 'antd';

class FriendsStarV2Component extends React.Component {
  constructor(props) {
    super(props);
    this.ImagePreview = null;
  };
  state = {
    imageInfo:{
      width : 320
    },
    where:'index',
    data:{
      like:null,
      comment:null,
      text:'',
    }
  }
  submit = () => {
    let
      like = this.refs.like_input.value
     ,comment = this.refs.comment_input.value
     ,min = this.refs.min_input.value
     ,text = this.refs.pic_text.value
    ;
    // if(!like){
    //   message.warning("请填写【赞】");
    //   return;
    // };
    // if(!comment){
    //   message.warning("请填写【评论】");
    //   return;
    // };
    //  if(!min){
    //   message.warning("请填写【几分钟前】");
    //   return;
    // };
    // if(!text){
    //   message.warning("请填写【图片描述】");
    //   return;
    // };
    // if(!this.ImagePreview.getFileDataUrl()){
    //   message.warning("请选择图片");
    //   return;
    // }
    this.setState({
      data:{
        like:like,
        comment:comment,
        min:min,
        text:text
      },
      where:'step-1'
    });
  }
  to = (where) => {
    let _this = this;
    return function(){
      _this.setState({
        where:where
      });
    }
  }
  chooseFile = () => {
    if(this.ImagePreviewAttavr == null){
      message.info('请等待，正在加载模块');
      return;
    }
      this.ImagePreviewAttavr.chooseFile();
  }
  componentDidMount() {
    this.ImagePreview = ReactDOM.render(<ImagePreview imageInfo={this.state.imageInfo} / > , this.refs.image_preview);
    this.ImagePreviewAttavr = ReactDOM.render(<ImagePreview imageInfo={{width:40,height:40}} / > , this.refs.attavr);
  }
  render() {
    let
      display_none = {
      "display":"none"
     }
     ,where = this.state.where
     ,at_index = where == 'index' ? {}:display_none
     ,at_step_1 = where == 'step-1' || where == 'step-2' ? {}:display_none
     ,at_step_2 = where == 'step-2' ? 'inverse':''
     ,at_step_2_style = where == 'step-2' ?  {}:display_none
     ,step_2_image
    ;
    document.title = this.state.data.min + "分钟前";
    if(where == 'step-2'){
      step_2_image = this.ImagePreview.getDataUrl();
    }

    let images = [];
    for(let i = 1, length = this.state.data.like; i <= length ; i++){
        let img = require('images/attavr/'+i+'.jpg');
        images.push(
            <img src={img} key={i} alt=""/>
          )
    }
    return (
        <div className={"friend-star-v2 " + at_step_2}>
          <div className="index" style={at_index}>
            <div className="input-area">
                <div className="input-item">
                  <span className="head">点赞数: </span>
                  <input type="number" ref = 'like_input' placeholder=""/>
                </div>
                <div className="input-item">
                  <span className="head">评论数: </span>
                  <input type="number" ref = 'comment_input' placeholder=""/>
                </div>
                <div className="input-item">
                  <span className="head">几分钟前: </span>
                  <input type="number" ref="min_input" placeholder="" />
                </div>
                <div className="input-item">
                  <span className="head">描述: </span>
                  <input type="text" ref="pic_text" placeholder=""/>
                </div>
                <div className="input-item btn-gp">
                  <span className="input-btn" onClick={this.chooseFile}>选择头像 </span>
                  <span className="input-btn" onClick={this.submit}>确认 </span>
                </div>

            </div>
            <div>
              <Alert message="朋友圈第一界面点击赞返回上一界面" type="info"  />
              <Alert message="朋友圈第一界面点击评论返回下一界面" type="info"  />
              <Alert message="朋友圈第二界面点击删除返回上一界面" type="info"  />
              <Alert message="点击照相机可以选择图片" type="info"  />

            </div>
          </div>
          <div className="friend-step-1" style={at_step_1}>
            <div ref="image_preview">
            </div>
            <div className="word">
              <span className="info">{this.state.data.text}</span>
            </div>
            <div className="bt-bar">
              <span className="like-icon" onClick={this.to('index')}>赞</span>
              <span className="comment-icon" >评论</span>
              <div className="num-box">
                <span className="like-num">{this.state.data.like}</span>
                <span className='comment-num' onClick={this.to('step-2')}>{this.state.data.comment}</span>
              </div>
            </div>

          </div>
          <div className={"friend-step-2 "} style={at_step_2_style}>
              <div className="info">
                <div className="left">
                  <div className="attavr" ref="attavr">

                  </div>
                </div>
                <div className="right">
                  <span className="user-name">Jumor</span>
                  <span className="text">{this.state.data.text}</span>
                  <span className="img">
                    <img src={step_2_image} alt=""/>
                  </span>
                  <div className="bottom">
                    <span className="ago">{this.state.data.min}分钟前</span>
                    <a className="del-btn"  onClick={this.to('step-1')}>删除</a>
                  </div>
                </div>
              </div>
              <div className="lc-box">
                {images}
              </div>
              <div className="c-box">
                <input type="text" placeholder="评论"/>
                <img src={"images/smile.png"} alt=""/>
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

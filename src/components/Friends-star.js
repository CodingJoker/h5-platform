/*
* @Author: jumorzhu@tecent.com
* @Date:   2016-11-22 17:19:47
* @Last Modified by:   CodingJoker
* @Last Modified time: 2016-12-05 00:19:17
*/

'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

class FriendsStarComponent extends React.Component{
  constructor(props){
    super(props);
    this.fileInput = this.fileInput.bind(this);
    this.drawToCanvas = this.drawToCanvas.bind(this);
    this.valueInput = this.valueInput.bind(this);
    var
      _this = this
      ,date = new Date()
    ;

    this.data = {
      appData:{
        hour : date.getHours(),
        min : date.getMinutes(),
        year : date.getFullYear(),
        mouth : date.getMonth()+1,
        day : date.getDate(),
        like:23,
        comment:24
      },
      dataUrl:''
    }
  }

  componentDidMount() {

  };
  drawToCanvas(){
    var
       ctx = this.refs.canvas.getContext('2d')
       ,image = new Image()
       ,canvas = this.refs.canvas
       ,ctx = canvas.getContext('2d')
       ,_this = this
     ;
     image.src = this.data.dataUrl;
     image.onload = function(){
         ctx.drawImage(image,0,0,640,1136);
         var
             date = new Date()
             ,hour = _this.data.appData.hour
             ,min = _this.data.appData.min
             ,year = _this.data.appData.year
             ,mouth = _this.data.appData.mouth
             ,day = _this.data.appData.day
             ,like = _this.data.appData.like
             ,comment = _this.data.appData.comment
           ;
           min = min < 10 ? '0'+min : min;
           hour = hour < 10 ? '0' +hour :hour;
           day = day < 10 ? '0' + day : day;

           console.log(year+"年"+mouth+'月'+day+'日 '+hour+' : '+min);
         //设置顶部时间
         ctx.fillStyle = '#000';
         ctx.fillRect(290,0,75,33);
           ctx.font = "22px Heiti SC";
           ctx.fillStyle = '#fff';
           ctx.fillText(hour+' : '+min,288,30);
           //设置日期时间
           ctx.fillStyle = '#000';
           ctx.fillRect(120,70,370,30);
           ctx.font = "28px sans-serif";
           ctx.fillStyle = '#d0cfd0';
           ctx.fillText(year+"年"+mouth+'月'+day+'日 '+hour+' : '+min,180,97);

           //修改赞数与评论
           var likeImageData  = ctx.getImageData(502,1076,32,32);
           // ctx.putImageData(likeImageData,400,1076);
           var commentImageData = ctx.getImageData(567,1076,35,35);
           // ctx.putImageData(commentImageData,467,1076);
         ctx.fillStyle = "#181818";
         ctx.fillRect(502,1076,200,32);
         ctx.putImageData(likeImageData,450,1076);
         ctx.font = "22px Heiti SC";
         ctx.fillStyle="#d0cfd0";
         ctx.fillText(like,490,1100);
         ctx.putImageData(commentImageData,537,1076);
         ctx.fillText(comment,577,1100);
     };
  };
  fileInput(e){
    let _this = this;
    var file = e.target.files[0];//获取input输入的图片
          if(!/image\/\w+/.test(file.type)){
              alert("请确保文件为图像类型");
              return false;
          }
          //判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
          var reader = new FileReader();
          reader.readAsDataURL(file);//转化成base64数据类型
          reader.onload = function(e){
              _this.data.dataUrl = this.result;
                _this.drawToCanvas();
         }
  };

  valueInput(type){
    let
      _this = this
    ;
   return function(e){
      let value = e.target.value;
      _this.data.appData[type] = value;
      _this.drawToCanvas();
   }
  };

  render(){
     return (
        <div className="friend-star">
          <h3 className='title'>Friends-Star</h3>
          <div className="input-area">
              <div className="input-item">
                <input type="file" ref = 'file-input'onChange={this.fileInput}/>
              </div>
              <div className="input-item">
                <span className="head">点赞数: </span>
                <input type="text" ref = 'like-input' onChange={this.valueInput('like')}/>
              </div>
              <div className="input-item">
                <span className="head">评论数: </span>
                <input type="text" ref = 'comment-input' onChange={this.valueInput('comment')}/>
              </div>
              <div className="input-item">
                <span className="head">年: </span>
                <input type="text" ref = 'year'/>
              </div>
               <div className="input-item">
                  <span className="head">月: </span>
                <input type="text" ref = 'mouth'/>
              </div>
              <div className="input-item">
                <span className="head">日: </span>
                <input type="text" ref = 'day'/>
              </div>
              <div className="input-item">
                <span className="head">时: </span>
                <input type="text" ref = 'hour'/>
              </div>
               <div className="input-item">
                  <span className="head">分: </span>
                <input type="text" ref = 'min'/>
              </div>
          </div>
          <canvas ref="canvas" width='640' height='1136'></canvas>
        </div>

      )
  }
}


FriendsStarComponent.defaultProps = {};

export default FriendsStarComponent;

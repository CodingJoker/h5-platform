/*
* @Author: jumorzhu@tecent.com
* @Date:   2016-12-05 19:51:31
* @Last Modified by:   jumorzhu
* @Last Modified time: 2016-12-13 10:57:04
*/

'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/mlib/image-preview.scss');

import React from 'react';
import { message} from 'antd';
var ini_img = require('images/choose.png');
class imagePreviewComponent extends React.Component{
  constructor(props) {
    super(props);
    }
  state={
    canvas:{},
    dataUrl:''
  }
  componentDidMount() {
    let
      _this = this
      ,img = new Image()
      ,ctx =  _this.refs.image_canvas.getContext('2d')
    ;
      img.src = ini_img;
      img.onload =function(){
        let
          width = _this.props.imageInfo.width
         ,height = _this.props.imageInfo.width
        ctx.fillStyle="#000";
        ctx.fillRect(0,0,width,height);
       if(width > 50){
        ctx.drawImage(img,(width-50)/2,(height-50)/2,50,50);
      }else{
        ctx.drawImage(img,0,0,40,40);
      }
    }
  }
  fileInput = (e)  => {
    let _this = this;
    var file = e.target.files[0];//获取input输入的图片
          if(!/image\/\w+/.test(file.type)){
              message.warning("请确保文件为图像类型");
              return false;
          }
          //判断是否图片，在移动端由于浏览器对调用file类型处理不同，虽然加了accept = 'image/*'，但是还要再次判断
          var reader = new FileReader();
          reader.readAsDataURL(file);//转化成base64数据类型
          reader.onload = function(e){
            let that = this;
            _this.setState({
              dataUrl:that.result
            });
         }
  };
  chooseFile = ()=> {
    this.refs.file_input.click();
  }
  setDataUrl(url){
    this.setState({
      dataUrl :url
    })
  }
  getDataUrl(){
    return this.state.dataUrl;
  }
  render(){
    if(this.state.dataUrl){
      let
        img = new Image()
        ,_this = this
        ,ctx =  _this.refs.image_canvas.getContext('2d')
      ;
        ctx.clearRect(0,0,_this.refs.image_canvas.width,_this.refs.image_canvas.height);
        img.src = this.state.dataUrl;
        img.onload =function(){
          let
              canvas_w = _this.props.imageInfo.width
             ,canvas_h = _this.props.imageInfo.height ? _this.props.imageInfo.height : Math.floor(img.height * canvas_w / img.width)
          ;
          _this.refs.image_canvas.height = canvas_h;
          ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas_w,canvas_h);
      }
    }
    return (
      <div className="image-preview">
        <input type="file" style={{'display':'none'}} ref="file_input" onChange={this.fileInput}/>
        <canvas  ref="image_canvas"  onClick={this.chooseFile} width={this.props.imageInfo.width || 300} height={this.state.canvas.height || 300}></canvas>
      </div>
      )
  }
}
export default imagePreviewComponent;

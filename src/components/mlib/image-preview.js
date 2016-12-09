/*
* @Author: jumorzhu@tecent.com
* @Date:   2016-12-05 19:51:31
* @Last Modified by:   jumorzhu
* @Last Modified time: 2016-12-09 13:17:56
*/

'use strict';
require('normalize.css/normalize.css');
require('styles/App.scss');
require('styles/mlib/image-preview.scss');
import React from 'react';

class imagePreviewComponent extends React.Component{
  constructor(props) {
    super(props);
    this.fileInput = this.fileInput.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
    this.dataUrl = '';
    }
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
            let
              img = new Image()
              ,ctx =  _this.refs.image_canvas.getContext('2d')
            ;
              img.src = this.result;
              _this.setFileDataUrl(this.result);
              img.onload =function(){
                ctx.drawImage(img,0,0,img.width,img.height,0,0,_this.props.imageInfo.width,_this.props.imageInfo.height);
            }
         }
  };
  chooseFile(){
    this.refs.file_input.click();
  }
  setFileDataUrl(url){
    this.dataUrl = url;
  }
  getFileDataUrl(){
    return this.dataUrl;
  }
  render(){
    return (
      <div className="image-preview">
        <span className="desc-btn" onClick={this.chooseFile}>选择图片</span>
        <input type="file" style={{'display':'none'}} ref="file_input" onChange={this.fileInput}/>
        <canvas ref="image_canvas" width={this.props.imageInfo.width || 300} height={this.props.imageInfo.height || 300}></canvas>
      </div>
      )
  }
}
export default imagePreviewComponent;

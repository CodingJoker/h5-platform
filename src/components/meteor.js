/**
* @Author: Jumorzhu
* @Date:   2017-01-06
* @Email:  550928460@qq.com
* @Last modified by:   Jumorzhu
* @Last modified time: 2017-01-14
*/
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

class MeteorComponent extends React.Component{
  constructor(props){
    super(props);
    this.canvas = null;
    this.ctx = null;
    let main_view = document.getElementById('main_view');
    this.container ={
      w:main_view.clientWidth,
      h:main_view.clientHeight
    }
    // this.lt = 0;
    // this.speed = 30;
    this.starsNum = 500;
    this.stars = [];
    this.moon = {
      x:250,
      y:200,
      r:30
    }

    this.point = {
      headPointX:20,
      angel:30,
      speed:2,
      length:30,
      duration:30
    }
    this.getStar(this.starsNum);
  }
  draw = () =>{
    let
      _this = this
      ,ctx = _this.ctx
      ,CONTAINER_WIDTH = _this.container.w
      ,CONTAINER_HEIGHT = _this.container.h
      ,rnd = _this.meteorRnd
    ;

    for(let i = 0 , length = this.stars.length; i < length ; i++){
        let star = this.stars[i];
        if(i == rnd){
          star.vx = -5;
					star.vy =20;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255,255,255,'+star.alpha+')';
          ctx.lineWidth = star.r;
          ctx.moveTo(star.x,star.y);
          ctx.quadraticCurveTo(star.x+star.vx/4,star.y+star.vy/2,star.x+star.vx,star.y+star.vy);
          ctx.stroke();
          ctx.closePath();
        }
        star.alpha += star.ra;
				if(star.alpha<=0){
					star.alpha = 0;
					star.ra = -star.ra;
					star.vx = Math.random()*0.2-0.1;
					star.vy = Math.random()*0.2-0.1;
				}else if(star.alpha>1){
					star.alpha = 1;
					star.ra = -star.ra
				}
        star.x += star.vx;
				if(star.x>=CONTAINER_WIDTH){
					star.x = 0;
				}else if(star.x<0){
					star.x = CONTAINER_WIDTH;
					star.vx = Math.random()*0.2-0.1;
					star.vy = Math.random()*0.2-0.1;
				}
				star.y += star.vy;
				if(star.y>=CONTAINER_HEIGHT){
					star.y = 0;
					star.vy = Math.random()*0.2-0.1;
					star.vx = Math.random()*0.2-0.1;
				}else if(star.y<0){
					star.y = CONTAINER_HEIGHT;
				}
        ctx.beginPath();
				var bg = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
				bg.addColorStop(0,'rgba(255,255,255,'+star.alpha+')');
				bg.addColorStop(1,'rgba(255,255,255,0)');
				ctx.fillStyle  = bg;
				ctx.arc(star.x,star.y, star.r, 0, Math.PI*2, true);
				ctx.fill();
				ctx.closePath();

        //draw meteor

    }
    // this.drawMoon();
  }
  getStar = (num) =>{
    let
        w = this.container.w
        ,h = this.container.h
    ;

    for(var i = 0 ; i < num ; i++){
      var star = {
        x:Math.random()*w,
        y:Math.random()*h,
        vx:Math.random()*0.1,
        vy:Math.random()*0.1,
        alpha:Math.random(),
        r:Math.random() * 2,
        ra:Math.random()*0.05,
        ax:Math.random()*5
      };
      this.stars.push(star);
    }

  }
  drawMoon =  () =>{
    let
        ctx = this.ctx
       ,moonX = this.moon.x
       ,moonY = this.moon.y
       ,moonR = this.moon.r
       ,bg;

    ctx.beginPath();
    bg = ctx.createRadialGradient(moonX, moonY,moonR, moonX, moonY, moonR+10);
    bg.addColorStop(0,'rgba(247,255,185,1)');
    bg.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle  = bg;
    ctx.arc(moonX,moonY,moonR+10, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
    // //画月亮圆
    // ctx.fillStyle = '#fff';
    // ctx.arc(moonX,moonY,moonR, 0, Math.PI*2, true);
    // ctx.fill();
  }
  drawFrame = (time) => {
      //每次循环加蒙层
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
			this.ctx.fillRect(0, 0, this.container.w,this.container.h);
      //渲染当前帧画面
      this.draw();
  }
  componentDidMount(){
    let
      _this = this
    ;
    _this.canvas = _this.refs.canvasContainer;
    _this.ctx = _this.canvas.getContext('2d');
    //设置黑色背景
    _this.ctx.fillStyle = '#000';
    _this.ctx.fillRect(0,0,_this.container.w,_this.container.h);

    //先渲染繁星
    setInterval(_this.drawFrame,33);

    //在渲染流星
    let
        length = this.starsNum
       ,time = Math.round(Math.random()*3000+33)
    ;
			setInterval(function(){
        _this.meteorRnd = Math.ceil(Math.random()*length)
				_this.draw();
        time = Math.round(Math.random()*1000+33)
			},time);
  }
  render(){
    return (
      <canvas ref='canvasContainer' width={this.container.w} height={this.container.h}></canvas>
    )
  }
}




MeteorComponent.defaultProps = {};

export default MeteorComponent;

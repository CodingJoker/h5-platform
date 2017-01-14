/**
* @Author: Jumorzhu
* @Date:   2017-01-06
* @Email:  550928460@qq.com
* @Last modified by:   Jumorzhu
* @Last modified time: 2017-01-06
*/
require('normalize.css/normalize.css');
require('styles/App.scss');

import React from "react";

class HackKingDomComponent extends React.Component{
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    var canvas = this.refs.hackContainer,
		ctx = canvas.getContext('2d'),
		w, h;
		w = canvas.width = window.innerWidth;
		h = canvas.height = window.innerHeight;

		// 初始化
		var wordColor = "#33ff33",
		words = "0123456789qwertyuiopasdfghjklzxcvbnm,./;'\[]QWERTYUIOP{}ASDFGHJHJKL:ZXCVBBNM<>?がガぎギぐグげゲごゴきゃキャきゅキュきょキョりゃリャゅリュりょリョ",
		wordsArr = words.split(''),
		font_size = 16,
		clumns = parseInt(w / font_size, 10) , //浏览器宽除以字符宽得列数
		drops = []; //存储每列的起始位置

		for(var i=0; i<clumns; i++){
			// 随机的起始位置
			drops[i] = Math.floor(Math.random() * h);
		}
    function draw(time){
			ctx.save();

			// 水平翻转画布
			ctx.translate(w, 0);
			ctx.scale(-1, 1);

			// 填充字符
			ctx.fillStyle = wordColor;
			ctx.font = font_size + "px arial";
			for (var i = 0; i < drops.length; i++){
				var text = wordsArr[Math.floor(Math.random() * wordsArr.length)];
				ctx.fillText(text, i * font_size, drops[i] * font_size);
				// 0.95的随机数造成列消失的时间不一致，产生的列也随之改变
				if (drops[i] * font_size > h && Math.random() > 0.95){
					drops[i] = 0;
				}
					drops[i]++;
			}
			ctx.restore();
		}

		//循环
		var clearColor = 'rgba(0, 0, 0, .1)', //每次循环加0.1透明的蒙层
			lt = 0,
			speed = 50; // 字体下落速度
		function drawFrame(time){
			if(time - lt > speed) {
				lt = time;
				ctx.fillStyle = clearColor;
				ctx.fillRect(0, 0, w, h);
				draw();
			}
			window.requestAnimationFrame(drawFrame, canvas);
		}
		window.requestAnimationFrame(drawFrame, canvas);

		//浏览器缩放
		function resize(){
			w = canvas.width = window.innerWidth;
			h = canvas.height = window.innerHeight;
		}
		canvas.addEventListener("resize", resize);
        // 绑定F11全屏事件，由于全屏事件在部分浏览器中不会触发resize，和无法通过F11捕捉到fullscreenchange事件，于是用F11的keyup替代。感谢boyipiao童鞋的反馈~
        document.addEventListener('keyup', function(event) {
			var code = event.keyCode || event.which;
			  if(code == 122){
				resize();
			}
		},false);

  }
  render(){
    return (
      <canvas ref="hackContainer"></canvas>
    )
  }
}
HackKingDomComponent.defaultProps = {};
export default HackKingDomComponent;

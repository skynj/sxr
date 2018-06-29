/**
 * 传入相应参数返回圆形制定半径的弧度坐标
 * @param {*} x 中心点X坐标
 * @param {*} y 中心点y坐标
 * @param {*} R 圆半径
 * @param {*} a 角度
 */
function coordMap(x, y, R, a) {
  var ta = (360 - a) * Math.PI / 180,
    tx, ty;
  tx = R * Math.cos(ta); // 角度邻边
  ty = R * Math.sin(ta); // 角度的对边
  return {
    x: x + tx,
    y: y - ty // 注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。
  }
}

/**
 * 创建弧线
 * @param {*} data.startAngle 开始角度
 * @param {*} data.endAngle 结束角度
 * @param {*} data.R 圆半径
 * @param {*} data.x 中心点X坐标
 * @param {*} data.y 中心点y坐标
 * @param {*} data.color 边框颜色  默认#CCC
 * @param {*} data.strokeWidth 边框宽度 默认1
 * @param {*} data.strokelinecap 不同类型的路径的开始结束点 可选值 butt round square  默认butt
 * @param {*} data.strokeDasharray 虚线设置 它是一个<length>和<percentage>数列，数与数之间用逗号或者
 * 空白隔开，指定短划线和缺口的长度。如果提供了奇数个值，则这个值的数列重复一次，从而变成偶数个值。因此，5,3,2等同于5,3,2,5,3,2。
 * @param {*} data.transform CSS3旋转设置  
 */
function drawSVG(data) {
  var path,
    // 起点坐标
    s = new coordMap(data.x, data.y, data.R, data.startAngle),
    // 结束坐标
    e = new coordMap(data.x, data.y, data.R, data.endAngle),
    // 创建弧线路径
    tpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  // 画一段到(x,y)的椭圆弧. 椭圆弧的 x, y 轴半径分别为 rx,ry. 椭圆相对于 x 轴旋转 x-axis-rotation 度. large-arc=0表明弧线小于180读, large-arc=1表示弧线大于180度. sweep=0表明弧线逆时针旋转, sweep=1表明弧线顺时间旋转.
  // svg : [A | a] (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+ 
  path = 'M' + s.x + ',' + s.y + 'A' + data.R + ',' + data.R + ',0,' + (+(data.endAngle - data.startAngle > 180)) + ',1,' + e.x + ',' + e.y;
  // 设置路径
  tpath.setAttribute('d', path);
  // 去掉填充
  tpath.setAttribute("fill", "none");
  // 设置颜色
  tpath.setAttribute('stroke', data.color || '#CCC');
  // 边线宽度
  tpath.setAttribute('stroke-width', data.strokeWidth || 1);
  data.strokelinecap ? tpath.setAttribute('stroke-linecap', data.strokelinecap) : '';
  data.strokeDasharray ? tpath.setAttribute('stroke-dasharray', data.strokeDasharray) : '';
  data.transform ? tpath.setAttribute('transform', data.transform) : '';
  return tpath;
}

// 渐变线条
// function linearGradient(){
//   var defs= document.createElementNS("http://www.w3.org/2000/svg", "svg"); 
// }

/**
 * 画进度条
 * @param {*} $select  容器
 * @param {*} size 多少步 共100步
 */

function svgView($select, size, colorId, color1, color2) {
  // console.log(1)
  var size = size,
    // 创建SVG
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var width = document.getElementsByClassName($select)[0].offsetWidth;
  svg.setAttribute("version", "1.1"); // IE9+ support SVG 1.1 version
  svg.setAttribute("width", width+"px");
  svg.setAttribute("height", "100%");


  var defs = document.createElementNS("http://www.w3.org/2000/svg","defs"); 
  var linearGradient = document.createElementNS("http://www.w3.org/2000/svg","linearGradient");
  linearGradient.setAttribute("id", colorId); // IE9+ support SVG 1.1 version
  linearGradient.setAttribute("x1", "0%");
  linearGradient.setAttribute("y1", "0%");
  linearGradient.setAttribute("x2", "100%");
  linearGradient.setAttribute("y2", "0%");
  var colorStart = document.createElementNS("http://www.w3.org/2000/svg","stop");
  colorStart.setAttribute("offset", "0%");
  colorStart.setAttribute("stop-color", color1);
  var colorStop = document.createElementNS("http://www.w3.org/2000/svg","stop");
  colorStop.setAttribute("offset", "100%");
  colorStop.setAttribute("stop-color", color2);
  linearGradient.appendChild(colorStart);
  linearGradient.appendChild(colorStop);
  defs.appendChild(linearGradient);
  svg.appendChild(defs);

  var defs2 = document.createElementNS("http://www.w3.org/2000/svg","defs"); 
  var linearGradient2 = document.createElementNS("http://www.w3.org/2000/svg","linearGradient");
  linearGradient2.setAttribute("id", 'grad'); // IE9+ support SVG 1.1 version
  linearGradient2.setAttribute("cx", "50%");
  linearGradient2.setAttribute("cy", "50%");
  linearGradient2.setAttribute("r", "30%");
  linearGradient2.setAttribute("fx", "50%");
  linearGradient2.setAttribute("fy", "50%");
  var colorStart2 = document.createElementNS("http://www.w3.org/2000/svg","stop");
  colorStart2.setAttribute("offset", "0%");
  colorStart2.setAttribute("stop-color", "#01132f");
  var colorStop2 = document.createElementNS("http://www.w3.org/2000/svg","stop");
  colorStop2.setAttribute("offset", "100%");
  colorStop2.setAttribute("stop-color", "#053b71");
  linearGradient2.appendChild(colorStart2);
  linearGradient2.appendChild(colorStop2);
  defs2.appendChild(linearGradient2);
  svg.appendChild(defs2);
  // 画底线并加入SVG中
  svg.appendChild(new drawSVG({
    startAngle: 90,
    endAngle: 270,
    x: width/2,
    y: 95,
    R: 65,
    strokelinecap: 'round',
    color: 'url(#grad)',
    strokeWidth: 12,
    transform: 'rotate(-270, '+width/2+', 95)'
  }));
  // 步长
  var step = (270 - 90) / 100,
    i = 1;
  // 画第一步并加入SVG中
  svg.appendChild(new drawSVG({
    startAngle: 90,
    endAngle: 90 + step * i,
    x: width/2,
    y: 95,
    R: 65,
    strokelinecap: 'round',
    strokeWidth: 8,
    color: '#linear',
    transform: 'rotate(-270,'+width/2+', 95)'
  }));
  // 写入页面
 
  document.querySelector('.'+$select).appendChild(svg);
  // 通过设置时间循环步
  var tc = setInterval(function() {
    // console.log(i, '----', 45 + step * i, '-----', 315);
    // 创建新的弧线 替换进度弧线
    svg.replaceChild(new drawSVG({
      startAngle:90,
      endAngle: 90 + step * i,
      x: width/2,
      y: 95,
      R: 65,
      strokelinecap: 'round',
      strokeWidth: 8,
      color: 'url(#'+colorId+')',
      transform: 'rotate(-270, '+width/2+', 95)'
    }), svg.lastChild);
    i++;
    if (i > size) {
      clearInterval(tc);
    }
  }, 20);
};

// for(var i=0;i<$('.each-progressBar').length;i++){
//   var num=parseFloat($('.pLinear'+(i+1)).text())*100;
//   var color=[
//               {'start':'#ff7e00','end':'#fabe00'},
//               {'start':'#e8352b','end':'#ff7259'},
//               {'start':'#45ff73','end':'#52feb6'},
//               {'start':'#008cff','end':'#00baff'}
//             ]
//   svgView('svgView'+(i+1), num, "linear"+(i+1), color[i].start, color[i].end);
// }

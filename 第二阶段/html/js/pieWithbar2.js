$(function(){
	barWithBroken();
    // console.log(Math.sqrt(6250000) / 5e2);
})
function barWithBroken(){
	// 路径配置
    require.config({
        paths:{
        echarts:'js/build/dist'
        // echarts:'http://echarts.baidu.com/build/dist'
        }
    });
    require(
	    [
	    'echarts',
	    'echarts/chart/map',
	    'echarts/chart/bar',
	    'echarts/chart/line',
        'echarts/chart/pie',
	    ],
	    function(ec){
        	var myChart1 = ec.init(document.getElementById('pie'));
            var myChart2 = ec.init(document.getElementById('bar2'));
            var option_my1 = {
            	    tooltip : {
                        show: false,
                        trigger: 'item',
                        position : function(p) {
                            // 位置回调
                            // console.log && console.log(p);
                            return [p[0] + 45, p[1] - 50];
                        }, 
                        // formatter: "{a} <br/>{b} : {c} ({d}%)"
                        formatter: function (params,ticket,callback) {
                            console.log(params); 
                            console.log(params.name);
                            console.log(params.percent);
                            // var res = '<p>' + params.name +'</p>';
                            var res = '<p style="font-size:15px;color:#ffffff;">' + params.name +'</p>';
                                res += '<p style="font-size:36px;font-family: GOTHICB;" class="pieColor">' + params.percent +'<span style="font-size:16px;">%</span></p>'
                                return res;                        
                        },
                    }, 
                    legend: {
                        data:['已建项目','在建项目'],
                        // x:353,
                        y:'bottom',
                        x:'center',
                        textStyle:{    //图例文字的样式
                            color:'#b1cefc',
                            fontSize:12
                        }
                    },                   
                    series : [
                        {
                            type:'pie',
                            radius : ['60%', '75%'],  //内半径和外半径
                            itemStyle : {
                                normal : {
                                    label : {
                                        show : false
                                    },
                                    labelLine : {
                                        show : false
                                    }
                                },
                                emphasis : {
                                    label : {
                                        show : true,
                                        position : 'center',
                                        formatter: '{b}\n{d}%',
                                        textStyle : {
                                            fontSize : '30',
                                            fontWeight : 'bold'
                                        }
                                    }
                                }
                            },
                            data:[
                                {
                                    value:34.7, 
                                    name:'在建项目',
                                    itemStyle:{
                                        normal:{
                                            color : (function (){
                                                var zrColor = require('zrender/tool/color');
                                                return zrColor.getRadialGradient(
                                                    300, 200, 110, 300, 200, 140,
                                                    [[0, 'rgba(72,190,25,1)'],[1, 'rgba(93,195,116,1)']]
                                                )
                                            })(),
                                        }
                                    }
                                },
                                {
                                    value:65.3, 
                                    name:'已建项目',
                                    itemStyle:{
                                        normal:{
                                            color : (function (){
                                                var zrColor = require('zrender/tool/color');
                                                return zrColor.getRadialGradient(
                                                    300, 200, 50, 300, 200, 740,
                                                    [[0, 'rgba(56,151,252,1)'],[1, 'rgba(9,222,254,1)']]
                                                )
                                            })(),
                                        }
                                    }
                                }
                            ],                                                  
                        }
                    ],
                     color: ['rgb(67,139,251)','rgb(255,130,46)']
        	};
        	var option_my2 = {
                tooltip: {
                    show:true,
                    trigger: 'axis',
                    axisPointer:{
                        type:'none'
                    }
                },
                grid: {
                    borderColor:'#1b3568',
                    borderWidth:0,
                    x:80,
                    y:33, 
                    y2:30, 
                    x2:10
                },
                xAxis : [
                    {
                        type : 'value',
                        // boundaryGap : true, //定义charts两侧是否有留白，true为有，false为顶格开始
                        min:0,
                        max:18,
                        axisTick: {show:false},
                        axisLabel: {
                            textStyle: {
                                color: '#96c7ff',//坐标值得具体的颜色
                                fontSize: 12
                            }
                        },  
                        splitNumber:9,
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#003a87']
                            }                            
                        },                        
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#284e8d',
                                width:0
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        data : ['绿色循环1','绿色循环2','节能环保','集约高效','绿色循环','官塘新城','智慧交通','绿色循环3'],                        
                        axisLabel : {
                            formatter: '{value}'
                        },
                        axisTick: {show:false},
                        // splitNumber:5,
                        axisLabel: {
                            textStyle: {
                                color: '#96c7ff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        }, 
                        splitNumber:0,
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#003a87'],
                                width:0
                            }                            
                        },                     
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#003a87',
                                width:0
                            }
                        }
                    }
                ],
                series : [
                    {
                        type:'bar',
                        barWidth : 20,
                        itemStyle: {
                            normal: {
                                color: (function (){
                                   var zrColor = require('zrender/tool/color');
                                   return zrColor.getLinearGradient(
                                       70, 0, 150, 0,
                                       [[0, '#01eaff'],[1, '#438bfb']]
                                   )
                                })(),   
                                label:{show:false}
                            },
                            emphasis:{
                                // barBorderRadius:[5,5,0,0]
                            }
                        },
                        data:[2, 3.8, 7.8, 3.8, 15, 1.8, 8.3, 7.8]
                    }               
                ]
            };
            
        	
        	myChart1.setOption(option_my1);  
            myChart2.setOption(option_my2);          
            window.onresize = function(){
                myChart1.resize();
                myChart2.resize();
            }   
            var pie = myChart.chart.pie;
            var shape = pie.shapeList[pie.shapeList.length - 1];
            pie.shapeHandler.onmouseover({target:shape});
            pie.zr.addHoverShape(shape );
            pie.zr.refreshHover();       
        }
	);

}
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
        	var myChart1 = ec.init(document.getElementById('bing'));
            var myChart2 = ec.init(document.getElementById('bar'));
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
                    series : [
                        {
                            name:'能量消耗量',
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
                                        // formatter: function (params,ticket,callback) {
                                        //     console.log(params); 
                                        //     console.log(params.name);
                                        //     console.log(params.percent);
                                        //     var res = params.name +'<br/>' + params.percent;
                                        //     var res = '<p style="font-size:15px;color:#ffffff;">' + params.name +'</p>';
                                        //         res += '<p style="font-size:36px;font-family: GOTHICB;" class="pieColor">' + params.percent +'<span style="font-size:16px;">%</span></p>'
                                        //     return res;
                                        // }                                                               },
                                        textStyle : {
                                            fontSize : '30',
                                            fontWeight : 'bold'
                                        }
                                    }
                                }
                            },
                            data:[
                                {value:20, name:'汽油消耗量'},
                                {value:5, name:'柴油消耗量'},
                                {value:30, name:'天然气消耗量'},
                                {value:45, name:'电消耗量'},
                                {value:15, name:'其他'}
                            ],                                                  
                        }
                    ],
                     color: ['rgb(67,139,251)','rgb(43,215,129)','rgb(255,158,15)','rgb(0,238,255)','rgb(141,77,232)']
        	};
        	var option_my2 = {
                tooltip: {
                    // show:false,
                    trigger: 'axis',
                    axisPointer:{
                        type:'none'
                    },
                    backgroundColor: 'rgba(0,18,49,0.8)',
                    borderColor:'#000',
                    borderWidth:1,
                    position : function(p) {
                        // 位置回调
                        // console.log && console.log(p);
                        return [p[0] - 104, p[1] - 150];
                    }, 
                    formatter: function (params,ticket,callback) {
                        console.log(params); 
                        console.log(params[0][1]);
                        console.log(params[0][0]);
                        var res =  '<div style="border:1px solid #254065;margin:-4px;position:relative;"><img src="img/bar-tringle.png" style="position:absolute;bottom:-8px;left:50%;margin-left:-7px;"><p style="font-size:15px;color:#ffffff;padding:10px 14px;border-bottom:1px solid #000;">' + params[0][1] +'</p>';
                            res += '<div style="border-top:1px solid #254065;padding:14px 14px 13px 14px;"><p style="color:#89b7ed;font-size:12px;"><span style="letter-spacing:4px;">' + params[0][0] +'</span>：<span style="color:#438bfb;font-size:18px;font-family:GOTHICB;padding-left:4px;display:inline-block;width:38px;">' + params[0][2] + '</span><span>万吨标煤</span>';
                            res += '<p style="color:#89b7ed;font-size:12px;">' + params[1][0] +'：<span style="color:#32de96;font-size:18px;font-family:GOTHICB;padding-left:4px;display:inline-block;width:38px;">' + params[1][2] + '</span><span>万吨CO<sub>2</sub>e</span></div></div>';
                          return res;                        
                    },
                },
                grid: {
                    borderColor:'#1b3568',
                    borderWidth:1,
                    x:60,
                    y:33, 
                    y2:30, 
                    x2:100
                },
                xAxis : [
                    {
                        type : 'category',
                        // boundaryGap : true, //定义charts两侧是否有留白，true为有，false为顶格开始
                        data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        axisTick: {show:false},
                        axisLabel: {
                            textStyle: {
                                color: '#96c7ff',//坐标值得具体的颜色
                                fontSize: 11
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#284e8d']
                            }                            
                        },
                        splitArea: {
                            show : false,
                            areaStyle:{
                                color:['#061636','#091c40']
                            }
                        },
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#284e8d',
                                width:1
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'能耗量',
                        nameTextStyle:{
                             color: ['#96c7ff'],
                             fontSize:12
                        },
                        min:0,
                        max:250,
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitNumber:5,
                        axisLabel: {
                            textStyle: {
                                color: '#96c7ff',//坐标值得具体的颜色
                                fontSize:12
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#284e8d'
                            }                            
                        },
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#284e8d',
                                width:1
                            }
                        }
                    },
                    {
                        type : 'value',
                        name:'碳排放量',
                        nameTextStyle:{
                             color: ['#96c7ff'],
                             fontSize:12
                        },
                        min:0,
                        max:250,
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitNumber:5,
                        axisLabel: {
                            textStyle: {
                                color: '#96c7ff',//坐标值得具体的颜色
                                fontSize:12
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#284e8d'
                            }                            
                        },
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#284e8d',
                                width:1
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'能耗量',
                        type:'bar',
                        barWidth : 20,
                        itemStyle: {
                            normal: {
                                color: (function (){
                                   var zrColor = require('zrender/tool/color');
                                   return zrColor.getLinearGradient(
                                       0, 150, 0, 350,
                                       [[0, '#01eaff'],[1, '#438bfb']]
                                   )
                                })(),   
                                label:{show:false},
                                barBorderRadius:[5,5,0,0]
                            },
                            emphasis:{
                                barBorderRadius:[5,5,0,0]
                            }
                        },
                        data:[45, 45, 75, 35, 120, 175, 200, 155, 110, 90, 45, 55, 45]
                    },
                    {
                        name:'碳排放量',
                        type:'line',
                        smooth: true,
                        yAxisIndex:1,
                        symbol: 'emptyCircle',
                        itemStyle: {
                            normal: {
                                color:'rgba(65,208,67,1)',
                                lineStyle:{
                                    width: 2
                                },
                                label:{show:false},
                                areaStyle: {
                                    // 区域图，纵向渐变填充
                                    color : (function (){
                                        var zrColor = require('zrender/tool/color');
                                        return zrColor.getLinearGradient(
                                            0, 100, 0, 400,
                                            [[0, 'rgba(27,191,67,0.4)'],[0.8, 'rgba(255,255,255,0)']]        //rgba(59,229,118,0.1)
                                        )
                                    })()
                                }
                            }
                        },
                        data:[20, 40, 49.5, 50, 75, 60, 110, 160, 130, 105, 90, 103]
                    },                              
                ]
            };
            
        	
        	myChart1.setOption(option_my1);  
            myChart2.setOption(option_my2);          
            window.onresize = function(){
                myChart1.resize();
                myChart2.resize();
            }          
        }
	);

}
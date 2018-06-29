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
        'echarts/chart/scatter'
	    ],
	    function(ec){
        	var myChart1 = ec.init(document.getElementsByClassName('cloud-charts1')[0]);
            var myChart2 = ec.init(document.getElementsByClassName('cloud-bingR')[0]);
            var myChart3 = ec.init(document.getElementById('cloud-bar1'));
            var myChart4 = ec.init(document.getElementsByClassName('carInfor-lineCharts')[0]);

            var myChart5 = ec.init(document.getElementsByClassName('bar2')[0]);
            var myChart6 = ec.init(document.getElementsByClassName('bubble')[0]);
            // var myChart2 = ec.init(document.getElementById('bar'));

            var option_my1={
                tooltip: {
                    // show:false,<div style="border:1px solid #000">
                    trigger: 'axis',
                    axisPointer:{
                        type:'none'
                    },
                    position : function(p) {
                        // 位置回调
                        // console.log && console.log(p);
                        return [p[0] - 62, p[1] - 75];
                    }, 
                    padding:0,
                    backgroundColor:'rgba(9,74,135,0.7)',
                    formatter: function (params,ticket,callback) {
                        // console.log(params);
                        console.log(params[1][2]); 
                        console.log(params[0][2]);
                        var res = '<div style="border-left:1px solid #134072;border-right:1px solid #134072;border-radius:5px;position:relative;"><img src="img/fan1.png" style="position:absolute;bottom:-12px;left:50%;margin-left:-5.5px;" /><div style="border:1px solid #1a5f9c;border-radius:5px;"><div style="color:#ffffff;font-size:15px;font-family:GOTHICB;border:1px solid #063c6d;padding:11px 9px;">' + params[1][2] +' , ' + params[0][2] + '</div></div></div>'
                        return res;                        
                    }
                },
                legend: {
                    data:['综合能耗（吨标煤）','温室气体排放量（吨CO2e）'],
                    x:'center',
                    y:'15',
                    // padding: 5,
                    textStyle:{    //图例文字的样式
                        color:'#009cff',
                        fontSize:14
                    }
                },
                grid: {
                    borderColor:'#1b3568',
                    borderWidth:0,
                    x:85,
                    y:50, 
                    y2:50, 
                    x2:85
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false, //定义charts两侧是否有留白，true为有，false为顶格开始
                        data :  ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                        axisTick: {show:false},
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        },
                        splitLine: {
                            show: false,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#014787']
                            }                            
                        },
                        splitArea: {
                            show : false,
                            areaStyle:{
                                color:['rgba(0,22,58,0.6','rgba(0,0,0,0)']
                                 // color:['red','#001c47']
                            }
                        },
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#284676',
                                width:0
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        min:500,
                        max:3000,
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitNumber:5,
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#014787']
                            }                             
                        },
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#375a92',
                                width:0
                            }
                        }
                    },
                    {
                       type : 'value',
                        min:2000,
                        max:7000,
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitNumber:5,
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#014787']
                            }                             
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        }, 
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#375a92',
                                width:0
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'温室气体排放量（吨CO2e）',
                        symbol:'emptyCircle',
                        symbolSize: 3,
                        yAxisIndex:1,
                        type:'line',
                        itemStyle: {
                            normal: {
                                color:'rgba(0,255,234,1)', 
                                label:{show:false}
                            }
                        },
                        data:[5100, 5200, 5250, 5300, 5280, 5290, 5600, 5500, 5800, 6000, 5900, 5800]
                    },
                    {
                        name:'综合能耗（吨标煤）',
                        symbol:'emptyCircle',
                        symbolSize: 0,
                        yAxisIndex:0,
                        type:'line',
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color:'rgba(0,156,255,1)', 
                                label:{show:false},
                                lineStyle:{
                                    width:3,
                                    shadowColor: 'rgba(1,46,95,1)',
                                    shadowBlur:3,
                                    shadowOffsetX:3,
                                    shadowOffsetY:3
                                },
                                areaStyle: {
                                    // 区域图，纵向渐变填充
                                    color : (function (){
                                        var zrColor = require('zrender/tool/color');
                                        return zrColor.getLinearGradient(
                                            0, 50, 0, 700,
                                            [[0, 'rgba(1,92,163,0.8)'],[0.5,'rgba(9,79,141,0.5)'],[1, 'rgba(255,255,255,0.3)']]        //rgba(59,229,118,0.1)
                                        )
                                    })()
                                }
                            }
                        },
                        data:[1500, 1450, 1700, 1650, 1550, 1600, 1530, 1580, 1600, 1900, 1550, 1900]
                    }
                ]            //渐变未设置好 formatter未设置               
            };

            var option_my2 = {
        	    tooltip : {
                    show: false,
                    trigger: 'item'
                }, 
                legend:{
                    show: true,
                    data: ['城市出租','公路客运','公路货运','公路建设','城市公交','水路货运','港口生产','公路运营养护'],
                    orient: 'vertical',
                    x: 'right',
                    y: '25',
                    textStyle:{    //图例文字的样式
                        color:'#009cff',
                        fontSize:14
                    }
                },         
                series : [
                    {
                        name:'能量消耗量',
                        type:'pie',
                        radius : ['30%', '93%'],  //内半径和外半径
                        
                        center: ['23%', '53%'],//饼图的位置  
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
                                    show : false,
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
                            {value:25, name:'城市出租'},
                            {value:10, name:'公路客运'},
                            {value:8, name:'公路货运'},
                            {value:5, name:'公路建设'},
                            {value:10, name:'城市公交'},
                            {value:8, name:'水路货运'},
                            {value:5, name:'港口生产'},
                            {value:3, name:'公路运营养护'}
                        ],                                                  
                    }
                ],
                 color: ['rgb(0,95,251)','rgb(0,138,255)','rgb(0,139,184)','rgb(0,166,176)','rgb(0,255,126)','rgb(53,203,0)','rgb(0,255,234)']
        	};

        	var option_my3 = {
                tooltip: {
                    show:false,
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
                legend: {
                    data:['综合能耗（吨标煤）','温室气体排放量（吨CO2e）'],
                    x:'center',
                    y:'15',
                    // padding: 5,
                    textStyle:{    //图例文字的样式
                        color:'#009cff',
                        fontSize:14
                    }
                },
                grid: {
                    borderColor:'#1b3568',
                    borderWidth:0,
                    x:60,
                    y:55, 
                    y2:100, 
                    x2:80
                },
                dataZoom : {
                    show : true,
                    realtime: true,
                    start : 5,
                    end : 30,
                    height:13,
                    y:250,
                    backgroundColor: 'rgba(14,42,89,1)',
                    dataBackgroundColor: '#19458c',
                    fillerColor: 'rgba(33,79,153,0.2)'
                },
                xAxis : [
                    {
                        type : 'category',
                        // boundaryGap : true, //定义charts两侧是否有留白，true为有，false为顶格开始
                        data : ['镇江江天汽运','镇江中燃有限公司','公交总公司第一分公司','镇江市南江汽车销售公司','镇江润华船务有限公司','镇江港务集团','镇江江天汽运','镇江中燃有限公司','公交总公司第一分公司','镇江市南江汽车销售公司','镇江润华船务有限公司','镇江港务集团','镇江江天汽运','镇江中燃有限公司','公交总公司第一分公司','镇江市南江汽车销售公司','镇江润华船务有限公司','镇江港务集团'],
                        axisTick: {show:false},
                        
                        // margin: 15,
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize: 14
                            },
                            interval: 0,
                            formatter:function(val){  
                                var strs = val.split(''); //字符串数组  
                                var str = ''  
                                // console.log(strs)
                                for (var i = 0, s; s = strs[i++];) { //遍历字符串数组  
                                    str += s;  
                                    if (!(i % 4)){
                                        str += '\n';
                                        // console.log(str)
                                    }else if(i>7){
                                        // console.log(str)
                                        str = str.substr(0,9)+"...";
                                    }                                    
                                }  
                                return str;  
                            }  
                        },
                        splitNumber:6,
                        splitLine: {
                            show: false,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#032959'
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
                        type : 'value',
                        min:0,
                        max:60,
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitNumber:2,
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#032959'
                            }                            
                        },
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#284e8d',
                                width:0
                            }
                        }
                    },
                    {
                        type : 'value',
                        min:0,
                        max:1000,
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitNumber:2,
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#032959'
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
                series : [
                    {
                        name:'综合能耗（吨标煤）',
                        type:'bar',
                        barCategoryGap:'57%',
                        // barGap:'10',
                        barWidth : 14,
                        yAxisIndex:1,
                        itemStyle: {
                            normal: {
                                color:'rgba(67,139,251,1)',
                                label:{show:false}
                            }
                        },
                        data:[400, 800, 350, 550, 250, 300, 800, 800, 350, 550, 250, 300, 900, 800, 350, 550, 250, 300]
                    }, 
                    {
                        name:'温室气体排放量（吨CO2e）',
                        type:'bar',
                        barCategoryGap:'57%',
                        // barGap:'10',
                        barWidth : 14,
                        yAxisIndex:0,
                        itemStyle: {
                            normal: {
                                color:'#00ffea' ,   
                                label:{show:false}
                                // barBorderRadius:[5,5,0,0]
                            },
                            emphasis:{
                                // barBorderRadius:[5,5,0,0]
                            }
                        },
                        data:[35, 25, 33, 28, 30, 40, 38, 20, 15, 58, 50, 30, 20, 27, 38, 28, 30, 40]
                    }                                                
                ]
            };

            var option_my4={
                tooltip: {
                    // show:false,<div style="border:1px solid #000">
                    trigger: 'axis',
                    axisPointer:{
                        type:'none'
                    }
                },
                legend: {
                    data:['实时能耗（g/s）','均值'],
                    x:'center',
                    y:'15',
                    // padding: 5,
                    data:[
                        {
                            name:'实时能耗（g/s）',
                            textStyle:{
                                color:'#00ffea',
                                fontSize:14
                            }
                        },
                        {
                            name:'均值',
                            textStyle:{
                                color:'#ff7e00',
                                fontSize:14
                            }
                        }
                    ],
                },
                grid: {
                    borderColor:'#0c333e',
                    borderWidth:1,
                    x:30,
                    y:40, 
                    y2:25, 
                    x2:23
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true, //定义charts两侧是否有留白，true为有，false为顶格开始
                        data :  ['01:15:20','01:30:20','01:45:10','02:00:21','01:15:17'],
                        axisTick: {show:false},
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            },
                            interval: 0
                        },
                        splitLine: {
                            show: false,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#014787']
                            }                            
                        },
                        splitArea: {
                            show : false,
                            areaStyle:{
                                color:['rgba(0,22,58,0.6','rgba(0,0,0,0)']
                                 // color:['red','#001c47']
                            }
                        },
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#284676',
                                width:0
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        min:0,
                        max:12,
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitNumber:2,
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        },
                        splitLine: {
                            show: false,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#014787']
                            }                             
                        },
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#375a92',
                                width:0
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'实时能耗（g/s）',
                        symbol:'rectangle',
                        showAllSymbol: true,
                        type:'line',
                        itemStyle: {
                            normal: {
                                color:'rgba(0,255,234,1)', 
                                lineStyle:{
                                    width:2,
                                    shadowColor: 'rgba(1,78,84,1)',
                                    shadowBlur:200,
                                    shadowOffsetX:10,
                                    shadowOffsetY:10
                                },
                                areaStyle: {
                                    // 区域图，纵向渐变填充
                                    color : (function (){
                                        var zrColor = require('zrender/tool/color');
                                        return zrColor.getLinearGradient(
                                            0, 250, 0, 5000,
                                            [[0, 'rgba(2,104,113,0.5)'],[0.5,'rgba(2,82,98,0.5)'],[1, 'rgba(3,54,77,0)']]        //rgba(59,229,118,0.1)
                                        )
                                    })()
                                },
                            }
                        },                        
                        data:[5, 8, 6, 6, 4]
                    },
                    {
                        name:'均值',
                        symbol:'none',
                        showAllSymbol: false,
                        type:'line',
                        itemStyle: {
                            normal: {
                                color:'#ff7e00', 
                                // label:{show:false}
                            }
                        },
                        data:[5, 8, 6, 6, 4],
                        markLine : {
                            data : [{type : 'average', name: '均值'}],
                            itemStyle:{
                                normal:{
                                    color:'#ff7e00',
                                    lineStyle:{
                                        color:'#ff7e00',
                                        type:'dashed',
                                        width:1
                                    }                                  
                                }                              
                            }
                        },
                    }
                ]            //渐变未设置好 formatter未设置               
            };

            var option_my5 = {
                tooltip: {
                    show:false,
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
                title: {
                    text:'综合能耗（万吨标煤）',
                    x:'center',
                    y:'20',
                    // padding: 5,
                    textStyle:{    //图例文字的样式
                        color:'#00aeff',
                        fontSize:14
                    }
                },
                grid: {
                    borderColor:'#1b3568',
                    borderWidth:0,
                    x:65,
                    y:55, 
                    y2:135, 
                    x2:36
                },
                dataZoom : {
                    show : true,
                    realtime: true,
                    start : 5,
                    end : 30,
                    width: 440,
                    height:13,
                    y:250,
                    backgroundColor: 'rgba(14,42,89,1)',
                    dataBackgroundColor: '#19458c',
                    fillerColor: 'rgba(33,79,153,0.2)'
                },
                xAxis : [
                    {
                        type : 'category',
                        // boundaryGap : true, //定义charts两侧是否有留白，true为有，false为顶格开始
                        data : ['内河水运扩容工程','LNG营运客车应用..。。。','惠龙港网上现货交...','生态通道建设项目','LED绿色照明技术...','“智慧”公路建设项..','内河水运扩容工程','LNG营运客车应用..。。。','惠龙港网上现货交...','生态通道建设项目','LED绿色照明技术...','“智慧”公路建设项..','内河水运扩容工程','LNG营运客车应用..。。。','惠龙港网上现货交...','生态通道建设项目','LED绿色照明技术...','“智慧”公路建设项..'],
                        axisTick: {show:false},
                        
                        // margin: 15,
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize: 14
                            },
                            interval: 0,
                            formatter:function(val){  
                                var strs = val.split(''); //字符串数组  
                                var str = ''  
                                // console.log(strs)
                                for (var i = 0, s; s = strs[i++];) { //遍历字符串数组  
                                    str += s;  
                                    if (!(i % 4)){
                                        str += '\n';
                                        // console.log(str)
                                    }else if(i>7){
                                        // console.log(str)
                                        str = str.substr(0,9)+"...";
                                    }                                    
                                }  
                                return str;  
                            }  
                        },
                        splitNumber:6,
                        splitLine: {
                            show: false,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#032959'
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
                        type : 'value',
                        min:0,
                        max:100,
                        axisLabel : {
                            formatter: '{value}'
                        },
                        splitNumber:2,
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#032959'
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
                series : [
                    {
                        name:'综合能耗（万吨标煤）',
                        type:'bar',
                        barCategoryGap:'57%',
                        // barGap:'10',
                        barWidth : 16,
                        itemStyle: {
                            normal: {
                                color: (function (){
                                   var zrColor = require('zrender/tool/color');
                                   return zrColor.getLinearGradient(
                                       150, 0, 350, 0,
                                       [[0, 'rgba(0,69,249,1)'],[0.5, 'rgba(0,113,242,1)'],[1, 'rgba(0,252,225,1)']]
                                   )
                                })(),
                                // barBorderWidth: 2,
                                // barBorderColor:'#0070f3',  
                                label:{show:false},
                                barBorderRadius:5,
                            }
                        },
                        data:[90, 75, 65, 45, 30, 20, 80, 70, 60, 40, 50, 30, 60, 75, 65, 45, 30, 20]
                    }                                       
                ]
            };
            
        	var option_my6={
                tooltip : {
                    show: true,
                    trigger: 'axis',
                    backgroundColor : 'rgba(1,16,45,0.5)',
                    borderColor : '#235693',
                    borderRadius : 5,
                    borderWidth: 1,
                    padding: [13,16],
                    position : function(p) {
                        // 位置回调
                        // console.log && console.log(p);
                        return [p[0] + 5, p[1] - 15];
                    },    
                    textStyle : {
                        color: '#232730',
                        decoration: 'none',
                        fontSize: 15
                    },
                    axisPointer:{
                        show: false,
                        type : 'shadow',
                        lineStyle: {
                            type : 'dashed',
                            width : 1
                        }
                    },
                    formatter: function (params,ticket,callback) {
                        console.log(params); 
                        console.log(params[0]);
                        console.log(params[2][0]); 
                        console.log(params[2][1]);
                        var total =  Math.round(params[2][0]/(params[2][1]/100));
                        console.log(total); 
                        var res = '<div style="position:relative;"><img src="img/fan2.png" style="position:absolute;top:20px;left:-28px;" /><h3 style="color:#ffffff;font-size:18px;">' + params[0] + '</h3><p style="color:#009cff;font-size:14px;">能耗总量<span style="color:#00ffea;font-size:16px;padding:0 6px 0 13px;">' + total + '</span>吨标煤</p><p style="color:#009cff;font-size:14px;">碳排总量<span style="color:#00ffea;font-size:16px;padding:0 6px 0 13px;">' + params[2][0] + '</span>吨CO2e</p><p style="color:#009cff;font-size:14px;">碳排放强度<span style="color:#00ffea;font-size:16px;padding:0 6px 0 13px;">' + params[2][1]/100 + '</span>吨CO2e/吨标煤</p></div>';
                        return res;                        
                    }
                },
                legend: {
                    show: true,
                    data: ['城市出租','公路货运','城市公交','港口生产','公路客运','公路建设','水路货运','公路运营养护'],
                    x:'center',
                    y: 'bottom',
                    textStyle:{    //图例文字的样式
                        color:'#009cff',
                        fontSize:14
                    }
                },
                grid: {
                    borderColor:'#001634',
                    borderWidth:1,
                    x:65,
                    y:15, 
                    y2:95, 
                    x2:50
                },
                xAxis : [
                    {
                        type : 'value',                       
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#192f53',
                                type: 'solid'
                            }                            
                        },
                        min: 10000,
                        max: 110000,
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#014382',
                                width:1
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#032351',
                                type: 'solid'
                            }                            
                        },
                        splitNumber: 5
                    }
                ],
                yAxis : [
                    {
                        type : 'value',                        
                        axisLabel: {
                            textStyle: {
                                color: '#009cff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#033366',
                                type: 'dashed'
                            }                            
                        },
                        min:0,
                        max:100,
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#023872',
                                width:1
                            }
                        },
                        splitNumber: 4 //分隔栏数
                    }
                ],
                series : [
                    {
                        name:'公路运营养护',
                        type:'scatter',
                        symbol:'circle',
                        data:[[18000,80,100000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {                       
                                color: 'rgba(56, 52, 140, 0.8)',                                  
                                borderColor:'#815af7',
                                borderWidth:1
                            }                           
                        }
                    },
                    {
                        name:'城市出租',
                        type:'scatter',
                        symbol:'circle',
                        data:[[30000,40,100000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {                                
                                color: 'rgba(98, 90, 54, 0.8)',                                  
                                borderColor:'#eebc26',
                                borderWidth:1
                            }                           
                        }                  
                    },
                    {
                        name:'公路货运',
                        type:'scatter',
                        symbol:'circle',
                        data:[[79000,25,149000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {                                
                                color: 'rgba(108, 51, 80, 0.8)',                                  
                                borderColor:'#ff505d',
                                borderWidth:1
                            }                           
                        }                                            
                    },
                    {
                        name:'城市公交',
                        type:'scatter',
                        symbol:'circle',
                        data:[[48500,75,150000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {                                
                                color: 'rgba(32, 140, 110, 0.8)',                                  
                                borderColor:'#34dd8e',
                                borderWidth:1
                            }                           
                        }                       
                    },
                    {
                        name:'港口生产',
                        type:'scatter',
                        symbol:'circle',
                        data:[[41000,25,230000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(2, 70, 140, 0.8)',                                  
                                borderColor:'#007ce8',
                                borderWidth:1
                            }                           
                        }                        
                    },
                    {
                        name:'公路客运',
                        type:'scatter',
                        symbol:'circle',
                        data:[[89500,75,180000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(94, 41, 108, 0.8)',                                  
                                borderColor:'#d640a7',
                                borderWidth:1
                            }                           
                        }                       
                    },
                    {
                        name:'公路建设',
                        type:'scatter',
                        symbol:'circle',
                        data:[[70000,50,300000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(104, 66, 76, 0.8)',                                  
                                borderColor:'#d06d59',
                                borderWidth:1
                            }                           
                        }                        
                    },
                    {
                        name:'水路货运',
                        type:'scatter',
                        symbol:'circle',
                        data:[[30000,75,180000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(2, 99, 144, 0.8)',                                  
                                borderColor:'#00a6cc',
                                borderWidth:1
                            }                           
                        }                       
                    }
                ]                   //tooltip未更改，legend调改不知道怎么改
            };


        	myChart1.setOption(option_my1);
            myChart2.setOption(option_my2); 
            myChart3.setOption(option_my3);
            myChart4.setOption(option_my4);
            myChart5.setOption(option_my5);   
            myChart6.setOption(option_my6); 

            window.onresize = function(){
                myChart1.resize();
                myChart2.resize();
                myChart3.resize();
                myChart4.resize();
                myChart5.resize();
                myChart6.resize();
            }          
        }
	);

}
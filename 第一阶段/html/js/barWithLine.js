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
	    'echarts/chart/line'
	    ],
	    function(ec){
        	var myChart1 = ec.init(document.getElementById('bar-with-broken1'));
            var myChart2 = ec.init(document.getElementById('bar-with-broken2'));
            var myChart3 = ec.init(document.getElementById('map'));
            var option_my1={
            	tooltip: {
            		// show:false,
                    trigger: 'axis',
                    axisPointer:{
                        type:'none'
                    }
                },
                legend: {
                    data:['实际值','目标值'],
                    x:'right',
                    y:10,
                    textStyle:{    //图例文字的样式
    			        color:'#5581ba',
    			        fontSize:12
    			    }
                },
                backgroundColor:'#0c1f45',
                grid: {
                	borderColor:'#1b3568',
                	borderWidth:1,
                	x:40,
                	y:33, 
                	y2:30, 
                	x2:20
                },
                xAxis : [
    		        {
    		            type : 'category',
    		            // boundaryGap : true, //定义charts两侧是否有留白，true为有，false为顶格开始
    		            data : ['2016','2017','2018','2019','2020'],
    		            axisTick: {show:false},
    		            axisLabel: {
    	                    textStyle: {
    	                        color: '#507bb2',//坐标值得具体的颜色
    	 						fontSize:12
    	                    }
    	                },
    	                splitLine: {
                            show: false,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#162f5e']
                            }                            
                    	},
                    	splitArea: {
                    		show : true,
                    		areaStyle:{
                    			color:['#061636','#091c40']
                    		}
                    	},
                    	axisLine: {    //改变轴颜色
    						lineStyle: {
    							color: '#1b3569',
                                width:1
    						}
    					}
    			    },
    		        {
                        type : 'category',
                        boundaryGap : true,
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {show:false},
                        splitArea: {show:false},
                        splitLine: {show:false},
                        data : ['2016','2017','2018','2019','2020'],
                      
                    }
    		    ],
    		    yAxis : [
    		        {
    		            type : 'value',
    		            name:'单位：%',
    		            nameTextStyle:{
    		            	 color: ['#5581ba'],
    		            	 fontSize:12
    		            },
    		            min:0,
    		            max:100,
    		            axisLabel : {
    		                formatter: '{value}'
    		            },
    		            splitNumber:4,
    		            axisLabel: {
    	                    textStyle: {
    	                        color: '#507bb2',//坐标值得具体的颜色
    	 						fontSize:12
    	                    }
    	                },
    	                splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#172f5e',
                                type: 'dashed'
                            }                            
                    	},
                    	axisLine: {    //改变轴颜色
    						lineStyle: {
    							color: '#1b3569',
                                width:1
    						}
    					}
    		        }
    		    ],
    		    series : [
    		        {
    		            name:'实际值',
    		            type:'bar',
    		            barWidth : 20,
    		            itemStyle: {
                            normal: {
                                color: (function (){
                                   var zrColor = require('zrender/tool/color');
                                   return zrColor.getLinearGradient(
                                       0, 100, 0, 180,
                                       [[0, '#418efb'],[1, '#01eaff']]
                                   )
                                })(),   
                                label:{show:false},
                                barBorderRadius:[5,5,0,0]
                            },
                            emphasis:{
                                barBorderRadius:[5,5,0,0]
                            }
                        },
    		            data:[15, 20, 40, 35, 50]
    		        },
    		        {
    		            name:'目标值',
    		            type:'line',
    		            itemStyle: {
                            normal: {
                                color:'rgba(0,255,197,1)', 
                                label:{show:false}
                            }
                        },
    		            data:[45, 55, 75, 60, 75]
    		        },
    		        {
    		            name:'目标值',
    		            type:'bar',
    		            barWidth : 20,
    		            xAxisIndex:1,
    		            itemStyle: {
                            normal: {
                                color:'rgba(5,64,110,1)',
                                label:{show:false,formatter:function(p){return p.value > 0 ? (p.value +'\n'):'';}}
                            }
                        },
                        // emphasis:{
                        //     barBorderRadius:[5,5,0,0]
                        // },
    		        	data:[45, 55, 75, 60, 75]
    		        }
    		        
    		    ]
        	};
        	var option_my2={
            	tooltip: {
            		// show:false,
                    trigger: 'axis',
                    axisPointer:{
                        type:'none'
                    }
                },

                legend: {
                    data:['实际值','目标值'],
                    // x:353,
                    y:10,
                    x:'right',
                    textStyle:{    //图例文字的样式
    			        color:'#5581ba',
    			        fontSize:12
    			    }
                },
                backgroundColor:'#0c1f45',
                grid: {
                	borderColor:'#1b3568',
                	borderWidth:1,
                	x:40,
                	y:33, 
                	y2:30, 
                	x2:20
                },
                xAxis : [
    		        {
    		            type : 'category',
    		            // boundaryGap : true, //定义charts两侧是否有留白，true为有，false为顶格开始
    		            data : ['2016','2017','2018','2019','2020'],
    		            axisTick: {show:false},
    		            axisLabel: {
    	                    textStyle: {
    	                        color: '#507bb2',//坐标值得具体的颜色
    	 						fontSize:12
    	                    }
    	                },
    	                splitLine: {
                            show: false,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#162f5e']
                            }                            
                    	},
                    	splitArea: {
                    		show : true,
                    		areaStyle:{
                    			color:['#061636','#091c40']
                    		}
                    	},
                    	axisLine: {    //改变轴颜色
    						lineStyle: {
    							color: '#1b3569',
                                width:1
    						}
    					}
    			    },
    		        {
                        type : 'category',
                        boundaryGap : true,
                        axisLine: {show:false},
                        axisTick: {show:false},
                        axisLabel: {show:false},
                        splitArea: {show:false},
                        splitLine: {show:false},
                        data : ['2016','2017','2018','2019','2020'],
                      
                    }
    		    ],
    		    yAxis : [
    		        {
    		            type : 'value',
    		            name:'单位：%',
    		            nameTextStyle:{
    		            	 color: ['#5581ba'],
    		            	 fontSize:12
    		            },
    		            min:0,
    		            max:100,
    		            axisLabel : {
    		                formatter: '{value}'
    		            },
    		            splitNumber:4,
    		            axisLabel: {
    	                    textStyle: {
    	                        color: '#507bb2',//坐标值得具体的颜色
    	 						fontSize:12
    	                    }
    	                },
    	                splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#172f5e',
                                type: 'dashed'
                            }                            
                    	},
                    	axisLine: {    //改变轴颜色
    						lineStyle: {
    							color: '#1b3569',
                                width:1
    						}
    					}
    		        }
    		    ],
    		    series : [
    		        {
    		            name:'实际值',
    		            type:'bar',
    		            barWidth : 20,
    		            itemStyle: {
                            normal: {
                                color: (function (){
                                   var zrColor = require('zrender/tool/color');
                                   return zrColor.getLinearGradient(
                                        0, 100, 0, 180,
                                       [[0, '#418efb'],[1, '#01eaff']]
                                   )
                                })(),   
                                label:{show:false},
                                barBorderRadius:[5,5,0,0]
                            },
                            emphasis:{
                                barBorderRadius:[5,5,0,0]
                            }
                        },
    		            data:[15, 20, 40, 35, 50]
    		        },
    		        {
    		            name:'目标值',
    		            type:'line',
    		            itemStyle: {normal: {color:'rgba(0,255,197,1)', label:{show:false}}},
    		            data:[45, 55, 75, 60, 75]
    		        },
    		        {
    		            name:'目标值',
    		            type:'bar',
    		            barWidth : 20,
    		            xAxisIndex:1,
    		            itemStyle: {normal: {color:'rgba(5,64,110,1)',label:{show:false,formatter:function(p){return p.value > 0 ? (p.value +'\n'):'';}}}},
    		        	data:[45, 55, 75, 60, 75]
    		        }
    		        
    		    ]
        	};
            var option_my3={
                tooltip : {
                    trigger: 'item',
                    formatter: '{c}'+'分'
                },
                dataRange: {
                    orient: 'horizontal',
                    min: 0,
                    max: 100,
                    // y:'top',
                    text:['100','0'],           // 文本，默认为数值文本
                    textStyle:{
                        fontSize:12,
                        color:'#72bbff'
                    },
                    splitNumber:0,
                    color: ['#013495','#bf9957']
                },
                roamController:{
                    show:true,
                    x:'right',
                    y:'bottom',
                    // backgroundColor:'#102662',
                    // borderColor:'#010308',
                    fillerColor:'#7eb8ff',
                    handleColor:'#102662',
                    mapTypeControl: {  
                        //指定地图类型  
                        '江苏': true  
                    }  
                },
                series : [
                    {
                        name: '中国',
                        type: 'map',
                        mapType: '江苏',
                        selectedMode : 'multiple',
                        itemStyle:{
                            normal:{
                                color:'#ffffff',
                                label:{show:true}
                            },
                            emphasis:{
                                label:{show:true}
                            }
                        },
                        data:[
                            {name: '连云港市',value: 79},
                            {name: '徐州市',value: 92},
                            {name: '宿迁市',value: 87},
                            {name: '淮安市',value: 78},
                            {name: '盐城市',value: 84},
                            {name: '扬州市',value: 80},
                            {name: '镇江市',value: 82},
                            {name: '南京市',value: 81},
                            {name: '常州市',value: 83},
                            {name: '无锡市',value: 88},
                            {name: '苏州市',value: 84},
                            {name: '泰州市',value: 87},
                            {name: '南通市',value: 80}
                        ]
                    }
                ]
            };
        	
        	myChart1.setOption(option_my1);
        	myChart2.setOption(option_my2); 
            myChart3.setOption(option_my3);           
            window.onresize = function(){
                myChart1.resize();
                myChart2.resize();
                myChart3.resize()
            }          
        }
	);

}
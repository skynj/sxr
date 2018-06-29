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
        	var myChart1 = ec.init(document.getElementById('line'));
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
                        return [p[0] - 85, p[1] - 150];
                    }, 
                    formatter: function (params,ticket,callback) {
                        console.log(params[0][2]); 
                        console.log(params[0].name);
                        var res =  '<div style="border:1px solid #19202a;padding:20px 15px;margin:-4px;background:rgba(0,0,0,1);position:relative;"><img src="img/tooltip-tringle.png" style="position:absolute;bottom:-9px;left:50%;margin-left:-7px;"><p style="font-size:12px;color:#b1cefc;"><img src="img/dot1.png"><span style="font-size:18px;color:#438bfb;font-family: GOTHICB;padding:0 0px 0 10px;display:inline-block;width:43px;">'+params[0][2]+'</span>万吨CO<sub>2</sub>e</p>';
                            res += '<p style="font-size:12px;color:#b1cefc;"><img src="img/dot2.png"><span style="font-size:18px;color:#438bfb;font-family: GOTHICB;padding:0 0px 0 10px;display:inline-block;width:43px;">'+params[1][2]+'</span>万吨CO<sub>2</sub>e</p>';
                            res += '<p style="font-size:12px;color:#b1cefc;"><img src="img/dot3.png"><span style="font-size:18px;color:#438bfb;font-family: GOTHICB;padding:0 0px 0 10px;display:inline-block;width:43px;">'+params[2][2]+'</span>万吨CO<sub>2</sub>e</p>';
                            res += '<p style="font-size:12px;color:#b1cefc;"><img src="img/dot4.png"><span style="font-size:18px;color:#438bfb;font-family: GOTHICB;padding:0 0px 0 10px;display:inline-block;width:43px;">'+params[3][2]+'</span>万吨CO<sub>2</sub>e</p></div>';
                            return res;                        
                    },
                },
                grid: {
                	borderColor:'#1b3568',
                	borderWidth:1,
                	x:65,
                	y:30, 
                	y2:30, 
                	x2:60
                },
                xAxis : [
    		        {
    		            type : 'category',
    		            // boundaryGap : true, //定义charts两侧是否有留白，true为有，false为顶格开始
    		            data : ['2015年','2016年','2017年','2018年','2019年','2020年','2021年','2022年','2023年','2024年','2025年','2026年','2027年','2028年','2029年','2030年'],
    		            axisTick: {show:false},
    		            axisLabel: {
    	                    textStyle: {
    	                        color: '#71bcff',//坐标值得具体的颜色
    	 						fontSize:12
    	                    }
    	                },
    	                splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#375a92']
                            }                            
                    	},
                    	splitArea: {
                    		show : true,
                    		areaStyle:{
                    			color:['rgba(0,22,58,0.6','rgba(0,0,0,0)']
                                 // color:['red','#001c47']
                    		}
                    	},
                    	axisLine: {    //改变轴颜色
    						lineStyle: {
    							color: '#284676',
                                width:1
    						}
    					}
    			    }
    		    ],
    		    yAxis : [
    		        {
    		            type : 'value',
    		            name:'碳排放量：万吨CO2e',
                        // posotion: 'right',
    		            nameTextStyle:{
    		            	 color: ['#b1cefc'],
    		            	 fontSize:12
    		            },
    		            min:60,
    		            max:110,
    		            axisLabel : {
    		                formatter: '{value}'
    		            },
    		            splitNumber:5,
    		            axisLabel: {
    	                    textStyle: {
    	                        color: '#71bcff',//坐标值得具体的颜色
    	 						fontSize:10
    	                    }
    	                },
    	                splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#143d7e',
                                type: 'dashed'
                            }                            
                    	},
                    	axisLine: {    //改变轴颜色
    						lineStyle: {
    							color: '#375a92',
                                width:1
    						}
    					}
    		        }
    		    ],
    		    series : [
    		        {
    		            name:'基准情景',
                        symbol:'emptyCircle',
                        symbolSize: 3,
    		            type:'line',
    		            itemStyle: {
                            normal: {
                                color:'rgba(1,132,254,1)', 
                                label:{show:false}
                            }
                        },
    		            data:[65, 70, 73, 78, 81, 84, 88, 89, 91, 93, 96, 98, 100, 101, 102, 104]
    		        },
    		        {
                        name:'低碳情景',
                        symbol:'emptyCircle',
                        symbolSize: 3,
                        type:'line',
                        itemStyle: {
                            normal: {
                                color:'rgba(43,215,129,1)', 
                                label:{show:false}
                            }
                        },
                        data:[65, 68, 70.5, 72, 73, 78, 79.5, 81, 82, 85, 87, 88, 89.5, 90, 90.5, 90.5]
                    },
                    {
                        name:'深蓝情景',
                        symbol:'emptyCircle',
                        symbolSize: 3,
                        type:'line',
                        itemStyle: {
                            normal: {
                                color:'rgba(255,102,0,1)', 
                                label:{show:false}
                            }
                        },
                        data:[65, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 77, 76, 75, 74]
                    },
                    {
                        name:'强化低碳情景',
                        symbol:'emptyCircle',
                        symbolSize: 3,
                        type:'line',
                        itemStyle: {
                            normal: {
                                color:'rgba(255,15,151,1)', 
                                label:{show:false}
                            }
                        },
                        data:[65, 66, 67, 68, 69, 69.5, 69.9, 70, 70.5, 71, 72, 72.5, 72.5, 72, 71, 70.5]
                    }
    		        
    		    ]
        	};
        	
            
        	
        	myChart1.setOption(option_my1);           
            window.onresize = function(){
                myChart1.resize();
            }          
        }
	);

}
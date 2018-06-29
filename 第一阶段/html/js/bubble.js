$(function(){
    $(".bubble-one").on("click",function(){ 
       bubble();  
    });
    $(".bubble-two").on("click",function(){ 
       bubble();  
    });
})
function bubble(){
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
	    'echarts/chart/scatter'
	    ],
	    function(ec){
    		var myChart4 = ec.init(document.getElementById('bubble'));

        	var option_my4={
                tooltip : {
                    trigger: 'axis',
                    backgroundColor : 'rgba(255,255,255,1)',
                    borderColor : '#001430',
                    borderRadius : 5,
                    borderWidth: 1,
                    padding: [15,20],
                    position : function(p) {
                        // 位置回调
                        // console.log && console.log(p);
                        return [p[0] + 10, p[1] - 35];
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
                        console.log(params[1]); 
                        console.log(params[2][0]); 
                        var res = '<img src="img/tooltip.png" alt="tooltip" style="position:absolute;top:50%;margin-top:-8px;left:-9px;"><p><img src="img/blue.png" alt="blue" style="margin-right:8px;">指标完成情况</p>'  +'<p style="padding-left:15px;font-size:24px;color:#2581ff;">' + params[2][0] + '<span style="padding-left:5px;font-size:12px;color:#6d727a;">%</span></p>';
                        res += '<p><img src="img/red.png" alt="red" style="margin-right:8px;">考核评分</p>'  +'<p style="padding-left:15px;font-size:24px;color:#ff535a;">' + params[2][1] + '<span style="padding-left:5px;font-size:12px;color:#6d727a;">分</span></p>';
                        return res;                        
                    }
                },
                backgroundColor:'#001634',  //#001634
                legend: {
                    show:false,
                    data:['苏州市','扬州市','常州市','盐城市','连云港市','泰州市','镇江市','无锡市','淮安市','南京市','宿迁市','南通市','徐州市']
                },
                toolbox: {
                    show : false,
                    feature : {
                        mark : {show: true},
                        dataZoom : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                grid: {
                    borderColor:'#001634',
                    borderWidth:1,
                    x:55,
                    y:50, 
                    y2:50, 
                    x2:85
                },
                xAxis : [
                    {
                        type : 'value',
                        name:'考核评分：分',
    		            nameTextStyle:{
    		            	 color: ['#bd5559'],
    		            	 fontSize:13
    		            },
                        axisLabel: {
                            textStyle: {
                                color: '#507bb2',//坐标值得具体的颜色
                                fontSize:12
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#192f53',
                                type: 'solid'
                            }                            
                        },
                        min:60,
    		            max:100,
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#3d3131',
                                width:1
                            }
                        },
                        splitNumber: 4
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name:'指标完成情况：%',
    		            nameTextStyle:{
    		            	 color: ['#2e73d8'],
    		            	 fontSize:13
    		            },
                        axisLabel: {
                            textStyle: {
                                color: '#507bb2',//坐标值得具体的颜色
                                fontSize:12
                            }
                        },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#192f53',
                                type: 'solid'
                            }                            
                        },
                        min:0,
    		            max:100,
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#0d3266',
                                width:1
                            }
                        },
                        splitNumber: 5 //分隔栏数
                    }
                ],
                series : [
                    {
                        name:'苏州市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[64,55.5,550000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {                       
                                color: 'rgba(0, 77, 124, 0.8)',                                  
                                borderColor:'#00aaf2',
                                borderWidth:1
                            }                           
                        }
                    },
                    {
                        name:'扬州市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[84,58,400000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {                                
                                color: 'rgba(95, 45, 68, 0.8)',                                  
                                borderColor:'#cd4858',
                                borderWidth:1
                            }                           
                        }                  
                    },
                    {
                        name:'常州市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[75,58,462250000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {                                
                                color: 'rgba(32, 145, 107, 0.8)',                                  
                                borderColor:'#2dc482',
                                borderWidth:1
                            }                           
                        }                                            
                    },
                    {
                        name:'盐城市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[83,77,625000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {                                
                                color: 'rgba(88, 44, 108, 0.8)',                                  
                                borderColor:'#d740a7',
                                borderWidth:1
                            }                           
                        }                       
                    },
                    {
                        name:'连云港市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[69.3,57,156250000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(98, 79, 58, 0.8)',                                  
                                borderColor:'#aa8139',
                                borderWidth:1
                            }                           
                        }                        
                    },
                    {
                        name:'泰州市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[63.5,45,385000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(54, 51, 135, 0.8)',                                  
                                borderColor:'#7754e8',
                                borderWidth:1
                            }                           
                        }                       
                    },
                    {
                        name:'镇江市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[71,82,1260250000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(108, 65, 71, 0.8)',                                  
                                borderColor:'#f27a5d',
                                borderWidth:1
                            }                           
                        }                        
                    },
                    {
                        name:'无锡市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[67.5,29,156250000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(105, 30, 51, 0.8)',                                  
                                borderColor:'#e33737',
                                borderWidth:1
                            }                           
                        }                       
                    },
                    {
                        name:'淮安市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[72,27,500000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(88, 37, 136, 0.8)',                                  
                                borderColor:'#8d2cb5',
                                borderWidth:1
                            }                           
                        }                      
                    },
                    {
                        name:'南京市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[81,32,100000000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(45, 107, 65, 0.8)',                                  
                                borderColor:'#5cbf3c',
                                borderWidth:1
                            }                           
                        }                        
                    },
                    {
                        name:'宿迁市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[63,15,306250000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(38, 118, 138, 0.8)',                                  
                                borderColor:'#3acbcb',
                                borderWidth:1
                            }                           
                        }                           
                    },
                    {
                        name:'南通市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[93,84,462250000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {
                                color: 'rgba(0, 61, 133, 0.8)',                                  
                                borderColor:'#006cea',
                                borderWidth:1
                            }                           
                        }                           
                    },
                    {
                        name:'徐州市',
                        type:'scatter',
                        symbol:'circle',
                        data:[[91,58,756250000]],
                        symbolSize: function (data) {
                            return Math.sqrt(data[2]) / 5e2;
                        },
                        itemStyle:{
                            normal: {                                
                                color: 'rgba(71, 94, 118, 0.8)',                                  
                                borderColor:'#8ba3b5',
                                borderWidth:1
                            }                           
                        }                           
                    }

                ]
            };
        	myChart4.setOption(option_my4);
            window.onresize = function(){
                myChart4.resize();
            }
        }
	);

}
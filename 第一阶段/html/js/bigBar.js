$(function(){
    $(".bar-one").on("click",function(){ 
        bigBar();  
    }); 
    $(".bar-two").on("click",function(){ 
        bigBar();  
    }); 
})
function bigBar(){
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
        'echarts/chart/bar'
        ],
        function(ec){            
            var myChart5 = ec.init(document.getElementById('bar'));

            var option_my5={
                tooltip: {
                    // show:false,
                    trigger: 'axis',
                    backgroundColor : 'rgba(255,255,255,1)',
                    borderColor : '#001430',
                    borderRadius : 5,
                    borderWidth: 1,
                    padding: [10,20],  
                    position : function(p) {
                        // 位置回调
                        // console.log && console.log(p);
                        return [p[0] - 55, p[1] + 25];
                    }, 
                    textStyle : {
                        color: '#232730',
                        decoration: 'none',
                        fontSize: 15
                    },
                    formatter: function (params,ticket,callback) {
                        console.log(params[0][0]); 
                        console.log(params[0].name);
                        var res= '<p style="font-size:15px;color:#232730;font-weight:bold;">'+params[0][1]+'</p>';
                        res += '<img src="img/tooltip-up.png" alt="tooltip-up" style="position:absolute;left:50%;margin-left:-8px;top:-9px;">'+'<p style="font-size:28px;color:#2581ff;text-align:center;">'+params[0][2]+'</p>'  +'<p style="font-size:12px;color:#6d727a;text-align:center;">'+params[0][0]+'</p>';
                        return res;                        
                    },
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle:{
                            // color:['rgba(32,138,255,0.3)','rgba(61,158,197,0.3)','rgba(152,158,187,0.3)','rgba(145,122,183,0.3)','rgba(176,74,255,0.3)','rgba(37,157,237,0.3)','rgba(121,159,237,0.3)','rgba(163,99,166,0.3)','rgba(155,94,242,0.3)','rgba(95,105,255,0.3)','rgba(172,74,134,0.3)','rgba(101,197,128,0.3)','rgba(22,121,255,0.3)'];
                            // color:function(params){
                            //         var colorList = ['rgba(32,138,255,0.3)','rgba(61,158,197,0.3)','rgba(152,158,187,0.3)','rgba(145,122,183,0.3)','rgba(176,74,255,0.3)','rgba(37,157,237,0.3)','rgba(121,159,237,0.3)','rgba(163,99,166,0.3)','rgba(155,94,242,0.3)','rgba(95,105,255,0.3)','rgba(172,74,134,0.3)','rgba(101,197,128,0.3)','rgba(22,121,255,0.3)'];
                            //         return colorList[params.dataIndex];
                            //     }
                            color:'rgba(32,138,255,0.3)',
                        }
                    }
                },
                legend: {
                    show: false,
                    data:['考核评分'],
                },
                backgroundColor:'#001634',
                grid: {
                    borderColor:'#192f53',
                    borderWidth:1,
                    x:50,
                    y:30, 
                    y2:50, 
                    x2:40
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true, //定义charts两侧是否有留白，true为有，false为顶格开始
                        data : ['南京市','苏州市','常州市','无锡市','镇江市','扬州市','泰州市','南通市','盐城市','宿迁市','徐州市','连云港市','淮安市'],
                        axisTick: {show:false},
                        axisLabel: {
                            textStyle: {
                                color: '#72bbff',//坐标值得具体的颜色
                                fontSize:14
                            }
                        },
                        splitLine: {
                            show: false,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: ['#162f5e']
                            }                            
                        },                       
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#0c2b5d',
                                width:1
                            }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',                      
                        min:0,
                        max:100,                        
                        splitNumber:5,
                        axisLabel: {
                            textStyle: {
                                color: '#507bb2',//坐标值得具体的颜色
                                fontSize:12
                            }
                        },
                        // axisLabel : {
                        //     formatter: '{value}'
                        // },
                        splitLine: {
                            show: true,  //  改变轴线颜色
                            lineStyle: {  // 使用深浅的间隔色
                                color: '#192f53',
                                type: 'solid'
                            }                            
                        },
                        splitArea: {
                            show : true,
                            areaStyle:{
                                color:['#00193e','#00193e']
                            }
                        },
                        axisLine: {    //改变轴颜色
                            lineStyle: {
                                color: '#0c2b58',
                                width:1
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'考核评分',
                        type:'bar',
                        barWidth : 10,
                        itemStyle: {normal: {color:'rgba(45,170,252,1)', label:{show:false}}},
                        data:[81, 84, 83, 88, 82,80,87,80,84,87,92,79,78],
                        markLine : {
                            data : [{type : 'average', name: '平均值'}],
                            itemStyle:{
                                normal:{
                                    color:'#00f3eb',
                                    lineStyle:{
                                        color:'#027995',
                                        type:'solid',
                                        width:1
                                    }                                  
                                }                              
                            }
                        },
                        itemStyle:{
                            normal:{
                                color:function(params){
                                    var colorList = ['rgb(32,138,255)','rgb(61,158,197)','rgb(152,158,187)','rgb(145,122,183)','rgb(176,74,255)','rgb(37,157,237)','rgb(121,159,237)','rgb(163,99,166)','rgb(155,94,242)','rgb(95,105,255)','rgb(172,74,134)','rgb(101,197,128)','rgb(22,121,255)'];
                                    return colorList[params.dataIndex];
            //                         return new echarts.graphic.LinearGradient(0, 0, 0, 1,
            // 　　　　　　　　　　　　　[
            // 　　　　　　　　　　　　　　{offset: 0, color: colorList[params.dataIndex][0]},
            // 　　　　　　　　　　　　　　{offset: 0.5, color: colorList[params.dataIndex][1]},
            // 　　　　　　　　　　　　　　{offset: 1, color: colorList[params.dataIndex][2]}
            // 　　　　　　　　　　　　　]);

                                },
                                // color: (function (){
                                //    var zrColor = require('zrender/tool/color');
                                //    return zrColor.getLinearGradient(
                                //        200, 0, 800, 0,
                                //        [[0, 'rgb(32,138,255)'],[1, 'rgb(101,197,128)']]
                                //    )
                                // })(),
                                barBorderRadius:[15,15,0,0]
                            },
                            emphasis:{
                                barBorderRadius:[15,15,0,0]
                            }
                        },
                    }
                ]
            };

            myChart5.setOption(option_my5);
            window.onresize = function(){
                myChart5.resize();
            }   
        }
    );

}
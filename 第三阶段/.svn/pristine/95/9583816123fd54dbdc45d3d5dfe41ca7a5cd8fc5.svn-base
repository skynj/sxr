$(function(){
    line();
})
function line(){
    var myChart1 = echarts.init(document.getElementById('line'));
    // 指定图表的配置项和数据
    var option1 = {
        tooltip: {},
        legend: {
            data:['深圳','天津','上海','重庆','北京','湖北','广州','福建'],
            left: 'center',
            // bottom: 39,
            bottom: 39,
            textStyle: {
                color: '#d9edff',
                fontSize: 24,
                padding: [0,60,0,0]
            },
            // borderColor: '#1b2f41',
            // borderWidth: 1,
            // padding:[5, 0, 15, 0]
        },
        grid: {
            x:40,
            y:30, 
            y2:160, 
            x2:40
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: false,
            data: ["2016.10","2016.11","2016.12","2017.01","2017.02","2017.03","2017.04"],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#223546',
                    width:1
                }
            },
            splitLine: {
                show: true,  //  改变轴线颜色
                lineStyle: {  // 使用深浅的间隔色
                    color: ['#223546']
                }                             
            },
            axisLabel: {
                color: '#99a2b4',
                fontSize: 18
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show:false,
                inside: false
            },
            min: 0,
            max: 100,
            splitNumber: 5,
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#223546',
                    width:1
                }
            },
            splitLine: {
                show: true,  //  改变轴线颜色
                lineStyle: {  // 使用深浅的间隔色
                    color: ['#223546']
                }                             
            },
            axisLabel: {
                color: '#99a2b4',
                fontSize: 18
            }
        }, 
        series: [                      
            {
                name: '北京',
                type: 'line',
                symbol: 'none',
                itemStyle: {
                    color: 'rgba(255, 109, 96, 1)'
                },
                lineStyle: {
                    color: 'rgba(255, 109, 96, 1)',
                    width: 3,
                    shadowColor: 'rgba(8, 22, 43, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                stack: 'a',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(185, 49, 37, 0.8)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(185, 49, 37, 0)'
                        }])
                    }
                },
                data: [15, 18, 15, 16, 15, 19, 17]
            },
            {
                name: '重庆',
                type: 'line',
                symbol: 'none',
                itemStyle: {
                    color: 'rgba(72, 194, 83, 1)'
                },
                lineStyle: {
                    color: 'rgba(72, 194, 83, 1)',
                    width: 3,
                    shadowColor: 'rgba(8, 22, 43, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                stack: 'a',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(17, 138, 28, 0.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(17, 138, 28, 0)'
                        }])
                    }
                },
                data: [4, 2, 3, 6, 5, 9, 8]  //[19, 20, 18, 21, 20, 28, 25]
            },
            {
                name: '广州',
                type: 'line',
                symbol: 'none',
                itemStyle: {
                    color: 'rgba(255, 0, 255, 1)'
                },
                lineStyle: {
                    color: 'rgba(255, 0, 255, 1)',
                    width: 3,
                    shadowColor: 'rgba(8, 22, 43, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                stack: 'a',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(115, 0, 115, 0.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(115, 0, 115, 0)'
                        }])
                    }
                },
                data: [6, 15, 7, 12, 15, 19, 10]  //[25, 35, 25, 33, 36, 39, 35]
            },
            {
                name: '上海',
                type: 'line',
                symbol: 'none',
                itemStyle: {
                    color: 'rgba(255, 158, 0, 1)'
                },
                lineStyle: {
                    color: 'rgba(255, 158, 0, 1)',
                    width: 3,
                    shadowColor: 'rgba(8, 22, 43, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                stack: 'a',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 74, 0, 0.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(137, 74, 0, 0)'
                        }])
                    }
                },
                data: [10, 2, 10, 5, 3, 6, 8]  //[35, 37, 35, 37, 39, 45, 43]
            },
            {
                name: '天津',
                type: 'line',
                symbol: 'none',
                itemStyle: {
                    color: 'rgba(183, 116, 245, 1)'
                },
                lineStyle: {
                    color: 'rgba(183, 116, 245, 1)',
                    width: 3,
                    shadowColor: 'rgba(8, 22, 43, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                stack: 'a',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(120, 94, 159, 0.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(120, 94, 159, 0)'
                        }])
                    }
                },
                data: [8, 8, 6, 10, 12, 12, 11]  //[43, 45, 41, 47, 51, 57, 54]
            },
            {
                name: '福建',
                type: 'line',
                symbol: 'none',
                itemStyle: {
                    color: 'rgba(255, 255, 0, 1)'
                },
                lineStyle: {
                    color: 'rgba(255, 255, 0, 1)',
                    width: 3,
                    shadowColor: 'rgba(8, 22, 43, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                stack: 'a',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(223, 242, 65, 0.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(223, 242, 65, 0)'
                        }])
                    }
                },
                data: [15, 14, 9, 11, 9, 8, 13]  //[58, 59, 50, 58, 60, 65, 67]
            },            
            {
                name: '湖北',
                type: 'line',
                symbol: 'none',
                itemStyle: {
                    color: 'rgba(19, 225, 137, 1)'
                },
                lineStyle: {
                    color: 'rgba(19, 225, 137, 1)',
                    width: 3,
                    shadowColor: 'rgba(8, 22, 43, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                stack: 'a',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(9, 95, 128, 0.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(10, 93, 129, 0)'
                        }])
                    }
                },
                data: [3, 6, 10, 7, 20, 18, 18]  //[61, 65, 60, 65, 80, 83, 85]
            },
            {
                name: '深圳',
                type: 'line',
                symbol: 'none',
                itemStyle: {
                    color: 'rgba(93, 188, 239, 1)'
                },
                lineStyle: {
                    color: 'rgba(93, 188, 239, 1)',
                    width: 3,
                    shadowColor: 'rgba(8, 22, 43, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                stack: 'a',
                smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(17, 77, 138, 0.8)'
                        }, {
                            offset: 1,
                            color: 'rgba(17, 77, 138, 0)'
                        }])
                    }
                },
                data: [2, 10, 5, 3, 13, 5, 5]  //[63, 75, 65, 68, 93, 88, 90]

            },
            
            
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);      
    window.onresize = function(){
        myChart1.resize();
    } 

}
function bar(){
    var myChart2 = echarts.init(document.getElementById('bar'));
    // 指定图表的配置项和数据
    var option2 = {
        tooltip: {},
        legend: {
            data:['成交量（万吨）','成交额（万元）'],
            left: 'center',
            // bottom: 39,
            bottom: 39,
            textStyle: {
                color: '#d9edff',
                fontSize: 24,
                padding: [0,60,0,0]
            },
            // borderColor: '#1b2f41',
            // borderWidth: 1,
            // padding:[5, 0, 15, 0]
        },
        grid: {
            x:40,
            y:30, 
            y2:160, 
            x2:55
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: true,
            data: ["深圳","北京","天津","湖北","上海","广州","重庆","福建"],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#223546',
                    width:1
                }
            },
            splitLine: {
                show: true,  //  改变轴线颜色
                lineStyle: {  // 使用深浅的间隔色
                    color: ['#223546']
                }                             
            },
            axisLabel: {
                color: '#99a2b4',
                fontSize: 24
            }
        },
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show:false,
                    inside: false
                },
                min: 0,
                max: 80,
                splitNumber: 4,
                interval: 20,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#223546',
                        width:1
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#223546']
                    }                             
                },
                axisLabel: {
                    color: '#99a2b4',
                    fontSize: 18
                }
            },
            {
                type: 'value',
                axisTick: {
                    show:false,
                    inside: false
                },
                min: 0,
                max: 1000,
                splitNumber: 4,
                interval: 250,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#223546',
                        width:1
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#223546']
                    }                             
                },
                axisLabel: {
                    color: '#99a2b4',
                    fontSize: 18
                }
            },  
        ],
        series: [                      
            {
                name: '成交量（万吨）',
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                    color: 'rgba(76, 172, 255, 1)',
                    barBorderRadius: [3, 3, 0, 0]
                },
                data: [55, 43, 58, 65, 58, 38, 28, 18]
            },
            {
                name: '成交额（万元）',
                type: 'bar',
                barWidth: 8,
                yAxisIndex:1,
                itemStyle: {
                    color: 'rgba(72, 194, 83, 1)',
                    barBorderRadius: [3, 3, 0, 0]
                },
                data: [550, 430, 580, 650, 580, 380, 480, 180] 
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);        
    window.onresize = function(){
        myChart2.resize();
    } 

}
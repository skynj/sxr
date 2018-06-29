// $(function(){
//     line5()
// })

function line(){
    var myChart1 = echarts.init(document.getElementsByClassName('overviewLine2')[0]);
    // 指定图表的配置项和数据
    var option1 = {
        grid: {
            show:false,
            x:40,
            y:20, 
            y2:20, 
            x2:20
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: true,
            data: ["2010","2011","2012","2013","2014","2015","2016"],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#2f497e',
                    width:1
                }
            },
            splitArea: {
                show: true,  //  改变轴线颜色
                areaStyle: {  // 使用深浅的间隔色
                    color: ['rgba(1,5,17,0.15)','rgba(1,5,17,0)']
                }                             
            },
            axisLabel: {
                color: '#96c7ff',
                interval:0,
                fontSize: 10
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
                max: 500,
                interval:250,
                splitNumber: 2,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#283a6a',
                        width:1
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#283a69'],
                        type: 'dashed'
                    }                             
                },
                axisLabel: {
                    color: '#96c7ff',
                    fontSize: 10
                }
            }, 
            {
                type: 'value',
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#283a6a',
                        width:1
                    }
                }
            }
        ],
        series: [                      
            {
                name: '利税总额',
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(48, 198, 236, 1)'
                },
                lineStyle: {
                    color: 'rgba(48, 198, 236, 1)',
                    width: 3
                    // shadowColor: 'rgba(8, 22, 43, 1)',
                    // shadowBlur: 5,
                    // shadowOffsetY: 5
                },
                // stack: 'a',
                // smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(48, 198, 236, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(48, 198, 236, 0.1)'
                        }])
                    }
                },
                data: [245, 255, 250, 290, 250,100, 50]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1); 
    window.addEventListener("resize",function(){
        myChart1.resize();
    });
}
function line1(){
    var myChart1 = echarts.init(document.getElementsByClassName('line')[0]);
    // 指定图表的配置项和数据
    var option1 = {
        grid: {
            show:false,
            x:40,
            y:20, 
            y2:30, 
            x2:20
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: true,
            data: ["2014","2015","2016","2017"],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#26407d',
                    width:1
                }
            },
            splitArea: {
                show: false,  //  改变轴线颜色
                areaStyle: {  // 使用深浅的间隔色
                    color: ['rgba(1,5,17,0)','rgba(1,5,17,0.15)']
                }                             
            },
            axisLabel: {
                color: '#96c7ff',
                fontSize: 13
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
                max: 6,
                // interval:250,
                splitNumber: 2,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#283a6a',
                        width:0
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#26407d']
                    }                             
                },
                axisLabel: {
                    color: '#96c7ff',
                    fontSize: 13
                }
            }
        ],
        series: [                      
            {
                name: '月煤炭消耗量',
                type: 'line',
                symbol: 'none',
                // smooth:0.3,
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(48, 198, 236, 1)'
                },
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#2fe0e6' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#604cb3' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 3,
                    shadowColor: 'rgba(20, 38, 70, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                // stack: 'a',
                // smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            // color: 'rgba(254, 229, 116, 0.5)'
                            color: 'rgba(80, 206, 233, 0.5)'
                        }, {
                            offset: 1,
                            // color: 'rgba(138, 118, 31, 0.1)'
                            color: 'rgba(32, 96, 127, 0.1)'
                        }])
                    }
                },
                data: [1, 2, 3.5, 5.5]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);      
    window.addEventListener("resize",function(){
        myChart1.resize();
    });

}
function line2(){
    var myChart1 = echarts.init(document.getElementsByClassName('line')[1]);
    // 指定图表的配置项和数据
    var option1 = {
        grid: {
            show:false,
            x:40,
            y:20, 
            y2:30, 
            x2:20
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: true,
            data: ["第一季度","第二季度","第三季度","第四季度"],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#26407d',
                    width:1
                }
            },
            splitArea: {
                show: false,  //  改变轴线颜色
                areaStyle: {  // 使用深浅的间隔色
                    color: ['rgba(1,5,17,0)','rgba(1,5,17,0.15)']
                }                             
            },
            axisLabel: {
                color: '#96c7ff',
                fontSize: 13
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
                max: 6,
                // interval:250,
                splitNumber: 2,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#283a6a',
                        width:0
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#26407d']
                    }                             
                },
                axisLabel: {
                    color: '#96c7ff',
                    fontSize: 13
                }
            }
        ],
        series: [                      
            {
                name: '月电力消耗量',
                type: 'line',
                symbol: 'none',
                // smooth:0.3,
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(48, 198, 236, 1)'
                },
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#ffdf4c' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#d4a608' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 3,
                    shadowColor: 'rgba(20, 38, 70, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                // stack: 'a',
                // smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(254, 229, 116, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(138, 118, 31, 0.1)'
                        }])
                    }
                },
                data: [1, 2, 3.5, 5.5]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);      
    window.addEventListener("resize",function(){
        myChart1.resize();
    }); 

}
function line3(){
    var myChart1 = echarts.init(document.getElementsByClassName('line')[2]);
    // 指定图表的配置项和数据
    var option1 = {
        grid: {
            show:false,
            x:40,
            y:20, 
            y2:30, 
            x2:20
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: true,
            data: ["7月","8月","9月","10月","11月","12月"],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#26407d',
                    width:1
                }
            },
            splitArea: {
                show: false,  //  改变轴线颜色
                areaStyle: {  // 使用深浅的间隔色
                    color: ['rgba(1,5,17,0)','rgba(1,5,17,0.15)']
                }                             
            },
            axisLabel: {
                color: '#96c7ff',
                fontSize: 13
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
                max: 6,
                // interval:250,
                splitNumber: 2,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#283a6a',
                        width:0
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#26407d']
                    }                             
                },
                axisLabel: {
                    color: '#96c7ff',
                    fontSize: 13
                }
            }
        ],
        series: [                      
            {
                name: '月蒸汽消耗量',
                type: 'line',
                symbol: 'none',
                // smooth:0.3,
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(48, 198, 236, 1)'
                },
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#22f6a4' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#31cc08' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 3,
                    shadowColor: 'rgba(20, 38, 70, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                // stack: 'a',
                // smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            // color: 'rgba(254, 229, 116, 0.5)'
                            color: 'rgba(252, 223, 98, 0.3)'
                        }, {
                            offset: 1,
                            // color: 'rgba(138, 118, 31, 0.1)'
                            color: 'rgba(136, 114, 23, 0.1)'
                        }])
                    }
                },
                data: [1, 2, 2.5, 3.5, 4.5, 5.5]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);      
    window.addEventListener("resize",function(){
        myChart1.resize();
    });

}
function line4(){
    var myChart1 = echarts.init(document.getElementsByClassName('line')[3]);
    // 指定图表的配置项和数据
    var option1 = {
        grid: {
            show:false,
            x:40,
            y:20, 
            y2:30, 
            x2:20
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: true,
            data: ["7月","8月","9月","10月","11月","12月"],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#26407d',
                    width:1
                }
            },
            splitArea: {
                show: false,  //  改变轴线颜色
                areaStyle: {  // 使用深浅的间隔色
                    color: ['rgba(1,5,17,0)','rgba(1,5,17,0.15)']
                }                             
            },
            axisLabel: {
                color: '#96c7ff',
                fontSize: 13
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
                max: 6,
                // interval:250,
                splitNumber: 2,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#283a6a',
                        width:0
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#26407d']
                    }                             
                },
                axisLabel: {
                    color: '#96c7ff',
                    fontSize: 13
                }
            }
        ],
        series: [                      
            {
                name: '月蒸汽消耗量',
                type: 'line',
                symbol: 'none',
                // smooth:0.3,
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(48, 198, 236, 1)'
                },
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#17c2d2' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#00b4c1' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                    width: 3,
                    shadowColor: 'rgba(20, 38, 70, 1)',
                    shadowBlur: 5,
                    shadowOffsetY: 5
                },
                // stack: 'a',
                // smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            // color: 'rgba(254, 229, 116, 0.5)'
                            color: 'rgba(0, 216, 228, 0.3)'
                        }, {
                            offset: 1,
                            // color: 'rgba(138, 118, 31, 0.1)'
                            color: 'rgba(0, 252, 225, 0.1)'
                        }])
                    }
                },
                data: [1, 2, 2.5, 3.5, 4.5, 5.5]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);      
    window.addEventListener("resize",function(){
        myChart1.resize();
    });

}

function line5(){

    var myChart1 = echarts.init(document.getElementsByClassName('overviewLine3')[0]);
    // var myChart1 = echarts.init(document.getElementById('try'));
    // 指定图表的配置项和数据
    var option1 = {
        grid: {
            show:false,
            x:40,
            y:20, 
            y2:20, 
            x2:20
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: true,
            data: ["2010","2011","2012","2013","2014","2015","2016"],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#2f497e',
                    width:1
                }
            },
            splitArea: {
                show: true,  //  改变轴线颜色
                areaStyle: {  // 使用深浅的间隔色
                    color: ['rgba(1,5,17,0)','rgba(1,5,17,0.15)']
                }                             
            },
            axisLabel: {
                color: '#96c7ff',
                interval:0,
                fontSize: 10
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
                max: 500,
                interval:250,
                splitNumber: 2,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#283a6a',
                        width:1
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#283a69'],
                        type: 'dashed'
                    }                             
                },
                axisLabel: {
                    color: '#96c7ff',
                    fontSize: 10
                }
            }, 
            {
                type: 'value',
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#283a6a',
                        width:1
                    }
                }
            }
        ],
        series: [                      
            {
                name: '生产总值',
                type: 'line',
                symbol: 'circle',
                symbolSize: 8,
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(48, 198, 236, 1)'
                },
                lineStyle: {
                    color: 'rgba(48, 198, 236, 1)',
                    width: 3
                    // shadowColor: 'rgba(8, 22, 43, 1)',
                    // shadowBlur: 5,
                    // shadowOffsetY: 5
                },
                // stack: 'a',
                // smooth: true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(48, 198, 236, 0.5)'
                        }, {
                            offset: 1,
                            color: 'rgba(48, 198, 236, 0.1)'
                        }])
                    }
                },
                data: [245, 255, 250, 290, 250,100, 50]
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);      
    window.addEventListener("resize",function(){
        myChart1.resize();
    });

}

function bar(){
    var myChart2 = echarts.init(document.getElementsByClassName('step2-bar')[0]);
    var data1 = [52, 8, 14, 31, 112, 23, 48, 22, 79, 18];  
    var data2 = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    var data3 = [0, 0, 0, 0, 0, 0, 10, 0, 0, 0];  
    //总计  
    var data4 = function() {  
        var datas = [];  
        for (var i = 0; i < data1.length; i++) {    
            datas.push(data1[i] + data2[i] + data3[i]);  
        }  
        return datas;  
    }();  
    // 指定图表的配置项和数据
    var option2 = {
        legend: {
            data:['未报送','已按时报送','已逾期报送'],
            left: 'center',
            textStyle: {
                color: '#b1cefc',
                fontSize: 12
                // padding: [0,60,0,0]
            },
            // borderColor: '#1b2f41',
            // borderWidth: 1,
            // padding:[5, 0, 15, 0]
        },
        grid: {
            x:40,
            y:30, 
            y2:30, 
            x2:20
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: true,
            data: ["姑苏区","吴中区","相城区","高新区","工业园区","吴江区","常熟市","张家港市",'昆山市','太仓市'],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#2f4379',
                    width:1
                }
            },
            splitLine: {
                show: false,  //  改变轴线颜色
                lineStyle: {  // 使用深浅的间隔色
                    color: ['#223546']
                }                             
            },
            splitArea: {
                show: true,  //  改变轴线颜色
                areaStyle: {  // 使用深浅的间隔色
                    color: ['rgba(1,5,17,0)','rgba(1,5,17,0.15)']
                }                             
            },
            axisLabel: {
                color: '#96c7ff',
                fontSize: 12
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
                max: 120,
                splitNumber: 6,
                // interval: 20,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#2f4379',
                        width:1
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#2f4379'],
                        type: 'dashed'
                    }                             
                },
                axisLabel: {
                    color: '#96c7ff',
                    fontSize: 10
                }
            },
            {
                type: 'value',
                axisTick: {
                    show:false,
                    inside: false
                },
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#2f4379',
                        width:1
                    }
                }
            },  
        ],
        series: [                      
            {
                name: '未报送',
                type: 'bar',
                barWidth: 20,
                stack: 'a',
                // label: {
                //     normal: {
                //         show: true,
                //         position: 'inside'
                //     }
                // },
                yAxisIndex:0,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#428cfb'},
                                {offset: 0.5, color: '#22bafd'},
                                {offset: 1, color: '#01eaff'}
                            ]
                        ),
                        barBorderRadius: [3, 3, 0, 0],
                        shadowColor: 'rgba(4, 9, 24, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                    },
                },
                data: data1
            },
            {
                name: '已按时报送',
                type: 'bar',
                barWidth: 20,
                stack: 'a',
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(40, 213, 122, 1)',
                    barBorderRadius: [3, 3, 0, 0]
                },
                data: data2 
            },
            {
                name: '已逾期报送',
                type: 'bar',
                barWidth: 20,
                stack: 'a',
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(255, 156, 14, 1)',
                    barBorderRadius: [3, 3, 0, 0]
                },
                data: data3 
            },
            {  
                name: '总计',  
                type: 'bar',  
                stack: 'a',  
                label: {  
                    normal: {  
                        // offset:['50', '80'],  
                        show: true,  
                        position: 'insideBottom',  
                        formatter:'{c}',  
                        textStyle:{ 
                            color:'#fff',
                            fontSize:14
                        }  
                    }  
                },  
                itemStyle:{  
                    normal:{  
                        color:'rgba(128, 128, 128, 0)'  
                    }  
                },  
                data: data4  
            }  
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);        
    window.addEventListener("resize",function(){
        myChart2.resize();
    }); 

}
function bar1(){
    var myChart2 = echarts.init(document.getElementsByClassName('step3-bar')[0]);
    var data1 = [52, 8, 14, 31, 62, 23, 48, 22, 79, 18];  
    var data2 = [10, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
    var data3 = [0, 0, 0, 0, 0, 0, 10, 0, 0, 0];  
    //总计  
    var data4 = function() {  
        var datas = [];  
        for (var i = 0; i < data1.length; i++) {    
            datas.push(data1[i] + data2[i] + data3[i]);  
        }  
        return datas;  
    }();  
    // 指定图表的配置项和数据
    var option2 = {
        tooltip: {
            show:true,
            trigger: 'axis',
            axisPointer:{
                type:'none'
            },
            backgroundColor: 'rgba(1,44,106,0.9)',
            borderColor:'#2371c6',
            borderWidth:1,
            padding:[9, 14, 9, 10,],
            position : function(p) {
                // 位置回调
                // console.log && console.log(p);
                return [p[0] + 20, p[1] - 50];
            }, 
            formatter: function (params,ticket,callback) {
                var res =  '<div style="color:#b1cefc;font-size:12px;position:relative;"><img src="img/formatter.png" style="position:absolute;top:50%;left:-19px;margin-top:-7px;"/><div style="color:#96c7ff;font-size:12px;">' + params[0].name + '</div><div>'+ params[0].seriesName +'：<span style="color:#ffffff;font-size:16px;">'+ params[0].value +'</span></div>';
                    res +='<div>' + params[1].seriesName + '：<span style="color:#ffffff;font-size:16px;">'+ params[1].value + '</span></div>';
                    res +='<div>' + params[2].seriesName + '：<span style="color:#ffffff;font-size:16px;">'+ params[2].value + '</span></div></div>';
                return res;                        
            },
        },
        legend: {
            data:['未核查','已按时核查','已逾期核查'],
            left: 'right',
            textStyle: {
                color: '#b1cefc',
                fontSize: 12
            }
        },
        grid: {
            x:40,
            y:30, 
            y2:45, 
            x2:20
        },
        xAxis: {
            type: 'category',
            axisTick: {
                show:false,
                inside: false
            },
            boundaryGap: true,
            data: ["中国质量认证中心","福建省环境科学研究院","北京卡本能源咨询有限公司","福建省中创碳投节能科技有限公司","福建省碳煤工业科学研究所","中国船级社质量认证公司","福建省节能监察中心"],
            axisLine: {    //改变轴颜色
                lineStyle: {
                    color: '#2f4379',
                    width:1
                }
            },
            splitLine: {
                show: false,  //  改变轴线颜色
                lineStyle: {  // 使用深浅的间隔色
                    color: ['#223546']
                }                             
            },
            splitArea: {
                show: true,  //  改变轴线颜色
                areaStyle: {  // 使用深浅的间隔色
                    color: ['rgba(1,5,17,0.15)','rgba(1,5,17,0)']
                }                             
            },
            axisLabel: {
                color: '#96c7ff',
                interval: 0,
                fontSize: 12,
                formatter:function(val){  
                    var strs = val.split(''); //字符串数组  
                    var str = ''  
                    // console.log(strs)
                    for (var i = 0, s; s = strs[i++];) { //遍历字符串数组  
                        str += s;  
                        if (!(i % 6)){
                            str += '\n';
                            // console.log(str)
                        }else if(i>14){
                            // console.log(str)
                            str = str.substr(0,12)+"...";
                        }                                    
                    }  
                    return str;  
                }  
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
                // interval: 20,
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#2f4379',
                        width:1
                    }
                },
                splitLine: {
                    show: true,  //  改变轴线颜色
                    lineStyle: {  // 使用深浅的间隔色
                        color: ['#2f4379'],
                        type: 'dashed'
                    }                             
                },
                axisLabel: {
                    color: '#96c7ff',
                    fontSize: 10
                }
            },
            {
                type: 'value',
                axisTick: {
                    show:false,
                    inside: false
                },
                axisLine: {    //改变轴颜色
                    lineStyle: {
                        color: '#2f4379',
                        width:1
                    }
                }
            },  
        ],
        series: [                      
            {
                name: '未核查',
                type: 'bar',
                barWidth: 20,
                stack: 'a',
                // label: {
                //     normal: {
                //         show: true,
                //         position: 'inside'
                //     }
                // },
                yAxisIndex:0,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#428cfb'},
                                {offset: 0.5, color: '#22bafd'},
                                {offset: 1, color: '#01eaff'}
                            ]
                        ),
                        barBorderRadius: [3, 3, 0, 0],
                        shadowColor: 'rgba(4, 9, 24, 0.5)',
                        shadowBlur: 10,
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                    },
                },
                data: data1
            },
            {
                name: '已按时核查',
                type: 'bar',
                barWidth: 20,
                stack: 'a',
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(40, 213, 122, 1)',
                    barBorderRadius: [3, 3, 0, 0]
                },
                data: data2 
            },
            {
                name: '已逾期核查',
                type: 'bar',
                barWidth: 20,
                stack: 'a',
                yAxisIndex:0,
                itemStyle: {
                    color: 'rgba(255, 156, 14, 1)',
                    barBorderRadius: [3, 3, 0, 0]
                },
                data: data3 
            },
            {  
                name: '总计',  
                type: 'bar',  
                stack: 'a',  
                label: {  
                    normal: {  
                        // offset:['50', '80'],  
                        show: true,  
                        position: 'insideBottom',  
                        formatter:'{c}',  
                        textStyle:{ 
                            color:'#fff',
                            fontSize:14
                        }  
                    }  
                },  
                itemStyle:{  
                    normal:{  
                        color:'rgba(128, 128, 128, 0)'  
                    }  
                },  
                data: data4  
            }  
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option2);        
    window.addEventListener("resize",function(){
        myChart2.resize();
    }); 

}
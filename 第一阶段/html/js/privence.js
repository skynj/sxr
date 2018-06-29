$(function(){
    privence();
})
function privence(){
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
        'echarts/chart/map'
        ],
        function(ec){            
            var myChart3 = ec.init(document.getElementById('map'));

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
                    // text:['100','75','25','0'],           // 文本，默认为数值文本
                    text:['100','0'], 
                    textStyle:{
                        fontSize:12,
                        color:'#72bbff'
                    },
                    splitNumber:0,
                    color: ['#013495','#f5960d']
                    // color: ['#013495','#3c99f9','#0c62d4','#f5960d']
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

            myChart3.setOption(option_my3);
            window.onresize = myChart3.resize();
        }
    );

}